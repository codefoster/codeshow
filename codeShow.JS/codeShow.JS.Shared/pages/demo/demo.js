(function () {
    "use strict";

    var demo;

    WinJS.UI.Pages.define("/pages/demo/demo.html", {
        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },
        ready: function (element, options) {
            demo = options.demo;
            element.querySelector("header .pagetitle").innerText = demo.title;
            var demoContent = element.querySelector(".democontent").winControl.contentElement;
            WinJS.UI.Pages.render(Ocho.Utilities.format("/demos/{0}/{0}.html", demo.name), demoContent)

            if (!WinJS.Utilities.isPhone) {
                //TODO: this should eventually work for Windows and phone, but just do Windows for now
                loadCodeFiles(demo, element);

                element.querySelector("#cmdPin").onclick = this.setupSecondaryTile;
            }

        },
        setupSecondaryTile: function () {
            var tile = new Windows.UI.StartScreen.SecondaryTile(
                "SecondaryTile.Demo." + demo.name,
                demo.title,
                "{\"launchDemo\":\"" + demo.name + "\"}",
                new Windows.Foundation.Uri("ms-appx:///images/secondary150.png"),
                Windows.UI.StartScreen.TileSize.Square150x150
            );

            tile.visualElements.square70x70Logo = new Windows.Foundation.Uri("ms-appx:///Images/secondary70.png");
            tile.visualElements.showNameOnSquare150x150Logo = true;

            tile.requestCreateAsync().done(function (isCreated) {
                if (isCreated) {
                    WinJS.log && WinJS.log("Secondary tile was successfully pinned.", "sample", "status");
                }
            });
        }
    });
})();

//TODO: try refactoring this method to make it more terse and possibly more performant
function loadCodeFiles(demo, element) {
    Windows.ApplicationModel.Package.current.installedLocation.getFolderAsync("demos")
        .then(function (demosFolder) { return demosFolder.getFolderAsync(demo.name); })
        .then(function (demoFolder) { return demoFolder.getFilesAsync(); })
        .then(function (files) {
            var types = [".html", ".css", ".js"];

            //fetch the file contents and add to the file array as promises
            files = Array.prototype.slice.call(files)
                .filter(function (file) { return types.contains(file.fileType); })
                .sort(function (fileA, fileB) {
                    return types.indexOf(fileA.fileType) - types.indexOf(fileB.fileType);
                })
                .map(function (file) {
                    return { file: file, contentPromise: Windows.Storage.FileIO.readTextAsync(file) };
                });

            //join the promises and render results
            WinJS.Promise.join(files.map(function (f) { return f.contentPromise; })).then(function () {
                files.forEach(function (file) {
                    file.contentPromise.then(function (fileContents) {
                        var hubSection = new WinJS.UI.HubSection(document.createElement("div"), { isHeaderStatic: true, header: file.file.name });
                        hubSection.element.classList.add("section");
                        hubSection.element.classList.add("file");
                        var textArea = document.createElement("textarea");
                        textArea.textContent = fileContents;
                        hubSection.contentElement.appendChild(textArea);
                        if (element.querySelector(".sections"))
                            element.querySelector(".sections").winControl.sections.push(hubSection);
                    });
                });
            });
        });
}
