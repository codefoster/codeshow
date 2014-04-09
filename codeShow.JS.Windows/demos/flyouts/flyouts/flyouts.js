(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/flyouts/flyouts/flyouts.html", {
        ready: function (element, options) {
            q("#showFlyout", element).onclick = function (e) { q("#flyout1", element).winControl.show(this); };
        }
    });
})();
