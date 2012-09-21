/// <reference path="/js/ocho.js"/>

(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/appbar/appbar.html", {
        ready: function (element, options) {
            q(".appbar input[type='radio']").forEach(function (i) { i.onchange = manageAppBar; });
            q(".appbar #showBtn").onclick = function () { q("#appbar").winControl.show(); };
            q(".appbar #hideBtn").onclick = function () { q("#appbar").winControl.hide(); };
            q(".appbar #sticky").onchange = function (e) {
                if (!q("#appbar")) Ocho.AppBar.set();
                q("#appbar").winControl.sticky = e.target.checked;
            };
        }
    });
    
    function manageAppBar(e) {
        switch(e.srcElement.id) {
            case "none":
                Ocho.AppBar.set();
                break;
            case "basic":
                Ocho.AppBar.set({
                    buttons: [
                        { label: "Add", icon: "add", click: function () { Windows.UI.Popups.MessageDialog("add").showAsync(); } },
                        { label: "Delete", icon: "delete", click: function () { Windows.UI.Popups.MessageDialog("delete").showAsync(); } },
                        { label: "Cancel", icon: "cancel", click: function () { Windows.UI.Popups.MessageDialog("cancel").showAsync(); } }
                    ]
                });
                break;
        }
    }
})();
