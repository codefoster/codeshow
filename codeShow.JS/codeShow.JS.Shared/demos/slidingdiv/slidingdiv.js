(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/slidingdiv/slidingdiv.html", {
        ready: function (element, options) {
            go.onclick = function(e) {
                slidingDiv.style.left = "0px";
            };
        }
    });
})();
