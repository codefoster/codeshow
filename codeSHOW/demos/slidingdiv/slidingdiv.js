(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/slidingdiv/slidingdiv.html", {
        ready: function (element, options) {
            q("#go", element).onclick = function(e) {
                q("#slidingDiv", element).style.left = "0px";
            };
        }
    });
})();
