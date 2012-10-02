(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/simple/simple.html", {
        ready: function (element, demo) {
            WinJS.Binding.processAll(q("body"), demo);
            
            var fred = { firstName: "Fred", lastName: "Johnson", email: "fred@live.com" };

            var element = document.querySelector("#person");
            WinJS.Binding.processAll(element, fred);

        }
    });
})();
