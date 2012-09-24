(function () {
    "use strict";

    var images = [
        { url: "/pages/heroimages/01.jpg", type: "bigsquare" },
        { url: "/pages/heroimages/02.jpg", type: "square" },
        { url: "/pages/heroimages/03.jpg", type: "square" },
        { url: "/pages/heroimages/04.jpg", type: "tall" },
        { url: "/pages/heroimages/05.jpg", type: "square" },
        { url: "/pages/heroimages/06.jpg", type: "square" },
        { url: "/pages/heroimages/07.jpg", type: "square" },
        { url: "/pages/heroimages/08.jpg", type: "wide" },
        { url: "/pages/heroimages/09.jpg", type: "square" },
        { url: "/pages/heroimages/10.jpg", type: "square" }
    ];

    WinJS.UI.Pages.define("/pages/heroimages/heroimages.html", {
        ready: function (element, options) {
            var l = q(".heroimages [data-win-control='WinJS.UI.ListView']").winControl;
            l.itemDataSource = new WinJS.Binding.List(images).dataSource;
            l.itemTemplate = q(".heroimages #imageTemplate");
            l.layout.groupInfo = function() { return { enableCellSpanning: true, cellWidth: 180, cellHeight: 180 }; };
        }
    });
})();
