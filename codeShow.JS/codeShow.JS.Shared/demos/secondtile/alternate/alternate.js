(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/secondtile/alternate/alternate.html", {
        ready: function (element, options) {
            element.querySelector("#createSecondaryTile").onclick = function (args) {
                var tile = new Windows.UI.StartScreen.SecondaryTile(
                    "SecondaryTile.Demo.secondtile.simple",
                    "Secondary tile",
                    "{}",
                    new Windows.Foundation.Uri("ms-appx:///images/square150.png"),
                    Windows.UI.StartScreen.TileSize.Square150x150
                );

                tile.onvisualelementsrequested = function (args) {
                    //add a couple of alternate logos that the user can choose to land on his start screen
                    args.request.alternateVisualElements[0].square150x150Logo = new Windows.Foundation.Uri("ms-appx:///images/secondary150.png");
                    args.request.alternateVisualElements[1].square150x150Logo = new Windows.Foundation.Uri("ms-appx:///images/html5.png");
                };
                
                tile.requestCreateAsync().done(function (isCreated) {
                    if (isCreated) {
                        element.querySelector("#createSecondaryTileResults").innerText = "Secondary tile has been pinned to your start screen.";
                    }
                });
            };
        }
    });
})();
