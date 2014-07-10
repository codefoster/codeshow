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
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
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
})();

//* var q = Ocho.Utilities.query;
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