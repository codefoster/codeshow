(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/xhr/xhr.html", {
        ready: function (element, options) {
            q("#btn1").onclick = function(e) {
                WinJS.xhr({ url: "http://odata.netflix.com/catalog/Titles?$top=500&$select=Id", headers: {Accept: "application/json"} })
                    .then(function (xhr) {
                        var result = JSON.parse(xhr.response).d
                            .map(function (r) { return r.Id; })[parseInt(Math.random() * 500)];
                        return result;
                    })
                    .then(function(id) {
                        WinJS.xhr({ url: "http://odata.netflix.com/catalog/Titles('" + id + "')?$select=Name", headers: { Accept: "application/json" } })
                            .then(function(xhr) {
                                q("#results1").innerText = JSON.parse(xhr.response).d.Name;
                            });
                    });
            };

            q("#btn2").onclick = function(e) {
                WinJS.xhr({ url: "http://www.microsoft.com", responseType: "document" }).then(function(xhr) {
                    var img = document.createElement("img");
                    img.src = q("img[Alt='Microsoft']", xhr.response)[0].src;
                    q(".xhr #results2").appendChild(img);
                });
            };

            q("#btn3").onclick = function(e) {
                WinJS.xhr({ url: "/demos/xhr/fetchme.html", responseType: "document" }).then(function(xhr) {
                    q(".xhr #results3").innerText = q("#fetchText", xhr.response).innerText;
                });
            };

            q("#btn4").onclick = function(e) {
                WinJS.xhr({ url: "http://pluralsight.com/odata/Courses?$select=Title&$top=5", headers: { Accept: "application/json" } })
                    .then(function (xhr) {
                        q(".xhr #results4").innerText = JSON.parse(xhr.response).d
                            .map(function (i) { return i.Title; })
                            .join(",");
                    }, function (error) { debugger; });
            };
        }
    });
})();
