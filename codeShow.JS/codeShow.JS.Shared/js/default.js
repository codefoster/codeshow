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

    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    app.addEventListener("activated", function (args) {
        //initiate loading of app data
        if (!Data.loaded) Data.loadData();

        if (args.detail.kind === activation.ActivationKind.launch) {

            // initialize voice commanding for phone project
            if (WinJS.Utilities.isPhone) {
                Windows.Storage.StorageFile.getFileFromApplicationUriAsync(new Windows.Foundation.Uri("ms-appx:///voiceCommandDefinition.xml"))
                    .then(function (storageFile) { return Windows.Media.SpeechRecognition.VoiceCommandManager.installCommandSetsFromStorageFileAsync(storageFile); }, function (error) { debugger; })
            }

            //* positionSplashScreen(args);

            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            hookUpBackButtonGlobalEventHandlers();
            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Optimize the load of the application and while the splash screen is shown, execute high priority scheduled work.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {

                //BUG: this is supposed to simply detect the secondary tile and navigate to demo, but it fails at least intermittently
                //navigate to demo specified in launch from secondary tile
                if (args.detail.arguments !== "") {
                    var launchDemo = JSON.parse(args.detail.arguments).launchDemo;
                    if (launchDemo)
                        //make sure the demos have been loaded before navigating to the hub
                        Data.loaded.then(function () {
                            var chooseDemo = Data.demos.filter(function (d) { return d.name == launchDemo })[0];
                            return nav.navigate("/pages/demo/demo.html", { demo: chooseDemo });
                        });
                }

                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        }

        //if the app was launched via Cortana voice command
        else if (args.detail.kind === activation.ActivationKind.voiceCommand) {
            Data.loaded.then(function () {
                //TODO:demoname as to match exactly at this point, needs to have fuzzy logic implemented
                var chooseDemo = Data.demos.filter(function (d) { return d.name == args.detail.result.semanticInterpretation.properties.demoname[0].toLowerCase() })[0];
                if (chooseDemo)
                    return nav.navigate("/pages/demo/demo.html", { demo: chooseDemo });
                else
                    //TODO: notify the user that the demo didn't exist
                    return nav.navigate("/pages/hub/hub.html");
            });
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };
    app.onready = function (e) {
        indexForSearch();
        addSettingsContract();
    };
    
    function hookUpBackButtonGlobalEventHandlers() {
        // Subscribes to global events on the window object
        window.addEventListener('keyup', backButtonGlobalKeyUpHandler, false)
    }

    // CONSTANTS
    var KEY_LEFT = "Left";
    var KEY_BROWSER_BACK = "BrowserBack";
    var MOUSE_BACK_BUTTON = 3;

    function backButtonGlobalKeyUpHandler(event) {
        // Navigates back when (alt + left) or BrowserBack keys are released.
        if ((event.key === KEY_LEFT && event.altKey && !event.shiftKey && !event.ctrlKey) || (event.key === KEY_BROWSER_BACK)) {
            nav.back();
        }
    }

    app.start();

    //network connectivity
    app.isConnected = getIsConnected();
    net.addEventListener("networkstatuschanged", function () { app.isConnected = getIsConnected(); });
    function getIsConnected() {
        return net.getInternetConnectionProfile()
            && net.getInternetConnectionProfile().getNetworkConnectivityLevel() > 2;
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

    function indexForSearch() {
        //make sure demos have been loaded and then make search terms out of their keywords
        Data.loaded.then(function () {
            var keywords = [];
            Data.demos.forEach(function (d) {
                var indexFields = ["key", "name", "keywords", "description"];
                indexFields.forEach(function (f) {
                    if (d[f]) {
                        var words = (Array.isArray(d[f]) ? d[f] : d[f].split(" ") )
                        words.forEach(function (t) {
                            keywords.push(t);
                        });
                    }
                });
            });
        });
    }

    function addSettingsContract() {
        app.onsettings = function (e) {
            e.detail.applicationcommands = {
                aboutDiv: { title: "About", href: "/pages/about/about.html" },
            };
    
            WinJS.UI.SettingsFlyout.populateSettings(e);
        };
    }

    function positionSplashScreen(args) {
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
    
})();

//* var q = Ocho.Utilities.query;
//* var format = Ocho.Utilities.format;
//* var launch = Ocho.Navigation.launch;
//* String.prototype.startsWith = Ocho.String.startsWith;
//* String.prototype.endsWith = Ocho.String.endsWith;
String.prototype.contains = Ocho.String.contains;
//* String.prototype.trim = Ocho.String.trim;
Array.prototype.contains = Ocho.Array.contains;
//* Array.prototype.distinct = Ocho.Array.distinct;
//* Array.prototype.first = Ocho.Array.first;
//* Array.prototype.take = Ocho.Array.take;
//* Array.prototype.takeRandom = Ocho.Array.random;
//* StyleSheetList.prototype.toArray = Ocho.Array.toArray;
//* NodeList.prototype.toArray = Ocho.Array.toArray;
//* MSCSSRuleList.prototype.toArray = Ocho.Array.toArray;