(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/xhr/xhr.html", {
        ready: function (element, options) {
            btn1.onclick = function(e) {
                WinJS.xhr({ url: "http://www.microsoft.com", responseType: "document" }).then(function(xhr) {
                    var img = document.createElement("img");
                    
                    img.src = xhr.response.querySelector("img[Alt='Microsoft']").src;
                    results1.appendChild(img);
                });
            };

            btn2.onclick = function(e) {
                WinJS.xhr({ url: "/demos/xhr/fetchme.html", responseType: "document" }).then(function(xhr) {
                    results2.innerText = xhr.response.querySelector("#fetchText").innerText;
                });
            };

            //btn3.onclick = function(e) {
            //    WinJS.xhr({ url: "http://services.odata.org/V4/TripPinServiceRW.svc/Airlines", headers: { Accept: "application/json" } })
            //        .then(function (xhr) {
            //            results3.innerText = JSON.parse(xhr.response).document
            //                .map(function (i) { return i.Name; })
            //                .join(",");
            //        }, function (error) { debugger; });
            //};
        }
    });
})();
