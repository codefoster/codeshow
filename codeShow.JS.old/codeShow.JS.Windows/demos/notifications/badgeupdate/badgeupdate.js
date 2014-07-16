(function () {
	"use strict";

	var element;

	WinJS.UI.Pages.define("/demos/notifications/badgeupdate/badgeupdate.html", {
		ready: function (e, options) {
			element = e;
			initBadgeSection();
		}
	});

	function initBadgeSection() {

		q("button.sendBadge", element).onclick = function (e) {
			var value = q("#badgeNumber", element).value;
			var number = parseInt(value);

			if (isNaN(number))
				return;

			updateBadge(number);
		};

		q("button.status", element).forEach(function (b) {
			b.onclick = function (e) {
				var value = e.target.innerText.toLowerCase();
				if (value === 'new message')
					value = 'newMessage';

				updateBadge(value);
			};
		});

		q("button.clear", element).onclick = function (e) {
			updateBadge('none');
		};
	}

	function updateBadge(value) {
		var badgeContent = "<badge version='1' value='" + value + "'/>";

		var xml = new Windows.Data.Xml.Dom.XmlDocument();
		xml.loadXml(badgeContent);
		var badge = Windows.UI.Notifications.BadgeNotification(xml);

		Windows.UI.Notifications.BadgeUpdateManager.createBadgeUpdaterForApplication().update(badge);
	}

})();
