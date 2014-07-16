(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/xhr/xhr.html", {
        ready: function (element, options) {
            btn1.onclick = function(e) {
                WinJS.xhr({ url: "http://www.microsoft.com", responseType: "document" }).then(function(xhr) {
                    var img = document.createElement("img");
                    img.src = q("img[Alt='Microsoft']", xhr.response)[0].src;
                    results1.appendChild(img);
                });
            };

            btn2.onclick = function(e) {
                WinJS.xhr({ url: "/demos/xhr/fetchme.html", responseType: "document" }).then(function(xhr) {
                    results2.innerText = xhr.response.querySelector("#fetchText").innerText;
                });
            };

            btn3.onclick = function(e) {
                WinJS.xhr({ url: "http://pluralsight.com/odata/Courses?$select=Title&$top=5", headers: { Accept: "application/json" } })
                    .then(function (xhr) {
                        results3.innerText = JSON.parse(xhr.response).d
                            .map(function (i) { return i.Title; })
                            .join(",");
                    }, function (error) { debugger; });
            };
        }
    });
})();
