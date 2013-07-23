(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/flyouts/flyouts.html", {
        ready: function (element, options) {
            q("#showFlyout",element).onclick = function(e) { q("#flyout1", element).winControl.show(this); };
            q(".flyouts header .titlearea").onclick = showHeaderMenu;
        }
    });

    function showHeaderMenu() {
        var title = q(".flyouts header .titlearea");
        var menu = q(".flyouts #headerMenu").winControl;
        menu.anchor = title;
        menu.placement = "bottom";
        menu.alignment = "left";

        menu.show();
    }

})();
