(function () {
    "use strict";

    var httpClient = new Windows.Web.Http.HttpClient();

    WinJS.UI.Pages.define("/demos/httpclient/httpclient.html", {
        ready: function (element, options) {
            httpClient.getStringAsync(new Windows.Foundation.Uri("http://www.microsoft.com")).done(function (result) {
                element.querySelector(".result").innerText = result;
            });
        },

        unload: function () {
            httpClient = null;
        }

    });
})();
