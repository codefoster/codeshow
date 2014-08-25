(function () {
    "use strict";


    WinJS.UI.Pages.define("/demos/localStorage/localStorage.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            var btnSave = save;
            var btnClear = clear;
            var inputWords = words;
            var divDisplay = display;

            showWords();

            btnSave.addEventListener("click", function() {
                localStorage.words = inputWords.value;
                showWords();
            });
            btnClear.addEventListener("click", function () {
                localStorage && localStorage.removeItem("words");
                showWords();
            });
            function showWords() {
                var displayWords = localStorage.words || "(no words found in storage)";
                divDisplay.textContent = displayWords;

            }
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
