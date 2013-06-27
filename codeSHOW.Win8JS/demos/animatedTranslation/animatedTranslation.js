(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/animatedTranslation/animatedTranslation.html", {
        ready: function (element, options) {
            var mainSection = q("section[role=main]", element);
            mainSection.onmouseup = function (args) {
                var vid = q("video", element);
                vid.style.left = mainSection.offsetLeft + args.offsetX + "px";
                vid.style.top =  mainSection.offsetTop + args.offsetY + "px";
            };
        }
    });
})();
