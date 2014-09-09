(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/userdata/userdata.html", {
        ready: function (element, options) {
            var userData = element.querySelector("section[role=main]");
            userData.querySelector("button").onclick = function (e) {
                var savePicker = new Windows.Storage.Pickers.FileSavePicker();
                savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
                savePicker.fileTypeChoices.insert("Plain Text", [".txt"]);
                savePicker.suggestedFileName = "New Document";

                savePicker.pickSaveFileAsync().then(function (file) {
                    if (file) {
                        // Prevent updates to the remote version of the file until we finish making changes and call CompleteUpdatesAsync.
                        Windows.Storage.CachedFileManager.deferUpdates(file);
                        // write to file
                        Windows.Storage.FileIO.writeTextAsync(file, userData.querySelector("input").value).done(function () {
                            // Let Windows know that we're finished changing the file so the other app can update the remote version of the file.
                            Windows.Storage.CachedFileManager.completeUpdatesAsync(file).done(function (updateStatus) {
                                if (updateStatus === Windows.Storage.Provider.FileUpdateStatus.complete) {
                                    userData.querySelector("div.result").innerText = "File " + file.name + " was saved.";
                                } else {
                                    userData.querySelector("div.result").innerText = "File " + file.name + " couldn't be saved.";
                                }
                            });
                        });
                    } else {
                        userData.querySelector("div.result").innerText = "Operation cancelled.";
                    }
                });
            };
        }
    });
})();
