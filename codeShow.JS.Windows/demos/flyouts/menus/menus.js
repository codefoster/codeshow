(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/flyouts/menus/menus.html", {
        ready: function (element, options) {
            q(".sampleMenu").onclick = showHeaderMenu;
        }
    });

    function showHeaderMenu() {
        var sampleMenu = q(".sampleMenu");
        var menu = headerMenu.winControl;
        menu.anchor = sampleMenu;
        menu.placement = "bottom";
        menu.alignment = "left";
        menu.show();
    }
})();
