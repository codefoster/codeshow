(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            Ocho.AppBar.defineAppBarButtons(document.getElementById("appbar"), [
                //{ id: 'groupby', label: 'Group By', click: groupBy, icon: 'U+E130', section: 'global', extraClass: 'x', tooltip: 'Group By' },
                //{ id: 'delete', label: 'Delete', click: deleteClick, icon: 'add', section: 'selection', extraClass: 'singleSelect', tooltip: 'tooltip', options: { onSelectionOf: q("#list") } }
            ]);

            bindList();
        }
    });

    function bindList() {
        var list = q(".homepage #list").winControl;
        list.itemDataSource = App.demosList.dataSource;
        list.itemTemplate = q(".homepage #itemTemplate");
    }

})();
