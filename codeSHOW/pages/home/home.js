(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            bindList();
        }
    });

    function bindList() {
        var list = q(".homepage #list").winControl;
        list.itemDataSource = App.demosList.dataSource;
        list.itemTemplate = q(".homepage #itemTemplate");
    }

})();
