(function () {
	"use strict";

	WinJS.UI.Pages.define("/demos/notifications/toasts/toasts.html", {
		ready: function (e, options) {
			this.element = e;
			this._notifTemplate = "<toast><visual><binding template='ToastText01'><text id='1'>BODY_TEXT</text></binding></visual></toast>";

			this.initialize();
		},
		initialize: function () {
			q("div#scheduleTime").winControl.current = new Date();

			q("button#now", this.element).onclick = function (e) {
				var xml = this._getXml();
				if (!xml)
					return;
				var toast = new Windows.UI.Notifications.ToastNotification(xml);
				Windows.UI.Notifications.ToastNotificationManager.createToastNotifier().show(toast);

			}.bind(this);

			q("button#schedule", this.element).onclick = function (e) {

				var date = q("div#scheduleTime").winControl.current;
				var now = new Date();
				if ((date.getHours() > now.getHours()) || (date.getHours() === now.getHours() && date.getMinutes() > now.getMinutes())) {
					try {

						var xml = this._getXml();
						if (!xml)
							return;

						now.setHours(date.getHours(), date.getMinutes());
						var toast = new Windows.UI.Notifications.ScheduledToastNotification(xml, now);
						Windows.UI.Notifications.ToastNotificationManager.createToastNotifier().addToSchedule(toast);

						this._showMessage("Toast notification:'" + q("input#toastText", this.element).value + "' scheduled for:" + now);
					}
					catch (err) {
						this._showMessage(err, true);
					}
				}
				else
					this._showMessage("Toast must be scheduled for the future!", true);

			}.bind(this);

			q("button#clear", this.element).onclick = function (e) {
				var scheduledToasts = Windows.UI.Notifications.ToastNotificationManager.createToastNotifier().getScheduledToastNotifications();
				if (scheduledToasts.length) {
					var notifier = Windows.UI.Notifications.ToastNotificationManager.createToastNotifier();
					for (var i = 0; i < scheduledToasts.length; i++) {
						var scheduled = scheduledToasts[i];
						notifier.removeFromSchedule(scheduled);
						this._showMessage(scheduled.content.innerText + ' successfully removed');
					}
				}
			}.bind(this);

			q("button#clearMessages", this.element).onclick = function (e) {
				var msg = q("div#messages");
				q('span', msg).forEach(function (s) { msg.removeChild(s); });
				q("button#clearMessages").style.visibility = 'hidden';
			}.bind(this);
		},
		_getXml: function (){
			var text = q("input#toastText", this.element).value;
			if (!text)
				return;

			var xml = new Windows.Data.Xml.Dom.XmlDocument();
			var stringContent = this._notifTemplate.replace("BODY_TEXT", text);
			xml.loadXml(stringContent);

			return xml;
		},
		_showMessage: function (text, error) {
			var msg = q("div#messages");
			var span = document.createElement("span");
			span.style.display = 'block';
			if (error)
				span.style.color = 'red';
			span.textContent = text;
			msg.appendChild(span);

			q("button#clearMessages").style.visibility = '';
		}
	});

	function scheduleToast() {
		var m = q('.message');
	}

})();
