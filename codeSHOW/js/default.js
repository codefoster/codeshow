var app = WinJS.Application;
var appdata = Windows.Storage.ApplicationData.current;
var activation = Windows.ApplicationModel.Activation;
var nav = WinJS.Navigation;
var r = appdata.roamingSettings.values;

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
        app.demosLoaded = loadDemosAsync();
        
        //standard launch
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize your application here.
            } else {
                // TODO: This application has been reactivated from suspension. Restore application state here.
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
        
        //launched by protocol activation
        if (args.detail.kind === activation.ActivationKind.protocol) {
            var demo = null;
            try { demo = args.detail.uri.queryParsed.getFirstValueByName("demo"); }
            catch(exc) {}
            if (demo)
                args.setPromise(WinJS.UI.processAll().then(function() {
                    app.demosLoaded.done(function() {
                        var location = format("/demos/{0}/{0}.html", demo);
                        Windows.UI.ViewManagement.ApplicationView.tryUnsnap();
                        WinJS.Navigation.navigate(location, { });
                    });
                }));
        }
    });

    app.oncheckpoint = function (args) {
        // To complete an async operation before your app is suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.onready = function (e) {
        setupWamsClient();
        addSearchContract();
        addSettingsContract();
    };

    //add WAMS client reference to app so it's available everywhere
    function setupWamsClient() {
        app.client = new Microsoft.WindowsAzure.MobileServices.MobileServiceClient(
            "https://codeshow.azure-mobile.net/",
            codeSHOW.Config.wamskey
        );
    }

    function sendTileTextNotification(message) {
        // create the wide template
        var tileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileWideText03();
        tileContent.textHeadingWrap.text = message;

        // create the square template and attach it to the wide template
        var squareTileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileSquareText04();
        squareTileContent.textBodyWrap.text = message;
        tileContent.squareContent = squareTileContent;

        // send the notification
        Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileContent.createNotification());
    }

    app.tileColor = "#0098ab";
    app.demosList = null;
    app.demosLoaded = null;
    
    function addSearchContract() {
        var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();

        //make sure demos have been loaded and then make search terms out of their keywords
        app.demosLoaded.then(function () {
            var keywords = [];
            app.demosList.forEach(function (d) {
                var indexFields = ["key", "name", "keywords", "description"];
                indexFields.forEach(function (f) {
                    if (d[f])
                        d[f].split(" ").forEach(function (t) {
                            keywords.push(t);
                        });
                });
            });
            
            searchPane.onsuggestionsrequested = function (e) {
                var matchingKeywords = keywords.distinct().filter(function (k) { return k.startsWith(e.queryText); });
                e.request.searchSuggestionCollection.appendQuerySuggestions(matchingKeywords);
            };

            searchPane.onquerysubmitted = function (e) {
                WinJS.Navigation.navigate("/pages/home/home.html", { queryText: e.queryText });
            };
            
        });
    }

    function addSettingsContract() {
        app.onsettings = function (e) {
            e.detail.applicationcommands = {
                 "preferencesDiv": { title: "Preferences", href: "/demos/settings/settings.html" },
                 "aboutDiv": { title: "About", href: "/pages/about/about.html" },
                 "privacyDiv": { title: "Privacy Policy", href: "/pages/privacy/privacy.html" }
            };
            WinJS.UI.SettingsFlyout.populateSettings(e);
        };
    }

    function loadDemosAsync() {
        return new WinJS.Promise(function (c, e, p) {
            Windows.ApplicationModel.Package.current.installedLocation.getFolderAsync("demos")
                .then(function (pagesFolder) {
                    return pagesFolder.getFoldersAsync();
                })
                .done(function (folders) {
                    var result = [];
                    var localFetchPromises = [];
                    var wamsFetchPromies = [];
                    folders
                        .forEach(function (f) {
                            localFetchPromises.push(WinJS.xhr({ url: "/demos/" + f.name + "/" + f.name + ".html", responseType: "document" })
                                .then(function (xhr) {
                                    var keywords = q("meta[name='keywords']", xhr.response);
                                    keywords = (keywords ? keywords.content : "");

                                    var tags = q("meta[name='tags']", xhr.response);
                                    tags = (tags ? tags.content : "");

                                    var description = q("meta[name='description']", xhr.response);
                                    description = (description ? description.content : "");

                                    var enabled = q("meta[name='enabled']", xhr.response);
                                    enabled = (enabled ? enabled.content == "true" : "true");

                                    var dateCreated = q("meta[name='dateCreated']", xhr.response);
                                    dateCreated = (dateCreated ? Date.parse(dateCreated.content) : f.dateCreated);
                                    
                                    if (enabled) {
                                        
                                        //var wamsData = fetchWamsData(f.name);

                                        var pageTitle = (q("title", xhr.response) ? q("title", xhr.response).innerText : (q(".pagetitle", xhr.response) ? q(".pagetitle", xhr.response).innerText : "Unnamed"));
                                        result.push({
                                            key: f.name,
                                            name: pageTitle,
                                            description: description,
                                            keywords: keywords,
                                            tags: tags,
                                            dateCreated: dateCreated,
                                            //rating: wamsData.averageRating
                                        });
                                    }
                                }));
                            
                        });
                    WinJS.Promise.join(localFetchPromises).then(function () {
                        result.forEach(function (r, index) {
                            app.demosList.push(r);
                        });
                        //TODO: improve this... for now it just renderes an ad with a special key and a name of 'b'... should be random 
                        app.demosList.push({ key: "ad", name: "", description: "", keywords: "", tags: "", dateCreated: "" });
                        c();
                    });
                });
        });
    }
    
    function fetchWamsData(key) {
        app.client;
        return { "key":key, "averageRating": 3.4 };
    }
    
    app.start();
})();

var q = Ocho.Utilities.query;
var format = Ocho.Utilities.format;

String.prototype.startsWith = Ocho.String.startsWith;
String.prototype.endsWith = Ocho.String.endsWith;
String.prototype.contains = Ocho.String.contains;
String.prototype.trim = Ocho.String.trim;
Array.prototype.contains = Ocho.Array.contains;
Array.prototype.distinct = Ocho.Array.distinct;
Array.prototype.first = Ocho.Array.first;
Array.prototype.take = Ocho.Array.take;
Array.prototype.takeRandom = Ocho.Array.random;
StyleSheetList.prototype.toArray = Ocho.Array.toArray;
MSCSSRuleList.prototype.toArray = Ocho.Array.toArray;