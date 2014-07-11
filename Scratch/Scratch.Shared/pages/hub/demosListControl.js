(function () {
    "use strict";

    WinJS.Namespace.define("Controls", {
        DemosControl: WinJS.UI.Pages.define("/pages/hub/demosListControl.html", {
            ready: function (element, options) {
                options = options || {};

                var listView = element.querySelector(".itemslist").winControl;

                listView.itemDataSource = options.dataSource;
                listView.layout = options.layout;
                listView.oniteminvoked = options.oniteminvoked;
            }
        })
    });
})();