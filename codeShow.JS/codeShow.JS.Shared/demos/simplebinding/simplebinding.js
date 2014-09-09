(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/simplebinding/simplebinding.html", {
        ready: function (element, options) {
            var fred = { firstName: "Fred", lastName: "Johnson", email: "fred@live.com" };
            WinJS.Binding.processAll(element.querySelector(".person"), fred);
        }
    });
})();
