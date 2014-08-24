(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/flotrsimple/flotrsimple.html", {
        ready: function (element, options) {
            var f = Flotr.draw(
                $('simplechart'), [
                { // => first series
                    data: [[0, 0], [1, 2], [2, 4], [3, 6], [4, 8]],
                    label: "y = 2x",
                    lines: { show: true, fill: true },
                    points: { show: true }
                },
                { // => second series
                    data: [[0, 2.5], [1, 5.5], [2, 8.5], [3, 11.5], [4, 14.5]],
                    label: "y = 2.5 + 3x"
                }]
            );
        }
    });
})();
