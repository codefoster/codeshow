/// <reference path="/js/ocho.js"/>

(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/appbar/appbar.html", {
        ready: function (element, options) {
            if (!q("#appbar")) Ocho.AppBar.set();
            q(".appbar #sticky").checked = q("#appbar").winControl.sticky;
            
            //wire up the onchange event of all radio buttons to the same event
            q(".appbar input[type='radio']").forEach(function (i) { i.onchange = manageAppBar; });
            
            //show the appbar (it won't show if it's set to none because it doesn't exist)
            q(".appbar #showBtn").onclick = function () { q("#appbar").winControl.show(); };
            
            //hide the appbar
            q(".appbar #hideBtn").onclick = function () { q("#appbar").winControl.hide(); };

            //when the user checks or unchecks the "sticky" checkbox, call Ocho.AppBar.set() to make sure
            //the appbar exists yet and then set its sticky property
            q(".appbar #sticky").onchange = function (e) {
                q("#appbar").winControl.sticky = e.target.checked;
            };
        },

        unload: function () {
            Ocho.AppBar.set();
            q("#appbar").winControl.hide();
        }
    });
    
    function manageAppBar(e) {
        switch(e.srcElement.id) {
            case "none":
                //calling Ocho.AppBar.set() without passing anything in effectively clears and disables the appbar
                Ocho.AppBar.set();
                break;
            case "basic":
                //you can create appbar buttons easily... just pass an array into the "buttons" property of the
                //set method. Notice that the first button is just {} so it gets everything defaulted and does
                //nothing when you click it
                Ocho.AppBar.set({
                    buttons: [
                        {},
                        { label: "Add", icon: "add", click: function () { Windows.UI.Popups.MessageDialog("add").showAsync(); } },
                        { label: "Delete", icon: "delete", click: function () { Windows.UI.Popups.MessageDialog("delete").showAsync(); } },
                        { label: "Cancel", icon: "cancel", click: function () { Windows.UI.Popups.MessageDialog("cancel").showAsync(); } },
                    ]
                });
                break;
        }
    }
})();
