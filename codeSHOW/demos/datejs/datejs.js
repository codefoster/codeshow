(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/datejs/datejs.html", {
        ready: function (element, options) {
            q("div#input > input",element).onkeyup = function(args) {
                var result = Date.parse(q("div#input > input").value);
                q("#output > input",element).innerText = result ? result : "";
            };
            
        },
    });
})();
