(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/boxprops/margin/margin.html", {
        ready: function (element, options) {
            for (var i = 0; i < 20; i++) element.querySelector(".flex").appendChild(document.createElement("div"));
        }
    });
})();
