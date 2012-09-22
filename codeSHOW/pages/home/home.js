(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            bindList(options);
        }
    });

    function bindList(options) {
        var data = App.demosList;
        options = options || { };
        if (options.queryText)
            data = data.createFiltered(function(i) {
                var result = i.tags && i.tags.split(" ").contains(options.queryText);
                return result;
            });

        var list = q(".homepage #list").winControl;
        list.itemDataSource = data.dataSource;
        list.itemTemplate = q(".homepage #itemTemplate");
    }

})();
