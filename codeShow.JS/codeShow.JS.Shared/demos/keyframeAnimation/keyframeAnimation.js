(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/keyframeanimation/keyframeanimation.html", {
        ready: function (element, options) {
            // TODO: Initialize the page here.
            boxAngry.addEventListener("animationstart", function (arg) {
                boxAngry.innerText = "Angry";
            });
            boxAngry.addEventListener("animationiteration", function (arg) {
                
            });
            boxAngry.addEventListener("animationend", function (arg) {
                
            });
    
            boxAngry.onclick = function() {
                boxAngry.classList.toggle("animate-get-angry");
            };
        }
    });
})();
