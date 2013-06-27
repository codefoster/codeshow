(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/wamspush/wamspush.html", {
        ready: function (element, options) {
            var channelOperation = Windows.Networking.PushNotifications.PushNotificationChannelManager
                .createPushNotificationChannelForApplicationAsync();

            q("#push").onclick = function (e) {
                channelOperation.then(function (channel) {
                    app.client
                        .getTable("wamspush_notifications")
                        .insert({ channel: channel.uri, message: q("#message").value, sent: false });
                });
            };
        }
    });
})();
