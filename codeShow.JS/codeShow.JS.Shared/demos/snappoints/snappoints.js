(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/snappoints/snappoints.html", {
        ready: function (element, options) {
            var a = [];
            for (var i = 0; i <= 100; i++) {
                a.push({ number: i });
            }
            var aList = new WinJS.Binding.List(a);

            list.winControl.itemDataSource = aList.dataSource;
            list.winControl.itemTemplate = template;
        }
    });
})();
