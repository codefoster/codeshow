(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/demo/demo.html", {
        ready: function (element, demo) {
            document.querySelector("header .pagetitle").innerText = demo.title;
            if (!demo.sections || demo.sections.length == 0) {
                document.querySelector("header").style.display = "none"; //hide the header (demo page should have its own)
                WinJS.UI.Pages.render(format("/demos/{0}/{0}.html", demo.name), document.querySelector("div.demo"));
            } else {
                var mainSection = document.querySelector("section[role=main]"), divSection, sectionHeader, sectionBody;
                mainSection.classList.add("demosections");
                demo.sections.forEach(function (section) {
                    divSection = document.createElement("div");
                    divSection.classList.add(section.name);
                    divSection.classList.add("demosection");

                    //section header
                    sectionHeader = document.createElement("h2");
                    sectionHeader.innerText = section.title;
                    divSection.appendChild(sectionHeader);

                    //section body
                    sectionBody = document.createElement("div");
                    WinJS.UI.Pages.render(format("/demos/{0}/{1}/{1}.html", demo.name, section.name), sectionBody);
                    divSection.appendChild(sectionBody);

                    mainSection.appendChild(divSection);
                });
            }
        }
    });
})();
