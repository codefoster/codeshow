(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/xhr/xhr.html", {
        ready: function (element, options) {
            q("#btn1").onclick = function(e) {
                WinJS.xhr({ url: "http://odata.netflix.com/catalog/Titles?$top=500&$select=Id", headers: {Accept: "application/json"} })
                    .then(
                        function (xhr) {
                            //TODO: add a "working" spinner
                            var result = JSON.parse(xhr.response).d
                                .map(function (r) { return r.Id; })[parseInt(Math.random() * 500)];
                            return result;
                        }
                    ).then(
                        function(id) {
                            WinJS.xhr({ url: "http://odata.netflix.com/catalog/Titles('" + id + "')?$select=Name", headers: { Accept: "application/json" } })
                                .then(function(xhr) {
                                    q("#results1").innerText = JSON.parse(xhr.response).d.Name;
                                });
                        }
                    );
            };
        }
    });
})();
