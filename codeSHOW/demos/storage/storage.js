(function () {
    "use strict";

    var app = WinJS.Application;
    
    WinJS.UI.Pages.define("/demos/storage/storage.html", {
        ready: function (element, options) {
            var appData = Windows.Storage.ApplicationData.current;


            //application state
            var appStateInput = q(".storage #appState input");
            app.sessionState.storagedemo && (appStateInput.value = app.sessionState.storagedemo); //restore value
            appStateInput.onblur = function(e) { //setup up text box value to be saved on blur
                app.sessionState.storagedemo = appStateInput.value;
            };



            //user settings

            //restore local settings
            var inputLocal = q(".storage #userSettings input:nth-of-type(1)");
            appData.localSettings.values.hasKey("storagedemo") && (inputLocal.value = appData.localSettings.values["storagedemo"]);
            
            //save local settings on blur
            inputLocal.onblur = function(e) { appData.localSettings.values["storagedemo"] = inputLocal.value; };

            //restore roaming settings
            var inputRoaming = q(".storage #userSettings input:nth-of-type(2)");
            appData.roamingSettings.values.hasKey("storagedemo") && (inputRoaming.value = appData.roamingSettings.values["storagedemo"]); //restore value
            
            //save roaming settings on blur
            inputRoaming.onblur = function(e) { appData.roamingSettings.values["storagedemo"] = inputRoaming.value; };



            //application data

            //restore temp file contents
            appData.temporaryFolder.getFileAsync("storagedemo.txt")
                .then(function (file) { return Windows.Storage.FileIO.readTextAsync(file); })
                .then(function (contents) { q(".storage #appData input:nth-of-type(1)").value = contents; });

            q(".storage #appData button:nth-of-type(1)").onclick = function (e) {
                appData.temporaryFolder.createFileAsync("storagedemo.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
                    .then(function (file) { Windows.Storage.FileIO.writeTextAsync(file, q(".storage #appData input:nth-of-type(1)").value); });
            };

            //restore local file contents
            appData.localFolder.getFileAsync("storagedemo.txt")
                .then(function (file) { Windows.Storage.FileIO.readTextAsync(file); })
                .then(function (contents) { q(".storage #appData input:nth-of-type(2)").value = contents; });

            //save to local file
            q(".storage #appData button:nth-of-type(2)").onclick = function (e) {
                appData.localFolder.createFileAsync("storagedemo.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
                    .then(function (file) { Windows.Storage.FileIO.writeTextAsync(file, q(".storage #appData input:nth-of-type(2)").value); });
            };

            //restore roaming file contents
            appData.roamingFolder.getFileAsync("storagedemo.txt")
                .then(function (file) { return Windows.Storage.FileIO.readTextAsync(file); })
                .then(function (contents) { q(".storage #appData input:nth-of-type(3)").value = contents; });
            
            //save to roaming file
            q(".storage #appData button:nth-of-type(3)").onclick = function (e) {
                appData.roamingFolder.createFileAsync("storagedemo.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
                    .then(function (file) { Windows.Storage.FileIO.writeTextAsync(file, q(".storage #appData input:nth-of-type(3)").value); });
            };



            //user data
            var userData = q(".storage #userData");
            q("button", userData).onclick = function (e) {
                var savePicker = new Windows.Storage.Pickers.FileSavePicker();
                savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
                savePicker.fileTypeChoices.insert("Plain Text", [".txt"]);
                savePicker.suggestedFileName = "New Document";

                savePicker.pickSaveFileAsync().then(function (file) {
                    if (file) {
                        // Prevent updates to the remote version of the file until we finish making changes and call CompleteUpdatesAsync.
                        Windows.Storage.CachedFileManager.deferUpdates(file);
                        // write to file
                        Windows.Storage.FileIO.writeTextAsync(file, q("input", userData).value).done(function () {
                            // Let Windows know that we're finished changing the file so the other app can update the remote version of the file.
                            Windows.Storage.CachedFileManager.completeUpdatesAsync(file).done(function (updateStatus) {
                                if (updateStatus === Windows.Storage.Provider.FileUpdateStatus.complete) {
                                    q("div.result", userData).innerText = "File " + file.name + " was saved.";
                                } else {
                                    q("div.result", userData).innerText = "File " + file.name + " couldn't be saved.";
                                }
                            });
                        });
                    } else {
                        q("div.result", userData).innerText = "Operation cancelled.";
                    }
                });
            };
            
            var inputAzure = q(".storage #azureMobile input");
            var storagedemo;
            app.client.getTable("appSupport").read()
                .then(
                    function(table) { storagedemo = table.filter(function(r) { return r.key === "storagedemo"; })[0]; },
                    function() { storagedemo = { value: "" }; }
                )
                .then(
                    function () { inputAzure.value = storagedemo.value; }
                );
            q(".storage #azureMobile button").onclick = function(e) {
                storagedemo.value = inputAzure.value;
                app.client.getTable("appSupport").update(storagedemo);
            };


        },

        unload: function () {

        }
    });
    
    function save() {
        //restore user data
        
    }
    
})();
