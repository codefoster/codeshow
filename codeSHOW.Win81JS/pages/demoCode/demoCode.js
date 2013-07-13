(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/demoCode/demoCode.html", {
        ready: function (element, options) {
            //TODO: add ability to copy code (ideally to highlight text and copy)
            
            //fetch code files in this folder
            var main = q("section[role=main]", element);
            var demo = options;
            q(".pagetitle", element).innerText = demo.name;

            Windows.ApplicationModel.Package.current.installedLocation.getFolderAsync("demos")
                .then(function(demosFolder) { return demosFolder.getFolderAsync(demo.key); })
                .then(function(folder) { return folder.getFilesAsync(); })
                .then(function(files) {
                    files = Array.prototype.slice.call(files);
                    files
                        .filter(function(file) { return [".html", ".css", ".js"].contains(file.fileType); })
                        .sort(function(fileA, fileB) { return fileTypeSortOrder(fileA.fileType) - fileTypeSortOrder(fileB.fileType); })
                        .forEach(function(file) {
                            //for each, create a div
                            var divSection = document.createElement("div");
                            divSection.id = file.displayName;

                            var h2 = document.createElement("h2");
                            h2.innerText = file.name;
                            divSection.appendChild(h2);

                            var divCode = document.createElement("div");
                            divCode.id = "divCode";
                            divCode.style.overflowY = "auto";
                            divCode.style.paddingRight = "20px";
                            divCode.style.height = "calc(100% - 70px)";
                            divCode.style.boxSizing = "border-box";
                            new WinJS.UI.Pages.render(
                                "/pages/codeViewer/codeViewer.html",
                                divCode,
                                { codePath: format("/demos/{0}/{1}", demo.key, file.name) }
                            );
                            divSection.appendChild(divCode);
                            main.appendChild(divSection);

                        });
                });
        }
    });

    function fileTypeSortOrder(type) {
        switch(type){
            case ".html": return 1;
            case ".css": return 2;
            case ".js": return 3;
            default: return 100;
        }
    }
    
})();
