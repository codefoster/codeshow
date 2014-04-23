(function () {
    "use strict";

    var element;
    
    WinJS.UI.Pages.define("/demos/notifications/notifications.html", {
        ready: function (e, options) {
            element = e;
            initTileTextSection();
            initSecondaryTilesSection();
        }
    });
    
    function initTileTextSection() {
        var updater = Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication();

        q("button.sendText", element).onclick = function (e) {
            // build and send the tile notification

            //tileContent.textHeadingWrap.text = tileText.value;
            var squareTileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileSquare150x150Text04();
            squareTileContent.textBodyWrap.text = tileText.value;
            //tileContent.squareContent = squareTileContent;
            updater.enableNotificationQueue(enableQueueing.winControl.checked);
            updater.update(squareTileContent.createNotification());
        };
        
        q("button.clear", element).onclick = function (e) {
            updater.clear();
        };
    }
    
    function initSecondaryTilesSection() {
        //TODO: implement creation of secondary tile
    }
})();
