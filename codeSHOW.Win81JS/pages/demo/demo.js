(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/demo/demo.html", {
        ready: function (element, demo) {
            if (demo.sections.length == 0)
                WinJS.UI.Pages.render(format("/demos/{0}/{0}.html", demo.name), document.querySelector("div.demo"));
            else {
                var divSections = document.createElement("div");
                divSections.style.display = "flex";
                //var sectionFlipView = new WinJS.UI.FlipView(divSections);
                //sectionsFlipView.winControl.dataSource
                var divSection;
                demo.sections.forEach(function (section) {
                    divSection = document.createElement("div");
                    WinJS.UI.Pages.render(format("/demos/{0}/{1}/{1}.html", demo.name, section.name), divSection);
                    divSections.appendChild(divSection);
                });
                document.querySelector("div.demo").appendChild(divSections);
            }
        },

        unload: function () {
        },

        updateLayout: function (element) {
        }
    });
})();
