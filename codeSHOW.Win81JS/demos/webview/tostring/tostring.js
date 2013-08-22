(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/webview/tostring/tostring.html", {
        ready: function (element, options) {
            element.querySelector("x-ms-webview").navigateToString("This is an <b>arbitrary</b> HTML string that I can navigate my WebView to.");
        }
    });
})();
