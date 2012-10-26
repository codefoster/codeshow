(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/menus/menus.html", {
        ready: function (element, options) {
            q(".menus header .titlearea").onclick = showHeaderMenu;
        }
    });

    function showHeaderMenu() {
        var title = q(".menus header .titlearea");
        var menu = q(".menus #headerMenu").winControl;
        menu.anchor = title;
        menu.placement = "bottom";
        menu.alignment = "left";

        menu.show();
    }
})();
