(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/demo/demo.html", {
        ready: function (element, options) {
            var demo = options.demo;
            options.view = options.view || "demo";

            document.querySelector("header .pagetitle").innerText = demo.title;

            //demo view
            if (options.view == "demo") {
                var demoview = document.querySelector(".demo .demoview");

                //single demo view
                if (!demo.sections || demo.sections.length == 0) {
                    //hide the header (demo page should have its own)
                    //document.querySelector("header").style.display = "none";

                    WinJS.UI.Pages.render(format("/demos/{0}/{0}.html", demo.name), demoview)
                        .then(function (page) {
                            page.element.querySelector("section[role=main]").classList.add("padleft");

                            //remove the section header since the demo page has one already
                            var header = page.element.querySelector("header");
                            if (header) header.style.display = "none";
                        });
                }

                //sections view
                else {
                    var divSection, sectionHeader, sectionBody;
                    demo.sections

                        //sort the sections by their sort order
                        .sort(function (a, b) {
                            return a.order - b.order;
                        })

                        //and render them
                        .forEach(function (section) {
                            divSection = document.createElement("div");
                            divSection.classList.add(section.name);
                            divSection.classList.add("demosection");
                            divSection.classList.add("padleft");

                            //section header
                            sectionHeader = document.createElement("h2");
                            sectionHeader.innerText = section.title;
                            divSection.appendChild(sectionHeader);

                            //section body
                            sectionBody = document.createElement("div");
                            WinJS.UI.Pages.render(format("/demos/{0}/{1}/{1}.html", demo.name, section.name), sectionBody)
                                .then(function (page) {
                                    //remove the section header since the demo page has one already
                                    var header = page.element.querySelector("header");
                                    if (header) header.style.display = "none";
                                });
                            divSection.appendChild(sectionBody);

                            demoview.appendChild(divSection);
                        });
                }
            }

            //code view
            else if (options.view == "code") {
                var codeview = document.querySelector(".codeview");
                codeview.style.display = "block";
            }


            //hide the extended splash screen
            splash.classList.add("hidden");

        }
    });
})();
