(function () {
    "use strict";

    WinJS.Namespace.define("codeSHOW.Pages.Demos", {
        pageDataLoaded: false,
        demosList: new WinJS.Binding.List(),
        Commands: {
            demoNavigate: util.markSupportedForProcessing(function (data) {
                data.detail.itemPromise.then(function (item) {
                    nav.navigate("/pages/demo/demo.html", { demo: item.data, viewMode: "demo" });
                });
            }),
        }
    });

    WinJS.UI.Pages.define("/pages/demos/demos.html", {
        ready: function (element, options) {
            Data.loaded.then(function () {
                //build demos list
                Data.demos
                    .sort(function(a, b) {
                        return (a.title < b.title ? -1 : 1);
                    })
                    .forEach(function(demo) {
                        codeSHOW.Pages.Demos.demosList.push(demo);
                    });
            });
        }
    });
})();
