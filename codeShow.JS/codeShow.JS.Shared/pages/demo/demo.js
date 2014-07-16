///<reference path="//Microsoft.WinJS.2.1/js/base.js"/>
///<reference path="//Microsoft.WinJS.2.1/js/ui.js"/>

(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/demo/demo.html", {
        ready: function (element, options) {
            element.querySelector("header .pagetitle").innerText = options.demo.data.title;

            if (WinJS.Utilities.isPhone) {
                //render pivot items for demo sections
                var sectionsPivot = element.querySelector(".sections").winControl;
                options.demo.data.sections.forEach(function (section) {
                    var pivotItem = new WinJS.UI.PivotItem(document.createElement("div"), { isHeaderStatic: true, header: section.title });
                    pivotItem.element.classList.add(options.demo.data.name);
                    var pivotItemContent = pivotItem.element.querySelector(".win-pivot-item-content");
                    WinJS.UI.Pages.render(Ocho.Utilities.format("/demos/{0}/{1}/{1}.html", options.demo.data.name, section.name), pivotItemContent)
                        .then(function (page) {
                            //remove the section header since the demo page has one already
                            var header = page.element.querySelector("header");
                            if (header) header.style.display = "none";
                        });
                    sectionsPivot.items.push(pivotItem);
                });
            }
            else {
                //render hub sections for demo sections
                var sectionsHub = element.querySelector(".sections").winControl;
                options.demo.data.sections.forEach(function (section) {
                    var hubSection = new WinJS.UI.HubSection(document.createElement("div"), { isHeaderStatic: true, header: section.title });
                    hubSection.element.classList.add(options.demo.data.name);
                    var hubSectionContent = hubSection.element.querySelector(".win-hub-section-content");
                    WinJS.UI.Pages.render(Ocho.Utilities.format("/demos/{0}/{1}/{1}.html", options.demo.data.name, section.name), hubSectionContent)
                        .then(function (page) {
                            //remove the section header since the demo page has one already
                            var header = page.element.querySelector("header");
                            if (header) header.style.display = "none";
                        });
                    sectionsHub.sections.push(hubSection);
                });
            }
        },

        unload: function () {
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

        }
    });
})();
