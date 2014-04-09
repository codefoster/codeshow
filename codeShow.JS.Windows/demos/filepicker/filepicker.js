(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/filepicker/filepicker.html", {
        ready: function (element, options) {
            var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
            openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
            openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
            openPicker.fileTypeFilter.replaceAll([".png", ".jpg", ".jpeg"]);

            q(".filepicker #open").onclick = function (e) {
                openPicker.pickSingleFileAsync().then(function (file) {
                    var result = q(".filepicker #result");
                    if (file) {
                        var img = q(".filepicker img");
                        img.src = URL.createObjectURL(file);
                        img.style.display = "block";
                        result.innerText = "";
                    } else {
                        result.innerText = "No file picked";
                    }
                });
            };

        }
    });
})();
