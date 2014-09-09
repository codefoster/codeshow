(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/onedrivepushfile/onedrivepushfile.html", {
        ready: function (element, options) {
            WL.init();

            // 'wl.skydrive' gives access to OneDrive but not write permissions
            // so 'wl.skydrive_update' has been used
            WL.login({ scope: "wl.skydrive_update" });

            pushfilebtn.addEventListener("click", pushFile);
        }
    });
})();

function pushFile() {

    if (!WL.getSession()) {
        pushStatus.innerText = "Not logged in";
        return;
    }

    var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
    openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
    openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
    openPicker.fileTypeFilter.replaceAll([".png", ".jpg", ".jpeg"]);

    openPicker.pickSingleFileAsync().then(function (file) {
        if (file) {
            pushStatus.innerText = "Uploading...";

            WL.backgroundUpload({
                path: "me/skydrive",
                file_name: file.name,
                file_input: file,
                overwrite: "rename"
            }).then(
                    function (response) {
                        pushStatus.innerText = "Uploaded";
                    },
                    function (response_error) {
                        pushStatus.innerText = "Upload failed";
                    }
                );
        } else {
            pushStatus.innerText = "No file picked";
        }
    });

}
