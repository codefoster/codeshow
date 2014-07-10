(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/secondtile/pinandpush/pinandpush.html", {
        ready: function (element, options) {
            var startScreen = Windows.UI.StartScreen;
            var notifications = Windows.UI.Notifications;

            if (startScreen.SecondaryTile.exists("tileid.01")) pintile.innerText = "Unpin"; //if secondary tile exists then display "Unpin"

            pintile.addEventListener("click", function () {
                if (startScreen.SecondaryTile.exists("tileid.01")) {
                    //request delete secondary tile, it can't be done without requesting the user to do so
                    var secondaryTile = startScreen.SecondaryTile("tileid.01");
                    secondaryTile.requestDeleteAsync().done(
                        function (isDone) {
                            if (isDone) pintile.innerText = "Pin tile";
                        }
                    );
                } else {
                    //create a new secondary tile
                    var secondaryTile = new startScreen.SecondaryTile("tileid.01", "codeShow ST", "codeShow ST", "tileArgs=01", startScreen.TileOptions.showNameOnLogo, new Windows.Foundation.Uri("ms-appx:///images/logo.png"));

                    var Rect = pintile.getBoundingClientRect();
                    var bounding = { x: Rect.left, y: Rect.top, width: Rect.width, height: Rect.height }; //get the bounding rectangle coordinates for requesting creation of secodary tile

                    secondaryTile.requestCreateForSelectionAsync(bounding, Windows.UI.Popups.Placement.right).done(
                        function (isDone) {
                            //push some text to tile if isDone
                            if (isDone) {
                                var tileTemplate = notifications.TileTemplateType.tileSquareText01;
                                var tileXml = notifications.TileUpdateManager.getTemplateContent(tileTemplate); //get XML DOM from template

                                tileXml.getElementsByTagName("text")[0].appendChild(tileXml.createTextNode("codeShow"));
                                tileXml.getElementsByTagName("text")[1].appendChild(tileXml.createTextNode(q("#tiletext").value)); //write the value to tile

                                tileXml.getElementsByTagName("binding")[0].setAttribute("branding", "name"); //choose branding as one of the 'name', 'logo' or 'none'

                                var tileNotification = notifications.TileNotification(tileXml);
                                notifications.TileUpdateManager.createTileUpdaterForSecondaryTile("tileid.01").update(tileNotification); //update the tile

                                pintile.innerText = "Unpin";
                            }
                        }
                    );

                }
            });

        }
    });
})();
