(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/progressbar/determinate/determinate.html", {
        ready: function (element, options) {
            var p = q(".progressbar .determinate progress");

            q(".progressbar .determinate #advance").onclick = function (e) {
                p.value += p.max * .1;
            };
            q(".progressbar .determinate #reset").onclick = function (e) {
                p.value = 0;
            };
        }
    });
})();
