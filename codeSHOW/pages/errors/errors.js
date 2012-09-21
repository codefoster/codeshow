// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/errors/errors.html", {

        stateOfLog: null,
        // This function is called when unhandled errors are captured 
        error: function (errInfo) {
            // errInfo parameter has the following properties that are useful
            //      .message
            //      .description
            //      .stack

        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            this.stateOfLog = WinJS.log;
            // define custom log method
            WinJS.log = function (msg, tags, type) {
                if (!msg) return;
                type = type || "info";
                if (tags && tags.match && tags.match(/demo/gi)) {
                    output.innerText = msg + " [" + tags + "]";
                }
                if (type === "error") {
                    output.setAttribute("class", "error");
                } else {
                    output.removeAttribute("class");
                }
            };

            boxLog.onclick = function () {
                WinJS.log && WinJS.log("Log", "demo");
            };
            boxPageError.onclick = function () {
                WinJS.log && WinJS.log("Page", "demo", "error");
            };

        },



        unload: function () {
            // TODO: Respond to navigations away from this page.
            WinJS.log = this.stateOfLog;
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
