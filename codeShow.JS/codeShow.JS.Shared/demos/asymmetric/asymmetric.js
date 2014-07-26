(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/asymmetric/asymmetric.html", {
        init: function (element, options) {
            var images = [
                { url: "/demos/asymmetric/images/01.jpg", type: "bigsquare" },
                { url: "/demos/asymmetric/images/02.jpg", type: "square" },
                { url: "/demos/asymmetric/images/03.jpg", type: "square" },
                { url: "/demos/asymmetric/images/04.jpg", type: "tall" },
                { url: "/demos/asymmetric/images/05.jpg", type: "square" },
                { url: "/demos/asymmetric/images/06.jpg", type: "square" },
                { url: "/demos/asymmetric/images/07.jpg", type: "square" },
                { url: "/demos/asymmetric/images/08.jpg", type: "wide" },
                { url: "/demos/asymmetric/images/09.jpg", type: "square" },
                { url: "/demos/asymmetric/images/10.jpg", type: "square" }
            ];

            WinJS.Namespace.define("codeShow.Demos.listviews.asymmetric", {
                imagesList: new WinJS.Binding.List(images),
                itemInfoFunction: WinJS.Utilities.markSupportedForProcessing(function (i) {
                    var size = { width: 120, height: 120 };
                    if (images[i].type == "bigsquare") { size.width = 250; size.height = 250; }
                    else if (images[i].type == "wide") size.width = 250;
                    else if (images[i].type == "tall") size.height = 250;
                    return size;
                }),
                groupInfoFunction: WinJS.Utilities.markSupportedForProcessing(function () {
                    return { enableCellSpanning: true, cellWidth: 120, cellHeight: 120 };
                })
            });
        }
    });
})();
