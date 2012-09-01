(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/simple/simple.html", {
        ready: function (element, options) {
            WinJS.Binding.processAll(q("body"), options);
            
            var fred = { firstName: "Fred", lastName: "Johnson", email: "fred@live.com" };
            var element = document.querySelector("#person");
            WinJS.Binding.processAll(element, fred);

        }
    });
})();
