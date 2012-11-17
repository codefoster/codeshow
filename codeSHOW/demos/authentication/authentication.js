/// <reference path="///LiveSDKHTML/js/wl.js" />
/// <reference path="///js/ocho.js" />

(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/authentication/authentication.html", {
        ready: function (element, options) {
            init();
        }
    });

    function init() {
        initSection1();
        initSection2();
    }

    function initSection1() {
        WL.init();

        WL.Event.subscribe("auth.login", function () {
            if (WL.getSession()) log("You are signed in!");
        });

        WL.Event.subscribe("auth.sessionChange", function () {
            if (WL.getSession()) log("Your session has changed.");
        });

        q(".authentication #btn").onclick = function (e) {
            if (WL.getSession()) log("You are already signed in!");
            else WL.login({ scope: "wl.signin" });
        };

        function log(message) {
            var child = document.createTextNode(message);
            var logDiv = q(".authentication #log");
            logDiv.appendChild(child);
            logDiv.appendChild(document.createElement("br"));
        }
    }

    function initSection2() {
        var userId = null;
        app.client.login("microsoftaccount").done(function (results) {
            //userId = results.userId;
            //refreshTodoItems();
            //var message = "You are now logged in as: " + userId;
            //var dialog = new Windows.UI.Popups.MessageDialog(message);
            //dialog.showAsync().done(complete);
            
        }, function (error) {
            //userId = null;
            //var dialog = new Windows.UI.Popups
            //    .MessageDialog("An error occurred during login", "Login Required");
            //dialog.showAsync().done(complete);
            
        });
    };
})();
