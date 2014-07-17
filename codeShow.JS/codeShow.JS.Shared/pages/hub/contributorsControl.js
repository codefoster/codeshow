(function () {
    "use strict";

    WinJS.Namespace.define("Controls", {
        ContributorsControl: WinJS.UI.Pages.define("/pages/hub/contributorsControl.html", {
            ready: function (element, options) {
                options = options || {};

                var listView = element.querySelector(".itemslist").winControl;

                listView.itemDataSource = options.dataSource.dataSource;
                listView.layout = options.layout;
                listView.oniteminvoked = options.oniteminvoked;
            }
        })
    });
})();