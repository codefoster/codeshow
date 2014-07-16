    (function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/apps/apps.html", {
        init: function (element, options) {
            WinJS.Namespace.define("codeShow.Pages.Apps", {
                Data: new WinJS.Binding.List()
            });
        },
        ready: function (element, options) {
            Data.apps.forEach(function (app) {
                codeShow.Pages.Apps.Data.push(app);
            });
        }
    });
})();
