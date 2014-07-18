(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/boxmargin/boxmargin.html", {
        ready: function (element, options) {
            for (var i = 0; i < 20; i++) element.querySelector(".flex").appendChild(document.createElement("div"));
        }
    });
})();
