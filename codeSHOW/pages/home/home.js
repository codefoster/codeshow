/// <reference path="///Microsoft.WinJS.1.0/js/wl.js" />

(function () {
    "use strict";

    var app = WinJS.Application;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            bindList(options);
        }
    });

    function bindList(options) {
        var demosList = app.demosList;
        options = options || { };
        if (options.queryText)
            demosList = demosList.createFiltered(function(i) {
                var result = i.tags && i.tags.split(" ").contains(options.queryText);
                return result;
            });

        var demosLV = q(".homepage #demosLV").winControl;
        demosLV.itemDataSource = demosList.dataSource;
        demosLV.itemTemplate = q(".homepage #itemTemplate");
        demosLV.oniteminvoked = function(e) {
            e.detail.itemPromise.then(function(x) {
                var location = format("/pages/{0}/{0}.html", x.data.key);
                WinJS.Navigation.navigate(location, x.data);
            });
        };
    }
})();
