(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/boxprops/boxprops.html", {
        ready: function (element, options) {
            for (var i = 0; i < 20; i++) q(".marginbox .flex", element).appendChild(document.createElement("div"));
        }
    });
})();
