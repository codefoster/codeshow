(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            Ocho.AppBar.defineAppBarButtons(document.getElementById("appbar"), [
                { id: 'groupby', label: 'Group By', click: groupBy, icon: 'U+E130', section: 'global', extraClass: 'x', tooltip: 'Group By' },
                //{ id: 'delete', label: 'Delete', click: deleteClick, icon: 'add', section: 'selection', extraClass: 'singleSelect', tooltip: 'tooltip', options: { onSelectionOf: q("#list") } }
            ]);
            
            function groupBy() {
                new Windows.UI.Popups.MessageDialog("hi").showAsync();
            }
            
            var demosListGrouped = new WinJS.Binding.List(Data.demos).createGrouped(
                function(i) { return i.group; },
                function(i) { return i.group; }
            );

            var list = q("#list").winControl;
            list.itemDataSource = demosListGrouped.dataSource;
            list.itemTemplate = q("#itemTemplate");
            list.groupDataSource = demosListGrouped.groups.dataSource;
            list.groupHeaderTemplate = q("#headerTemplate");
        }
    });
})();
