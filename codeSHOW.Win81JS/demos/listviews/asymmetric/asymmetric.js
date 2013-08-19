(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/listviews/asymmetric/asymmetric.html", {
        ready: function (element, options) {
            var images = [
                { url: "/demos/listviews/asymmetric/images/01.jpg", type: "bigsquare" },
                { url: "/demos/listviews/asymmetric/images/02.jpg", type: "square" },
                { url: "/demos/listviews/asymmetric/images/03.jpg", type: "square" },
                { url: "/demos/listviews/asymmetric/images/04.jpg", type: "tall" },
                { url: "/demos/listviews/asymmetric/images/05.jpg", type: "square" },
                { url: "/demos/listviews/asymmetric/images/06.jpg", type: "square" },
                { url: "/demos/listviews/asymmetric/images/07.jpg", type: "square" },
                { url: "/demos/listviews/asymmetric/images/08.jpg", type: "wide" },
                { url: "/demos/listviews/asymmetric/images/09.jpg", type: "square" },
                { url: "/demos/listviews/asymmetric/images/10.jpg", type: "square" }
            ];

            var lv = q(".listviews .asymmetric .win-listview").winControl;
            lv.itemDataSource = new WinJS.Binding.List(images).dataSource;
            lv.itemTemplate = q(".listviews .asymmetric #imageTemplate");

            lv.layout.type = new WinJS.UI.CellSpanningLayout();

            //this is a custom function that tells the ListView what size the items are
            lv.layout.itemInfo = function (i) {
                var size = { width:120, height:120 };
                if (images[i].type == "bigsquare") { size.width = 250; size.height = 250; }
                else if (images[i].type == "wide") size.width = 250;
                else if (images[i].type == "tall") size.height = 250;
                return size;
            };

            lv.layout.groupInfo = function () { return { enableCellSpanning: true, cellWidth: 120, cellHeight: 120 }; };
        }
    });
})();
