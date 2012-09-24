(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/share_simple/share_simple.html", {
        ready: function (element, options) {
            WinJS.Binding.processAll(q("body"), options);
            
            Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView().ondatarequested = function(e) {
                var inputText = q("#inputText").value;
                e.request.data.properties.title = (inputText.length > 40 ? inputText.slice(0, 40) + "..." : inputText);
                e.request.data.setText(inputText);
            };
        }

    });
})();
