(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/menus/menus.html", {
        ready: function (element, options) {
            element.querySelector(".sampleMenu").onclick = showHeaderMenu;
        }
    });

    function showHeaderMenu() {
        var sampleMenu = document.querySelector(".sampleMenu");
        var menu = headerMenu.winControl;
        menu.anchor = sampleMenu;
        menu.placement = "bottom";
        menu.alignment = "left";
        menu.show();
    }
})();
