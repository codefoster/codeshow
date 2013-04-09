(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/killads/killads.html", {
        ready: function (element, options) {
            var paid = storeApp.licenseInformation.productLicenses.lookup("Product1Name").isActive;
            q("#killem", element).disabled = paid;
            if (!paid)
                q("#killem", element).onclick = function (e) {
                    storeApp.requestProductPurchaseAsync("Product1Name", false).then(
                        function () {
                            Windows.UI.Popups.MessageDialog("Thank you for the purchase!").showAsync();
                        },
                        function () {
                            Windows.UI.Popups.MessageDialog("There was a problem completing the purchase. If you wouldn't mind, please send me an email at jeremy.foster@live.com and let me know so I can fix it.").showAsync();
                        }
                        );
                };
        }
    });
})();
