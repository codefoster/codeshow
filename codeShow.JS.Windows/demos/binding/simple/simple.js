(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/binding/simple/simple.html", {
        ready: function (element, options) {
            var fred = { firstName: "Fred", lastName: "Johnson", email: "fred@live.com" };
            WinJS.Binding.processAll(element.querySelector(".person"), fred);
        }
    });
})();
