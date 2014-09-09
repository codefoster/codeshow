(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/transitions/transitions.html", {
        ready: function (element, options) {
            boxEvent.addEventListener("transitionend",
                function (args) {
                    if (args.elapsedTime < 4) {
                        boxEvent.innerText = "Keep Pressing!";
                    } else {
                        boxEvent.innerText = "Let Go!";
                        boxEvent.classList.add("vanish");
                    }
                });
        }
    });
})();
