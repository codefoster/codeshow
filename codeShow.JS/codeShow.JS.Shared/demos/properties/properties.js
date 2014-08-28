(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/properties/properties.html", {
        ready: function (element, options) {
            
            
            var squares = {
                square1: { color: "red", width: "100px", height: "100px" },
                square2: { color: "blue", width: "200px", height: "200px" },
            };
            
            WinJS.Binding.processAll(document.querySelector("section[role=mail]"), squares);
        }
    });
})();
