// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/animations/animations.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            boxAngry.addEventListener("animationstart", function (arg) {
                boxAngry.innerText = "Angry";
            });
            boxAngry.addEventListener("animationiteration", function (arg) {
                
            });
            boxAngry.addEventListener("animationend", function (arg) {
                
            });

    
    
            boxAngry.onclick = function () {
                boxAngry.classList.toggle("animate-get-angry");
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
