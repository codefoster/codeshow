(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/fragment/localhtml/localhtml.html", {
        ready: function (element, options) {
            WinJS.UI.Fragments.render("/demos/fragment/localhtml/li.html", q(".fragment .localhtml section[role=main] > ul"));
        }
    });
})();
