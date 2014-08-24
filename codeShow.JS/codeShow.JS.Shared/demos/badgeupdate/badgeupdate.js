(function () {
	"use strict";

	var element;

	WinJS.UI.Pages.define("/demos/badgeupdate/badgeupdate.html", {
		ready: function (e, options) {
			element = e;
			initBadgeSection();
		}
	});

	function initBadgeSection() {

	    element.querySelector("button.sendBadge").onclick = function (e) {
	        var value = element.querySelector("#badgeNumber").value;
			var number = parseInt(value);

			if (isNaN(number))
				return;

			updateBadge(number);
		};

	    element.querySelectorAll("button.status").toArray().forEach(function (b) {
			b.onclick = function (e) {
				var value = e.target.innerText.toLowerCase();
				if (value === 'new message')
					value = 'newMessage';

				updateBadge(value);
			};
		});

	    element.querySelector("button.clear").onclick = function (e) {
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

    //enable toArray() function on NodeLists
    NodeList.prototype.toArray = Ocho.Array.toArray;

})();
