/// <reference path="///LiveSDKHTML/js/wl.js" />
/// <reference path="///js/ocho.js" />

(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/authentication/authentication.html", {
        ready: function (element, options) {
            this.initSection1();
            this.initSection2();
        },
        initSection1: function () {
            var section1 = q(".authentication #liveSDK");

            WL.init();

            WL.Event.subscribe("auth.login", function () {
                if (WL.getSession()) log("You are signed in!");
            });

            WL.Event.subscribe("auth.sessionChange", function () {
                if (WL.getSession()) log("Your session has changed.");
            });

            q("#signIn", section1).onclick = function (e) {
                if (WL.getSession()) log("You are already signed in!");
                else WL.login({ scope: "wl.signin" });
            };

            function log(message) {
                var child = document.createTextNode(message);
                var logDiv = q("#log", section1);
                logDiv.appendChild(child);
                logDiv.appendChild(document.createElement("br"));
            }
        },
        initSection2: function () {

            //microsoft
            var microsoftSection = q(".authentication #wams #microsoft");
            q("button", microsoftSection).onclick = function (e) {
                app.client.login("microsoftaccount")
                    .done(function (results) {
                        q("div", microsoftSection).innerText += "User ID: " + results.userId;
                    }, function (error) { /* gulp */ });
            };

            ////facebook
            //var facebookSection = q(".authentication #wams #facebook");
            //q("button", facebookSection).onclick = function (e) {
            //    app.client.login("facebook")
            //        .done(function (results) {
            //                q("div", facebookSection).innerText += "User ID: " + results.userId;
            //        }, function (error) { debugger;  });
            //};

            ////twitter
            //var twitterSection = q(".authentication #wams #twitter");
            //q("button", twitterSection).onclick = function (e) {
            //    app.client.login("twitter")
            //        .done(function (results) {
            //            q("div", twitterSection).innerText += "User ID: " + results.userId;
            //        }, function (error) { debugger; });
            //};

            ////google
            //var googleSection = q(".authentication #wams #google");
            //q("button", googleSection).onclick = function (e) {
            //    app.client.login("google")
            //        .done(function (results) {
            //            q("div", googleSection).innerText += "User ID: " + results.userId;
            //        }, function (error) { debugger; });
            //};

        }


});


})();
