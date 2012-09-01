(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/datejs/datejs.html", {
        ready: function (element, options) {
            q("div#input > input").onkeyup = function(args) {
                var result = Date.parse(q("div#input > input").value);
                q("#output > input").innerText = result ? result : "";
            };
            
        },
    });
})();
