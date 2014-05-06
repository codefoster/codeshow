(function () {
    "use strict";

    var demo, demoview, codeview, element, options;

    WinJS.UI.Pages.define("/pages/demo/demo.html", {
        ready: function (e, o) {
            element = e;
            options = o;
            var that = this;

            //passed in the complete form with a view
            if (options.demo) demo = options.demo;

            //passed in just the demo
            else if (options.name && options.sections) demo = { demo: options, viewMode: "demo" };

            //default to demo view mode
            options.viewMode = options.viewMode || "demo";
            if (!options.selectedSection && demo.sections.length)
                options.selectedSection = demo.sections[0].name;

            Analytics.Increment(format("demo launched ({0})",demo.name));

            //set the page title
            document.querySelector("header .pagetitle").innerText = demo.title;

            //load the demo view
            demoview = document.querySelector(".demo .demoview");
            demoview.classList.add(demo.name);
            this.loadDemoView();

            //load the code view
            codeview = document.querySelector(".demo .codeview");
            this.loadCodeView();

            //render view mode right away
            this.renderViewMode();

            element.querySelector(".viewtoggle").onclick = function () {
                //swith view modes and render again
                that.toggleViewMode();
                that.renderViewMode();
            };

            //setup the appbar
            element.querySelector("#cmdPin").onclick = this.setupSecondaryTile;

            //suppress the appbar if configured for this demo
            //the app bar can be supress so that a developer can create his own for demo purposes
            if (demo.suppressAppBar) element.querySelector("#demoappbar").winControl.disabled = true;

            //hide the extended splash screen
            splash.classList.add("hidden");

        },
        toggleViewMode: function () {
            if (options.viewMode == "demo") options.viewMode = "code";
            else options.viewMode = "demo";
        },
        renderViewMode: function () {
            if (options.viewMode == "demo") {
                codeview.style.display = "none";
                demoview.style.display = "flex";
            }
            else if (options.viewMode == "code") {
                codeview.style.display = "block";
                demoview.style.display = "none";
            }

            var viewtoggle = element.querySelector(".viewtoggle");
            if (options.viewMode == "demo") viewtoggle.innerText = "see the code";
            else viewtoggle.innerText = "see the demo";
        },
        loadDemoView: function () {
            //demo without sections
            if (!demo.sections || demo.sections.length == 0) {
                //render the demo page into the demoview div
                demoview.classList.add("padleft");
                return WinJS.UI.Pages.render(format("/demos/{0}/{0}.html", demo.name), demoview)
                    .then(function (page) {
                        //remove the section header since the demo page has one already
                        var header = page.element.querySelector("header");
                        if (header) header.style.display = "none";
                    });
            }

                //demo with sections
            else {
                var divSection, sectionHeader, sectionBody;
                demoview.classList.add("swipeContainer");
                return WinJS.Promise.join(demo.sections

                    //sort the sections by their sort order
                    .sort(function (a, b) {
                        return a.order - b.order;
                    })

                    //and render them
                    .map(function (section) {
                        divSection = document.createElement("div");
                        divSection.classList.add(section.name);
                        divSection.classList.add("demosection");
                        divSection.classList.add("swipeSection");
                        divSection.classList.add("padleft");

                        //section header
                        sectionHeader = document.createElement("h2");
                        sectionHeader.innerText = section.title;
                        divSection.appendChild(sectionHeader);

                        //section body
                        sectionBody = document.createElement("div");
                        divSection.appendChild(sectionBody);
                        demoview.appendChild(divSection);

                        return WinJS.UI.Pages.render(format("/demos/{0}/{1}/{1}.html", demo.name, section.name), sectionBody)
                            .then(function (page) {
                                //remove the section header since the demo page has one already
                                var header = page.element.querySelector("header");
                                if (header) header.style.display = "none";
                            }, function (err) { debugger; });
                    }));
            }

        },
        loadCodeView: function () {
            var that = this;
            var getDemoFolderAsync = Windows.ApplicationModel.Package.current.installedLocation.getFolderAsync("demos")
                .then(function (demosFolder) { return demosFolder.getFolderAsync(demo.name); });

            //demo without sections
            element.querySelector("#codeViewNoSections").style.display = "block";
            element.querySelector("#codeViewWithSections").style.display = "none";
            if (!demo.sections || demo.sections.length == 0) {
                getDemoFolderAsync
                    .then(function (demoFolder) { return demoFolder.getFilesAsync(); })
                    .then(function (files) {
                        files = Array.prototype.slice.call(files)
                            .filter(function (file) { return [".html", ".css", ".js"].contains(file.fileType); })
                            .sort(function (fileA, fileB) { return fileTypeSortOrder(fileA.fileType) - fileTypeSortOrder(fileB.fileType); });
                        that.renderCode(files, element.querySelector("#codeViewNoSections .codearea"));
                    });
            }
            //demo with sections
            else {
                element.querySelector("#codeViewNoSections").style.display = "none";
                element.querySelector("#codeViewWithSections").style.display = "block";

                var sectionMenu = element.querySelector("#codeViewWithSections .sectionmenu");
                var codeArea = element.querySelector("#codeViewWithSections .codearea");

                getDemoFolderAsync
                    .then(function (demoFolder) {
                        demo.sections
                            .forEach(function (section) {
                                var i = document.createElement("li");
                                i.classList.add("win-type-x-large");
                                i.innerText = section.title;
                                i.attributes["data-section"] = section.name;
                                i.onclick = function (e) {
                                    //format the menu items
                                    var menuItems = Array.prototype.slice.call(sectionMenu.querySelectorAll("li"));
                                    menuItems.forEach(function (i) {
                                        var active = e.currentTarget.attributes["data-section"] == i.attributes["data-section"];
                                        i.style.fontWeight = ( active ? "bold" : "200");
                                        i.style.cursor = (active ? "" : "pointer");
                                    });

                                    //format the visible code
                                    var sections = Array.prototype.slice.call(codeArea.querySelectorAll(".sectioncode"));
                                    sections.forEach(function (section) {
                                        section.style.display = (e.currentTarget.attributes["data-section"] == section.attributes["data-section"] ? "flex" : "none");
                                    });
                                };
                                sectionMenu.appendChild(i);

                                //wire up the menu to switch sections

                                var divCode = document.createElement("div");
                                divCode.classList.add("sectioncode");
                                divCode.classList.add("swipeContainer");
                                divCode.attributes["data-section"] = section.name;
                                divCode.style.display = (options.selectedSection == section.name ? "flex" : "none");
                                
                                demoFolder.getFolderAsync(section.name)
                                    .then(function (sectionFolder) { return sectionFolder.getFilesAsync() })
                                    .then(function (files) {
                                        files = Array.prototype.slice.call(files)
                                            .filter(function (file) { return [".html", ".css", ".js"].contains(file.fileType); })
                                            .sort(function (fileA, fileB) { return fileTypeSortOrder(fileA.fileType) - fileTypeSortOrder(fileB.fileType); });
                                        that.renderCode(files, divCode);
                                        codeArea.appendChild(divCode);
                                    });
                            });

                        return demoFolder.getFoldersAsync();
                    })
            }

            function fileTypeSortOrder(type) {
                switch (type) {
                    case ".html": return 1;
                    case ".css": return 2;
                    case ".js": return 3;
                    default: return 100;
                }
            }

        },
        renderCode: function (files, renderElement) {
            files.forEach(function (file) {
                //for each, create a div
                var divSection = document.createElement("div");
                divSection.classList.add("swipeSection");
                divSection.classList.add("padleft");
                divSection.style.height = "100%";
                divSection.id = file.displayName;

                var h2 = document.createElement("h2");
                h2.innerText = file.name;
                divSection.appendChild(h2);

                var textArea = document.createElement("textarea");
                divSection.appendChild(textArea);
                
                
                Windows.Storage.FileIO.readTextAsync(file)
                    .then(function (fileContents) {
                        textArea.textContent = fileContents;
                    });

                renderElement.appendChild(divSection);

            });
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
