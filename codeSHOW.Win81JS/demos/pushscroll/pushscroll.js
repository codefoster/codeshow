(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/pushscroll/pushscroll.html", {
        ready: function (element, options) {
            var itemsList = new WinJS.Binding.List();
            for (var i = 1; i <= 100; i++) itemsList.push(i);
            var listElement = q(".pushscroll [data-win-control='WinJS.UI.ListView']");
            var list = listElement.winControl;
            list.itemDataSource = itemsList.dataSource;
            list.itemTemplate = q(".pushscroll [data-win-control='WinJS.Binding.Template']");
            Ocho.Misc.addPushScroll(listElement);
        }
    });
})();
