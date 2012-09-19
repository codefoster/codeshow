(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/filepicker/filepicker.html", {
        ready: function (element, options) {
            var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
            openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
            openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
            openPicker.fileTypeFilter.replaceAll([".png", ".jpg", ".jpeg"]);

            q(".filepicker #open").onclick = function (e) {
                openPicker.pickSingleFileAsync().then(function (file) {
                    if (file) {
                        // Application now has read/write access to the picked file
                        //WinJS.log && WinJS.log("Picked photo: " + file.name, "sample", "status");
                    } else {
                        // The picker was dismissed with no selected file
                        //WinJS.log && WinJS.log("Operation cancelled.", "sample", "status");
                    }
                });
            };

        }
    });
})();
