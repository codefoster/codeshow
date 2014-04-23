(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/launcher/launcher.html", {

        ready: function (element, options) {
            q("#launchUri .LaunchButton").onclick = function () {
                Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri("ms-windows-store:PDP?PFN=53975UbaidAzad.i-Note_p8mzr1axm0p2j")).done(
                    null, //oncomplete
                    function () {
                        Ocho.Popups.alert("Failed");
                    }
                );
            };

            q("#launchFilePicker .LaunchButton").onclick = function () {
                var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
                openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
                openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
                openPicker.fileTypeFilter.replaceAll([".png", ".jpg", ".jpeg", ".bmp"]);

                openPicker.pickSingleFileAsync().then(function (file) {
                    if (file) {
                        Windows.System.Launcher.launchFileAsync(file);
                        Windows.Storage.AccessCache.StorageApplicationPermissions.futureAccessList.add(file);
                        lv.itemDataSource.insertAtEnd(lv.itemDataSource.list.length, { file: file, filePath: file.path });
                    }
                });
            };

            var accessList = Windows.Storage.AccessCache.StorageApplicationPermissions.futureAccessList.entries;

            var lv = futureAccessList.winControl;
            lv.itemTemplate = FALTemplate;
            lv.itemDataSource = new WinJS.Binding.List([]).dataSource;

            for (var i = 0; i < accessList.length; i++) {
                var token = accessList.getAt(i).token;
                Windows.Storage.AccessCache.StorageApplicationPermissions.futureAccessList.getFileAsync(token).done(
                    function (file) {
                        lv.itemDataSource.insertAtEnd(i, { file: file, filePath: file.path });
                    }
                );
            }


            lv.oniteminvoked = function (e) {
                Windows.System.Launcher.launchFileAsync(lv.itemDataSource.list.getAt(e.detail.itemIndex).file).done(
                    null, //oncomplete
                    function () {
                        Ocho.Popups.alert("Failed");
                    }
                );
            };
        }
    });
})();