var app = WinJS.Application;
var appdata = Windows.Storage.ApplicationData.current;
var activation = Windows.ApplicationModel.Activation;
var nav = WinJS.Navigation;

(function () {
    "use strict";

    WinJS.strictProcessing();

    window.onkeyup = function (e) {
        //TODO: check to be sure we're not in an input box before we capture some (any?) keystrokes (like home and backspace)
        switch(e.key) {
            //case "Home": WinJS.Navigation.navigate("/pages/home/home.html"); break;
            case "BrowserBack": WinJS.Navigation.back(); break;
            case "BrowserForward": WinJS.Navigation.forward(); break;
        }
    };
    
    app.addEventListener("activated", function (args) {

        //set up the demos list (empty for now)
        app.demosList = new WinJS.Binding.List()
            .createGrouped(function (i) { return i.group; }, function (i) { return i.group; })
            .createSorted(function (a, b) { return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1); });

        //start loading the demos
        app.demosLoaded = loadDemos();
        
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    app.oncheckpoint = function (args) {
        // To complete an async operation before your app is suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.onready = function (e) {
        addSearchContract();
        addSettingsContract();
    };

    app.tileColor = "#0098ab";
    app.demosList = null;
    app.demosLoaded = null;
    
    function addSearchContract() {
        var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();

        //make sure demos have been loaded and then make search terms out of their keywords
        app.demosLoaded.then(function () {
            var tags = [];
            app.demosList.forEach(function (d) {
                if (d.tags)
                    d.tags.split(" ").forEach(function (t) {
                        tags.push(t);
                    });
            });
            
            searchPane.onsuggestionsrequested = function (e) {
                e.request.searchSuggestionCollection.appendQuerySuggestions(
                    tags.distinct().filter(function (t) { return t.startsWith(e.queryText); })
                );
            };

            searchPane.onquerysubmitted = function (e) {
                WinJS.Navigation.navigate("/pages/home/home.html", { queryText: e.queryText });
            };
            
        });
    }
    function addSettingsContract() {
        app.onsettings = function (e) {
            e.detail.applicationcommands = { "preferencesDiv": { title: "Preferences", href: "/demos/settings/settings.html" } };
            WinJS.UI.SettingsFlyout.populateSettings(e);
        };
    }
    function loadDemos() {
        return new WinJS.Promise(function(c, e, p) {
            Windows.ApplicationModel.Package.current.installedLocation.getFolderAsync("demos")
                .then(function (pagesFolder) {
                    return pagesFolder.getFoldersAsync();
                })
                .done(function (folders) {
                    var result = [];
                    var promises = [];
                    folders
                        //.filter(function (f) { return f.name !== "home"; })
                        .forEach(function (f) {
                            promises.push(WinJS.xhr({ url: "/demos/" + f.name + "/" + f.name + ".html", responseType: "document" })
                                .then(function (xhr) {
                                    var keywords = q("meta[name='keywords']", xhr.response);
                                    keywords = (keywords ? keywords.content : "");

                                    var description = q("meta[name='description']", xhr.response);
                                    description = (description ? description.content : "");

                                    var enabled = q("meta[name='enabled']", xhr.response);
                                    enabled = (enabled ? enabled.content == "true" : "true");

                                    if (enabled) {
                                        var pageTitle = (q("title", xhr.response) ? q("title", xhr.response).innerText : (q(".pagetitle", xhr.response) ? q(".pagetitle", xhr.response).innerText : "Unnamed"));
                                        result.push({
                                            key: f.name,
                                            name: pageTitle,
                                            description: description,
                                            tags: keywords,
                                            group: "html",
                                            difficulty: 0
                                        });
                                    }
                                }));
                        });
                    WinJS.Promise.join(promises).then(function () {
                        result.forEach(function (r) { app.demosList.push(r); });
                        c();
                    });
                });
        });
    }
    
    app.start();
})();

var q = Ocho.Utilities.query;
var format = Ocho.Utilities.format;
    
String.prototype.startsWith = Ocho.String.startsWith;
String.prototype.endsWith = Ocho.String.endsWith;
String.prototype.trim = Ocho.String.trim;
Array.prototype.contains = Ocho.Array.contains;
Array.prototype.distinct = Ocho.Array.distinct;