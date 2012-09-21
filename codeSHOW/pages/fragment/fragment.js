(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/fragment/fragment.html", {
        ready: function (element, options) {
            WinJS.UI.Fragments.render("/pages/fragment/li.html", q("#target"));
        }
    });
})();
