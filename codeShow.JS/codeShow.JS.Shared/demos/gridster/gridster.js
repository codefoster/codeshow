(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/gridster/gridster.html", {
        ready: function (element, options) {
            $(".gridster .gridster ul").gridster({
                widget_margins: [10, 10],
                widget_base_dimensions: [140, 140]
            });
        }
    });
})();
