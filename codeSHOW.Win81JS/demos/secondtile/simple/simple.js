(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/secondtile/simple/simple.html", {
        ready: function (element, options) {
            createSecondaryTile.onclick = function (args) {
                var tile = new Windows.UI.StartScreen.SecondaryTile(
                    "SecondaryTile.Demo.secondtile.simple",
                    "Secondary tile",
                    "{}",
                    new Windows.Foundation.Uri("ms-appx:///images/square150.png"),
                    Windows.UI.StartScreen.TileSize.Square150x150
                );

                tile.requestCreateAsync().done(function (isCreated) {
                    if (isCreated) {
                        element.querySelector("#createSecondaryTileResults").innerText = "Secondary tile has been pinned to your start screen.";
                    }
                });
            };
        }
    });
})();
