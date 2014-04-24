(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/appbar2/appbar2.html", {
        ready: function (element, options) {
            var bar = declarativeAppBar.winControl;
            
            //imperatively add a click handler for the add button
            var cmdAdd = bar.getCommandById("cmdAdd");
            cmdAdd.onclick = function(e) {
                Windows.UI.Popups.MessageDialog("add").showAsync();
            };

            //expose a function to the declaration page
            WinJS.Namespace.define("appbar2", {
                remove: WinJS.Utilities.markSupportedForProcessing(function (e) {
                    Windows.UI.Popups.MessageDialog("remove").showAsync();
                })
            });
        }
    });
})();