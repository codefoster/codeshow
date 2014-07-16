(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/gridster/simple/simple.html", {
        ready: function (element, options) {
            $(".gridster .simple .gridster ul").gridster({
                widget_margins: [10, 10],
                widget_base_dimensions: [140, 140]
            });
        }
    });
})();
