WinJS.Namespace.define("Analytics", {
    Increment: function (key) {
        if (app.isConnected) {
            var analytics = codeshowClient.getTable("analytics");
            analytics.where({ key: key }).read().then(function (rr) {
                if (rr.length == 0) analytics.insert({ key: key, value: 1 });
                else {
                    rr[0].value++;
                    analytics.update(rr[0]);
                }
            });
        }
    }
});