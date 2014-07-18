(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/parent/parent.html", {
        ready: function (element, options) {
            var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
            openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
            openPicker.fileTypeFilter.replaceAll([".png", ".jpg", ".jpeg"]);

            element.querySelector(".parent #open").onclick = function (e) {
                openPicker.pickSingleFileAsync().then(function (file) {
                    var result = element.querySelector(".parent #result");
                    if (file) {
                        var img = element.querySelector(".parent #pic");
                        img.src = URL.createObjectURL(file);
                        img.style.display = "block";

                        file.getParentAsync().done(function (parentFolder) {
                            if (parentFolder && parentFolder.name && parentFolder.path)
                                result.innerText = "Parent: " + parentFolder.name + " (" + parentFolder.path + ")";
                            else 
                                result.innerText = "Access not granted to parent folder..."
                        },
                            function (error) {
                                result.innerText = error.message || "error in parent script file";
                        });

                    } else {
                        result.innerText = "No file picked";
                    }
                });
            };
        }
    });

})();
