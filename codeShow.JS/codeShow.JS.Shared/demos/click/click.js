(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/click/click.html", {
        ready: function (element, options) {
            var targets = WinJS.Utilities.query(".target",document);
            targets.listen("MSPointerDown", function (e) {
                WinJS.UI.Animation.pointerDown(e.srcElement);
            });
            targets.listen("MSPointerUp", function (e) {
                WinJS.UI.Animation.pointerUp(e.srcElement);
            });
        }
    });
})();
