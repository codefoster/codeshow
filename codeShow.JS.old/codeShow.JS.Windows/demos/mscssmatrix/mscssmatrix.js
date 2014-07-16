(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/mscssmatrix/mscssmatrix.html", {
        ready: function (element, options) {
            var hello = document.getElementById("hello");
            var m = new MSCSSMatrix(hello.style.transform);
            hello.style.transform = m.rotate(0, 0, -10);
        }
    });
})();
