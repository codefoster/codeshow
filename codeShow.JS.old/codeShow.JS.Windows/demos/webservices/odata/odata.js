(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/webservices/odata/odata.html", {
        ready: function (element, options) {
            var resultDiv = element.querySelector(".results");
            WinJS.xhr({ url: "http://services.odata.org/V4/Northwind/Northwind.svc/Products?$select=ProductName" })
                .then(function (d) {
                    JSON.parse(d.response).value.forEach(function (r) {
                        resultDiv.innerHTML += r.ProductName + "<br/>";
                    });
                });
        }
    });
})();
