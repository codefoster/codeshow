/// <reference path="///Microsoft.WinJS.1.0/js/wl.js" />

(function () {
    "use strict";

    var app = WinJS.Application;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            bindList(element, options);
        },
        unload: function () {
            q("#appbar").winControl.sticky = false;
            q("#appbar").winControl.hide();
        }
    });

    function bindList(element, options) {
        var demosList = app.demosList;
        options = options || { };
        if (options.queryText)
            demosList = demosList.createFiltered(function(i) {
                var result = i.tags && i.tags.split(" ").contains(options.queryText);
                return result;
            });

        var demosLV = q("#demosLV", element).winControl;
        demosLV.itemDataSource = demosList.dataSource;
        demosLV.selectionMode = "single";
        demosLV.itemTemplate = q("#itemTemplate", element);
        demosLV.oniteminvoked = function(e) {
            e.detail.itemPromise.then(function(x) {
                var location = format("/demos/{0}/{0}.html", x.data.key);
                WinJS.Navigation.navigate(location, x.data);
            });
        };
        demosLV.onselectionchanged = function(e) {
            if (demosLV.selection.count() > 0) {
                q("#appbar").winControl.sticky = true;
                q("#appbar").winControl.show();
            } else {
                q("#appbar").winControl.sticky = false;
                q("#appbar").winControl.hide();
            }
        };
        Ocho.AppBar.set({
           buttons: [{ label: "See the Code", icon: "page2", click: seeTheCodeClick }]
        });
        
        function seeTheCodeClick(e) {
            //get the selected item and pass the demo name in to the navigate function below
            var demo;
            q("#demosLV").winControl.selection.getItems().then(function (selectedItems) {
                demo = selectedItems[0].data;
            });
            WinJS.Navigation.navigate("/pages/demoCode/demoCode.html", demo);
        }
    }
})();
