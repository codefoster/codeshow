(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/share/share.html", {
        ready: function (element, options) {
            WinJS.Binding.processAll(document.querySelector("body"), options);
            
            Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView().ondatarequested = function(e) {
                var inputText = document.querySelector(".share #inputText").value;
                e.request.data.properties.title = (inputText.length > 40 ? inputText.slice(0, 40) + "..." : inputText);
                e.request.data.setText(inputText);
            };
        }

    });
})();
