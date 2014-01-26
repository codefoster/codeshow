(function () {
    "use strict";
    importScripts("//Microsoft.WinJS.2.0/js/base.js");
    var message = "Time Zone Change!";
    var updater = Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication();
    var tileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileWideText03();
    tileContent.textHeadingWrap.text = message;
    var squareTileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileSquareText04();
    squareTileContent.textBodyWrap.text = message;
    tileContent.squareContent = squareTileContent;
    updater.enableNotificationQueue(true);
    updater.update(tileContent.createNotification());
    close();
})();
