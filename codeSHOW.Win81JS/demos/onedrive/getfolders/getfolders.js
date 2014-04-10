/// <reference path="///LiveSDKHTML/js/wl.js" />

(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/onedrive/getfolders/getfolders.html", {
        ready: function (element, options) {

        }
    });
})();


function getFolders() {
    WL.init({ scope: 'wl.signin' });

    // skydrive is used instead of onedrive ("me/skydrive" is the root folder of OneDrive)
    // to get the basic profile information of the user, use "me" as path
    // 'wl.skydrive' scope is used to get information from OneDrive, if you want to upload, use 'wl.skydrive_update'

    WL.login({ scope: 'wl.skydrive' }).then(
        function (e) {
            WL.api(
                {
                    path: "me/skydrive",
                    method: "GET"
                }).then(
                    function (response) {
                        debugger;
                    },
                    function (errorResponse) {
                        q("#allFolders").innerText = "Error retrieving folders";
                    }
                );
        },
        function (e) {
            q("#allFolders").innerText = "Not Connected";
        }
    );
}