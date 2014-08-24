(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/wamsauth/wamsauth.html", {
        ready: function (element, options) {
            //microsoft
            microsoft.querySelector("button").onclick = function (e) {
                codeshowClient.login("microsoftaccount")
                    .done(function (results) {
                        microsoft.querySelector("div").innerText += "User ID: " + results.userId;
                    }, function (error) { debugger; /* gulp */ });
            };

            //facebook
            facebook.querySelector("button").onclick = function (e) {
                codeshowClient.login("facebook")
                    .done(function (results) {
                        facebook.querySelector("div").innerText += "User ID: " + results.userId;
                    }, function (error) { debugger;  });
            };

            ////twitter
            //var twitterSection = element.querySelector("#twitter");
            //twitterSection.querySelector("button").onclick = function (e) {
            //    codeshowClient.login("twitter")
            //        .done(function (results) {
            //            twitterSection.querySelector("div").innerText += "User ID: " + results.userId;
            //        }, function (error) { debugger; });
            //};

            ////google
            //var googleSection = element.querySelector("#google");
            //googleSection.querySelector("button").onclick = function (e) {
            //    codeshowClient.login("google")
            //        .done(function (results) {
            //            googleSection.querySelector("div").innerText += "User ID: " + results.userId;
            //        }, function (error) { debugger; });
            //};
        }
    });
})();
