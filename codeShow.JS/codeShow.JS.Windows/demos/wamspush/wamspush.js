(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/wamspush/wamspush.html", {
        ready: function (element, options) {
            var channelOperation = Windows.Networking.PushNotifications.PushNotificationChannelManager
                .createPushNotificationChannelForApplicationAsync();

            push.onclick = function (e) {
                channelOperation.then(function (channel) {
                    codeshowClient
                        .getTable("wamspush_notifications")
                        .insert({ channel: channel.uri, message: message.value, sent: false });
                });
            };
        }
    });
})();
