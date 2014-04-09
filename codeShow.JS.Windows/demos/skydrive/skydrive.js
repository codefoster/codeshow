/// <reference path="///LiveSDKHTML/js/wl.js" />

(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/skydrive/skydrive.html", {
        ready: function (element, options) {
// http://go.microsoft.com/fwlink/?LinkId=232511
            WL.init({ scope: 'wl.signin' });
            WL.login({ scope: 'wl.skydrive' }).then(
                function (e) {
                    debugger;
                },
                function (e) {
                    debugger;

                }
            );
        }
    });
})();
