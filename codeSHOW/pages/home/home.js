/// <reference path="///Microsoft.WinJS.1.0/js/wl.js" />

(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            bindList(options);
        }
    });

    function bindList(options) {
        var demosList = App.demosList;
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


        //var tagsLV = q(".homepage #tagsLV").winControl;
        //var tagsList = new WinJS.Binding.List();

        //tagsLV.itemDataSource = tagsList.dataSource;
        //tagsLV.itemTemplate = q(".homepage #tagTemplate");
        //tagsLV.oniteminvoked = function (e) {
        //    e.detail.itemPromise.then(function (x) {
        //        WinJS.Navigation.navigate("/pages/home/home.html", { queryText: x.data });
        //    });
        //};

        //App.demosLoaded.then(function () {
        //    var tags = [];
        //    App.demosList.forEach(function (d) {
        //        if (d.tags) d.tags.split(" ").forEach(function (t) { tags.push(t); });
        //    });
        //    tags = tags.sort().distinct();
        //    if (options.queryText) tags = tags.filter(function(t) { return t == options.queryText; });
        //    tags.forEach(function(t) { tagsList.push(t); });
        //});
    }

})();
