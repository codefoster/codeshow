(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/repeater/simple/simple.html", {
        init: function (element, options) {
            WinJS.Namespace.define("codeShow.Demos.repeater.simple", {
                itemList: new WinJS.Binding.List([
                    {name:"Item 1"},
                    {name:"Item 2"},
                    {name:"Item 3"},
                    {name:"Item 4"}
                ])
            });
        }
    });
})();
