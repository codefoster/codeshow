(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/flotrpie/flotrpie.html", {
        ready: function (element, options) {
            // Fill series.
            var d1 = [[0, 4]];
            var d2 = [[0, 3]];
            var d3 = [[0, "1.03"]];
            var d4 = [[0, 3.5]];

            //Draw the graph.
            var f = Flotr.draw($('piechart'), [
                { data: d1, label: 'Comedy' },
                { data: d2, label: 'Action' },
                { data: d3, label: 'Romance', pie: { explode: 20 } },
                { data: d4, label: 'Drama' }
            ], {
                HtmlText: false,
                grid: {
                    verticalLines: false,
                    horizontalLines: false
                },
                xaxis: { showLabels: false },
                yaxis: { showLabels: false },
                pie: { show: true },
                legend: {
                    position: 'se',
                    backgroundColor: '#D2E8FF'
                }
            });
        }
    });
})();
