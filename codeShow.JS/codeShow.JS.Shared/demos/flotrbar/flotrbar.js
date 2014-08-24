(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/flotrbar/flotrbar.html", {
        ready: function (element, options) {
            var d1 = [];
            var d2 = [];
            for (var i = 0; i < 4; i++) {
                d1.push([i, Math.ceil(Math.random() * 10)]);
                d2.push([i + 0.5, Math.ceil(Math.random() * 10)]);
            }
            Flotr.draw(
                $('barchart'),
                [d1, d2],
                {
                    bars: { show: true, barWidth: 0.5 },
                    yaxis: { min: 0 }
                }
            );
        }
    });
})();
