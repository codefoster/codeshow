 (function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/killads/killads.html", {
        ready: function (element, options) {
            app.paid = storeApp.licenseInformation.productLicenses.lookup("killTheAds").isActive;
            q("#killem", element).disabled = app.paid;
            if (!app.paid)
                q("#killem", element).onclick = function (e) {
                    storeApp.requestProductPurchaseAsync("killTheAds", false).then(
                        function () {
                            Windows.UI.Popups.MessageDialog("Thank you for the purchase!").showAsync().then(function() {
                                app.paid = true;
                                codeShow.Pages.Home.bindList();
                            });
                        },
                        function () { Windows.UI.Popups.MessageDialog("There was a problem completing the purchase. If you wouldn't mind, please send me an email at jeremy.foster@live.com and let me know so I can fix it.").showAsync(); }
                    );
                };
        }
    });
})();
