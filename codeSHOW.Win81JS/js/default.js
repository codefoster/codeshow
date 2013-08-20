var app = WinJS.Application;
var storeApp = Windows.ApplicationModel.Store.CurrentApp;
var appdata = Windows.Storage.ApplicationData.current;
var activation = Windows.ApplicationModel.Activation;
var nav = WinJS.Navigation;
var r = appdata.roamingSettings.values;
var session = WinJS.Application.sessionState;
var util = WinJS.Utilities;
var pkg = Windows.ApplicationModel.Package.current;

(function () {
    "use strict";
    //window.onkeyup = function (e) {
    //    //TODO: check to be sure we're not in an input box before we capture some (any?) keystrokes (like home and backspace)
    //    switch(e.key) {
    //        //case "Home": WinJS.Navigation.navigate("/pages/home/home.html"); break;
    //        case "BrowserBack": WinJS.Navigation.back(); break;
    //        case "BrowserForward": WinJS.Navigation.forward(); break;
    //    }
    //};

    app.addEventListener("activated", function (args) {
        //initiate loading of app data
        setupWamsClient();
        if (!Data.loaded) Data.loadData();
        
        app.paid = storeApp.licenseInformation.productLicenses.lookup("killTheAds").isActive;

        //set up the demos list (empty for now)
        app.demosList = new WinJS.Binding.List()
            .createGrouped(function (i) { return i.group; }, function (i) { return i.group; })
            .createSorted(function (a, b) { return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1); });
        
        //start loading the demos
        //app.demosLoaded = loadDemosAsync();
        
        //standard launch
        if (args.detail.kind === activation.ActivationKind.launch) {

            postitionSplashScreen(args);
            //handle extended splash screen

            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize your application here.
            } else {
                // TODO: This application has been reactivated from suspension. Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll()
                .then(function () {
                    //navigate to launch from secondary tile
                    if (args.detail.arguments !== "") {
                        var launchDemo = JSON.parse(args.detail.arguments).launchDemo;
                        if(launchDemo)
                            Data.loaded.then(function () {
                                var chooseDemo = Data.demos.first(function (d) { return d.name == launchDemo });
                                nav.navigate("/pages/demo/demo.html", { demo: chooseDemo, view: "demo" });
                            });
                    }
                    if (nav.location) {
                        nav.history.current.initialPlaceholder = true;
                        return nav.navigate(nav.location, nav.state);
                    } else {
                        return nav.navigate(Application.navigator.home);
                    }
                })
            );
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
        addSearchContract();
        addSettingsContract();
    };

    //add WAMS client reference to app so it's available everywhere
    function setupWamsClient() {
        app.client = new WindowsAzure.MobileServiceClient(
            "https://codeshow.azure-mobile.net/",
            codeShow.Config.wamskey
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
        Data.loaded.then(function () {
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
                 //preferencesDiv: { title: "Preferences", href: "/demos/settings/settings.html" },
                 aboutDiv: { title: "About", href: "/pages/about/about.html" },
                 privacyDiv: { title: "Privacy Policy", href: "/pages/privacy/privacy.html" }
            };
            if (storeApp.licenseInformation.isActive && !storeApp.licenseInformation.isTrial && !storeApp.licenseInformation.productLicenses.lookup("killTheAds").isActive)
                e.detail.applicationcommands.killAdsDiv = { title: "Kill the Ads!", href: "/pages/killads/killads.html" };

            WinJS.UI.SettingsFlyout.populateSettings(e);
        };
    }
    
    function fetchWamsData(key) {
        app.client;
        return { "key":key, "averageRating": 3.4 };
    }

    function postitionSplashScreen(args) {
        var i = splash.querySelector("img");
        var p = splash.querySelector("progress");
        var ss = args.detail.splashScreen;
        splash.classList.remove("hidden");
        i.style.top = ss.imageLocation.y + "px";
        i.style.left = ss.imageLocation.x + "px";
        i.style.height = ss.imageLocation.height + "px";
        i.style.width = ss.imageLocation.width + "px";
        p.style.marginTop = ss.imageLocation.y + ss.imageLocation.height + 32 + "px";
    }
    
    app.start();
})();

var q = Ocho.Utilities.query;
var format = Ocho.Utilities.format;
var launch = Ocho.Navigation.launch;
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