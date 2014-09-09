(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/flyouts/flyouts.html", {
        ready: function (element, options) {
            showFlyout.onclick = function (e) { flyout1.winControl.show(this); };
        }
    });
})();
