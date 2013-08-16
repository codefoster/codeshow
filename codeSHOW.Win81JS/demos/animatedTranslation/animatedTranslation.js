(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/animatedTranslation/animatedTranslation.html", {
        ready: function (element, options) {
            var mainSection = element.querySelector("section[role=main]");
            mainSection.onmouseup = function (args) {
                var vid = element.querySelector("video");
                vid.style.left = mainSection.offsetLeft + args.offsetX + "px";
                vid.style.top =  mainSection.offsetTop + args.offsetY + "px";
            };
        }
    });
})();
