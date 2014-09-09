(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/liveauth/liveauth.html", {
        ready: function (element, options) {

            // the WL comes from the <script src="/js/wl.js"></script> reference in default.html
            WL.init();

            WL.Event.subscribe("auth.login", function () {
                if (WL.getSession()) log("You are signed in!");
            });

            WL.Event.subscribe("auth.sessionChange", function () {
                if (WL.getSession()) log("Your session has changed.");
            });

            element.querySelector("#signIn").onclick = function (e) {
                if (WL.getSession()) log("You are already signed in!");
                else WL.login({ scope: "wl.signin" });
            };

            function log(message) {
                var child = document.createTextNode(message);
                var logDiv = element.querySelector("#log");
                if (logDiv) {
                    logDiv.appendChild(child);
                    logDiv.appendChild(document.createElement("br"));
                }
            }
        }
    });
})();
