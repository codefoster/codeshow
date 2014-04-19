(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/onedrive/pushfile/pushfile.html", {
        ready: function (element, options) {
            WL.init();

            // 'wl.skydrive' gives access to OneDrive but not write permissions
            // so 'wl.skydrive_update' has been used
            WL.login({ scope: "wl.skydrive_update" });

            q("#pushfilebtn").addEventListener("click", pushFile);
        }
    });
})();

function pushFile() {

    if (!WL.getSession()) {
        q("#pushStatus").innerText = "Not logged in";
        return;
    }

    var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
    openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
    openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
    openPicker.fileTypeFilter.replaceAll([".png", ".jpg", ".jpeg"]);

    openPicker.pickSingleFileAsync().then(function (file) {
        if (file) {
            q("#pushStatus").innerText = "Uploading...";

            WL.backgroundUpload({
                path: "me/skydrive",
                file_name: file.name,
                file_input: file,
                overwrite: "rename"
            }).then(
                    function (response) {
                        q("#pushStatus").innerText = "Uploaded";
                    },
                    function (response_error) {
                        q("#pushStatus").innerText = "Upload failed";
                    }
                );
        } else {
            q("#pushStatus").innerText = "No file picked";
        }
    });

    WL.api({
        path: "me/skydrive/files?filter=folders,albums",
        method: "GET"
    }).then(
        function (response) {
            response.data.forEach(function (directory) {
                var l = document.createElement("li");
                l.innerText = directory.name;
                q("#folderList").appendChild(l);
            });

            q("#folderStatus").innerText = "Retrieved " + response.data.length + " folders+albums";
        },
        function (response_error) {
            q("#folderStatus").innerText = "Something went wrong!";
        }
    );

}
