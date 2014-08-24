(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/htmlfragment/htmlfragment.html", {
        ready: function (element, options) {
            WinJS.UI.Fragments.render("/demos/htmlfragment/li.html", element.querySelector(".htmlfragment section[role=main] > ul"));
        }
    });
})();
