(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/datejs/datejs.html", {
        ready: function (element, options) {
            input.querySelector("* > input").onkeyup = function(args) {
                var result = Date.parse(input.querySelector("* > input").value);
                output.querySelector(" * > input").innerText = result ? result : "";
            };
            
        },
    });
})();
