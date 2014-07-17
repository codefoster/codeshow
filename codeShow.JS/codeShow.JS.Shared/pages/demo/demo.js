(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/demo/demo.html", {
        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },
        ready: function (element, options) {
            element.querySelector("header .pagetitle").innerText = options.demo.data.title;
            var demoContent = element.querySelector(".section.demo").winControl.contentElement;
            WinJS.UI.Pages.render(Ocho.Utilities.format("/demos/{0}/{0}.html", options.demo.data.name), demoContent)
            loadCodeFiles(options.demo.data, element);
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
                        element.querySelector(".sections").winControl.sections.push(hubSection);
                    });
                });
            });
        });
}
