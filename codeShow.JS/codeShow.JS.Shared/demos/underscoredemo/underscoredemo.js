(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/underscoredemo/underscoredemo.html", {
        init: function (element, options) {
            WinJS.Namespace.define("codeShow.Demos.underscoredemo", {
                functions: new WinJS.Binding.List()
            });
        },
        ready: function (element, options) {
            var fcts = codeShow.Demos.underscoredemo.functions;

            fcts.push({
                id: "map",
                title: "Map",
                result: (function () {
                    return _.map([1, 2, 3, 4, 5], function (i) { return (i + " " + (i == 1 ? 'chicken' : 'chickens')); });
                })()
            });

            fcts.push({
                id: "reduce",
                title: "Reduce",
                result: (function () {
                    return _.reduce([1, 2, 3, 4, 5], function (x, i) { return x + i; }, 0);
                })()
            });

            fcts.push({
                id: "find",
                title: "Find",
                result: (function () {
                    return _.find([1, 2, 3, 4, 5], function (i) { return i > 3; });
                })()
            });

            fcts.push({
                id: "filter",
                title: "Filter",
                result: (function () {
                    return _.filter([1, 2, 3, 4, 5], function (i) { return i > 3; });
                })()
            });

            fcts.push({
                id: "every",
                title: "Every",
                result: (function () {
                    return _.every([1, 2, 3, 4, 5], function (i) { return i > 3; });
                })()
            });

            fcts.push({
                id: "some",
                title: "Some",
                result: (function () {
                    return _.some([1, 2, 3, 4, 5], function (i) { return i > 3; });
                })()
            });



        }
    });
})();
