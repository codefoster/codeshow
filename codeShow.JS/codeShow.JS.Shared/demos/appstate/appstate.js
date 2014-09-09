(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/appstate/appstate.html", {
        ready: function (element, options) {
            var appStateInput = element.querySelector("section[role=main] input");
            app.sessionState.storagedemo && (appStateInput.value = app.sessionState.storagedemo); //restore value
            appStateInput.onblur = function (e) { //setup up text box value to be saved on blur
                app.sessionState.storagedemo = appStateInput.value;
            };
        }
    });
})();
