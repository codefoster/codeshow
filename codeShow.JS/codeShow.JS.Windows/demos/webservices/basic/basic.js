(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/webservices/basic/basic.html", {
        ready: function (element, options) {
            var resultDiv = element.querySelector(".results");
            WinJS.xhr({ url: "http://widgetservice.azurewebsites.net/api/Values" })
                .then(function (d) {
                    JSON.parse(d.response).forEach(function (r) {
                        resultDiv.innerHTML += r + "<br/>";
                    });
                });
        }
    });
})();
