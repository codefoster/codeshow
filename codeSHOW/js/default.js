// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
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
        App.demosList = new WinJS.Binding.List()
            .createGrouped(function (i) { return i.group; }, function (i) { return i.group; })
            .createSorted(function (a, b) { return (a.name < b.name ? -1 : 1); });

        //start loading the demos
        App.demosLoaded = loadDemos();
        
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
    };

    WinJS.Namespace.define("App", {
        //loadDemos: loadDemos,
        demosList: null,
        demosLoaded: null
    });
    
    function addSearchContract() {
        var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();

        //make sure demos have been loaded and then make search terms out of their keywords
        App.demosLoaded.then(function () {
            var tags = [];
            App.demosList.forEach(function (d) {
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
                //App.demosList = App.demosList.createFiltered(function (i) {
                //    var result = i.tags && i.tags.split(" ").contains(e.queryText);
                //    return result;
                //});
                WinJS.Navigation.navigate("/pages/home/home.html", { queryText: e.queryText });
            };
            
        });
    }
    
    function loadDemos() {
        return new WinJS.Promise(function(c, e, p) {
            Windows.ApplicationModel.Package.current.installedLocation.getFolderAsync("pages")
                .then(function (pagesFolder) {
                    return pagesFolder.getFoldersAsync();
                })
                .done(function (folders) {
                    var result = [];
                    var promises = [];
                    folders
                        .filter(function (f) { return f.name !== "home"; })
                        .forEach(function (f) {
                            promises.push(WinJS.xhr({ url: "/pages/" + f.name + "/" + f.name + ".html", responseType: "document" })
                                .then(function (xhr) {
                                    var keywords = q("meta[name='keywords']", xhr.response);
                                    keywords = (keywords ? keywords.content : "");

                                    result.push({
                                        key: f.name,
                                        name: q("title", xhr.response).innerText,
                                        tags: keywords,
                                        group: "html",
                                        difficulty: 0
                                    });
                                }));
                        });
                    WinJS.Promise.join(promises).then(function () {
                        var colors = ["#0098ab", "#0070a9", "#d9532c", "#a400ac", "#009086", "#5838b4", "#ae193e", "#2c86ee", "#009c00"];
                        result.forEach(function (i) {
                            //i.tileColor = colors[Math.floor(Math.random() * colors.length)];
                            i.tileColor = "#336666";
                        });
                        result.forEach(function (r) { App.demosList.push(r); });
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