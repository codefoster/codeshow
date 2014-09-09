(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/wamsstorage/wamsstorage.html", {
        ready: function (element, options) {
            var inputAzure = element.querySelector("section[role=main] input");
            var storagedemo;
            codeshowClient.getTable("appSupport").read()
                .then(
                    function (table) { storagedemo = table.filter(function (r) { return r.key === "storagedemo"; })[0]; },
                    function () { storagedemo = { value: "" }; }
                )
                .then(
                    function () { inputAzure.value = storagedemo.value; }
                );
            element.querySelector("section[role=main] button").onclick = function (e) {
                storagedemo.value = inputAzure.value;
                codeshowClient.getTable("appSupport").update(storagedemo);
            };
        }
    });
})();
