var app = WinJS.Application;
var storeApp = Windows.ApplicationModel.Store.CurrentApp;
var appdata = Windows.Storage.ApplicationData.current;
var activation = Windows.ApplicationModel.Activation;
var nav = WinJS.Navigation;
var net = Windows.Networking.Connectivity.NetworkInformation;
var r = appdata.roamingSettings.values;
var session = WinJS.Application.sessionState;
var util = WinJS.Utilities;
var pkg = Windows.ApplicationModel.Package.current;

(function () {
    "use strict";

    app.demosList = null;
    app.demosLoaded = null;

    app.onactivated = function (args) {
        //initiate loading of app data
        //* if (!Data.loaded) Data.loadData();
        //* 
        //* //set up the demos list (empty for now)
        //* app.demosList = new WinJS.Binding.List()
        //*     .createGrouped(function (i) { return i.group; }, function (i) { return i.group; })
        //*     .createSorted(function (a, b) { return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1); });
        
        //standard launch
        if (args.detail.kind === activation.ActivationKind.launch) {

            //positionSplashScreen(args);

            //* if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
            //*     // new launch
            //*     Analytics.Increment("app launch");
            //* }
            //* else { /* reactivated from suspension*/}

            //TODO: fix... I believe I commented this out because it was not able to recover when navigated directly to a page on recovery
            //if (app.sessionState.history) nav.history = app.sessionState.history; }

            args.setPromise(WinJS.UI.processAll()
                //* .then(function() { return Data.loaded; })
                .then(function () {
                    //navigate to launch from secondary tile
                    if (args.detail.arguments !== "") {
                        var launchDemo = JSON.parse(args.detail.arguments).launchDemo;
                        if(launchDemo)
                            //make sure the demos have been loaded before navigating to the hub
                            Data.loaded.then(function () {
                                var chooseDemo = Data.demos.first(function (d) { return d.name == launchDemo });
                                nav.navigate("/pages/demo/demo.html", { demo: chooseDemo, view: "demo" });
                            });
                    }
                    if (nav.location) {
                        nav.history.current.initialPlaceholder = true;
                        return nav.navigate(nav.location, nav.state);
                    } else {
                        //TODO: error here when no network connection (??)
                        return nav.navigate(Application.navigator.home);
                    }
                })
            );
        }
        
        //* //launched by protocol activation
        //* if (args.detail.kind === activation.ActivationKind.protocol) {
        //*     var demo = null;
        //*     try { demo = args.detail.uri.queryParsed.getFirstValueByName("demo"); }
        //*     catch(exc) {}
        //*     if (demo)
        //*         args.setPromise(WinJS.UI.processAll().then(function() {
        //*             app.demosLoaded.done(function() {
        //*                 var location = format("/demos/{0}/{0}.html", demo);
        //*                 Windows.UI.ViewManagement.ApplicationView.tryUnsnap();
        //*                 WinJS.Navigation.navigate(location, { });
        //*             });
        //*         }));
        //* }

    };

    app.oncheckpoint = function (args) {
        // To complete an async operation before your app is suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.onready = function (e) {
        //addSearchContract();
        //* addSettingsContract();
    };

    app.onerror = function (err) {
        //try { codeshowClient.getTable("errors").insert({ text: err.detail.error }); } catch (e) { debugger; }
        //WinJS.Navigation.navigate("/pages/hub/hub.html", { message: "Sorry, there was an error that occurred. Don't worry, we're on it. Just keep doing what you were doing." });
        //return true;
    };

    app.start();

    //* //network connectivity
    //* app.isConnected = getIsConnected();
    //* net.addEventListener("networkstatuschanged", function () { app.isConnected = getIsConnected(); });
    //* function getIsConnected() {
    //*     return net.getInternetConnectionProfile()
    //*         && net.getInternetConnectionProfile().getNetworkConnectivityLevel() > 2;
    //* }
    //* 
    //* function sendTileTextNotification(message) {
    //*     // create the wide template
    //*     var tileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileWideText03();
    //*     tileContent.textHeadingWrap.text = message;
    //* 
    //*     // create the square template and attach it to the wide template
    //*     var squareTileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileSquareText04();
    //*     squareTileContent.textBodyWrap.text = message;
    //*     tileContent.squareContent = squareTileContent;
    //* 
    //*     // send the notification
    //*     Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileContent.createNotification());
    //* }
    //* 
    //* function addSearchContract() {
    //*     var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();
    //* 
    //*     //make sure demos have been loaded and then make search terms out of their keywords
    //*     Data.loaded.then(function () {
    //*         var keywords = [];
    //*         app.demosList.forEach(function (d) {
    //*             var indexFields = ["key", "name", "keywords", "description"];
    //*             indexFields.forEach(function (f) {
    //*                 if (d[f])
    //*                     d[f].split(" ").forEach(function (t) {
    //*                         keywords.push(t);
    //*                     });
    //*             });
    //*         });
    //*         
    //*         searchPane.onsuggestionsrequested = function (e) {
    //*             var matchingKeywords = keywords.distinct().filter(function (k) { return k.startsWith(e.queryText); });
    //*             e.request.searchSuggestionCollection.appendQuerySuggestions(matchingKeywords);
    //*         };
    //* 
    //*         searchPane.onquerysubmitted = function (e) {
    //*             WinJS.Navigation.navigate("/pages/home/home.html", { queryText: e.queryText });
    //*         };
    //*         
    //*     });
    //* }
    //* 
    //* function addSettingsContract() {
    //*     app.onsettings = function (e) {
    //*         e.detail.applicationcommands = {
    //*              aboutDiv: { title: "About", href: "/pages/about/about.html" },
    //*              privacyDiv: { title: "Privacy Policy", href: "/pages/privacy/privacy.html" }
    //*         };
    //* 
    //*         WinJS.UI.SettingsFlyout.populateSettings(e);
    //*     };
    //* }
    //* 
    //* function positionSplashScreen(args) {
    //*     var i = splash.querySelector("img");
    //*     var p = splash.querySelector("progress");
    //*     var ss = args.detail.splashScreen;
    //*     splash.classList.remove("hidden");
    //*     i.style.top = ss.imageLocation.y + "px";
    //*     i.style.left = ss.imageLocation.x + "px";
    //*     i.style.height = ss.imageLocation.height + "px";
    //*     i.style.width = ss.imageLocation.width + "px";
    //*     p.style.marginTop = ss.imageLocation.y + ss.imageLocation.height + 32 + "px";
    //* }
    
})();

//* var q = Ocho.Utilities.query;
//* var format = Ocho.Utilities.format;
//* var launch = Ocho.Navigation.launch;
//* String.prototype.startsWith = Ocho.String.startsWith;
//* String.prototype.endsWith = Ocho.String.endsWith;
//* String.prototype.contains = Ocho.String.contains;
//* String.prototype.trim = Ocho.String.trim;
//* Array.prototype.contains = Ocho.Array.contains;
//* Array.prototype.distinct = Ocho.Array.distinct;
//* Array.prototype.first = Ocho.Array.first;
//* Array.prototype.take = Ocho.Array.take;
//* Array.prototype.takeRandom = Ocho.Array.random;
//* StyleSheetList.prototype.toArray = Ocho.Array.toArray;
//* NodeList.prototype.toArray = Ocho.Array.toArray;
//* MSCSSRuleList.prototype.toArray = Ocho.Array.toArray;