(function () {
    "use strict";

    WinJS.Namespace.define("codeShow.Pages.Demos", {
        pageDataLoaded: false,
        demosList: new WinJS.Binding.List(),
        Commands: {
            demoNavigate: util.markSupportedForProcessing(function (data) {
                data.detail.itemPromise.then(function (item) {
                    nav.navigate("/pages/demo/demo.html", { demo: item.data });
                });
            }),
        }
    });

    WinJS.UI.Pages.define("/pages/demos/demos.html", {
        init: function (element, options) {
            options = options || {};
            return Data.loaded.then(function () {
                //reset the demosList
                codeShow.Pages.Demos.demosList = new WinJS.Binding.List();

                //hydrate the demosList
                Data.demos
                    .sort(function(a, b) {
                        return (a.title < b.title ? -1 : 1);
                    })
                    .forEach(function(demo) {
                        codeShow.Pages.Demos.demosList.push(demo);
                    });
                
                //if a query was done, apply it
                codeShow.Pages.Demos.demosList = codeShow.Pages.Demos.demosList.createFiltered(function (i) {
                    var containsOptions = { behavior: "contains", caseSensitive: "false" };
                    return !options.queryText
                        || (i.name && (i.name.contains(options.queryText, { caseSensitive: false }) || i.name.split(" ").contains(options.queryText, containsOptions))
                            || i.keywords && i.keywords.contains(options.queryText, containsOptions)
                            || i.description && (i.description.contains(options.queryText, { caseSensitive: false }) || i.description.split(" ").contains(options.queryText, containsOptions)));
                });

            });
        }
    });
})();
