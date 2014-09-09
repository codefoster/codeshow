(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/enterexit/enterexit.html", {
        ready: function (element, options) {
            animate.onclick = function () {
                WinJS.UI.Animation.enterContent(target, { top: "0px", left: "350px" })
                    .then(function () { return WinJS.Promise.timeout(2000); })
                    .done(function () { WinJS.UI.Animation.exitContent(target, { top: "0px", left: "350px" }); });
            };
        }
    });
})();
