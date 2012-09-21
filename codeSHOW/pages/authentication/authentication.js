(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/authentication/authentication.html", {
        ready: function (element, options) {
            q(".authentication #btn").onclick = function (e) {
                WL.init({ client_id: "00000000480D3B4B", redirect_uri: "http://www.codeshow.info"});
                WL.Event.subscribe("auth.login", onLogin);
                WL.Event.subscribe("auth.sessionChange", onSessionChange);

                var session = WL.getSession();
                if (session) {
                    log("You are already signed in!");
                } else {
                    //TODO: this isn't working... invalide request error being thrown
                    WL.login({ scope: "wl.signin" })
                        .then(
                            function (e) { debugger; },
                            function (e) { debugger; }
                        );
                }

                function onLogin() {
                    var session = WL.getSession();
                    if (session) {
                        log("You are signed in!");
                    }
                }

                function onSessionChange() {
                    var session = WL.getSession();
                    if (session) {
                        log("Your session has changed.");
                    }
                }

            };

            function log(message) {
                var child = document.createTextNode(message);
                var logDiv = q(".authentication #log");
                logDiv.appendChild(child);
                logDiv.appendChild(document.createElement("br"));
            }
        }
    });
})();
