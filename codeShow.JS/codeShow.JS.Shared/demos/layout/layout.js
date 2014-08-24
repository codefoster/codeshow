(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/layout/layout.html", {
        ready: function (element, options) {
            var bump = element.querySelector(".bump");
            var changeBumpPosition = element.querySelector(".changeBumpPosition");
            changeBumpPosition.onmousedown = function () { bump.style.position = "absolute"; };
            changeBumpPosition.onmouseup = function () { bump.style.position = "relative"; };
        }
    });
})();
