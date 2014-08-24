(function () {
	"use strict";

	var element;

	WinJS.UI.Pages.define("/demos/tileupdate/tileupdate.html", {
		ready: function (e, options) {
			element = e;
			initTileTextSection();
			initSecondaryTilesSection();
		}
	});

	function initTileTextSection() {
		var updater = Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication();

		element.querySelector("button.sendText").onclick = function (e) {
			// build and send the tile notification

		    //tileContent.textHeadingWrap.text = element.querySelector("#tileText").value;
			var squareTileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileSquare150x150Text04();
			squareTileContent.textBodyWrap.text = element.querySelector("#tileText").value;
			//tileContent.squareContent = squareTileContent;
			updater.enableNotificationQueue(element.querySelector("#enableQueueing").winControl.checked);
			updater.update(squareTileContent.createNotification());
		};

		element.querySelector("button.clear").onclick = function (e) {
			updater.clear();
		};
	}

	function initSecondaryTilesSection() {
		//TODO: implement creation of secondary tile
	}
})();
