// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/transitions/transitions.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var boxE = q("#boxEvent");
            boxE.addEventListener("transitionend",
                function (args) {
                    if (args.elapsedTime < 4) {
                        boxE.innerText = "Keep Pressing!";
                    } else {
                        boxE.innerText = "Let Go!";
                        boxE.classList.add("vanish");
                    }
                });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
