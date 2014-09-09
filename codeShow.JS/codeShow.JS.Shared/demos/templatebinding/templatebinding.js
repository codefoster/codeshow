(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/templatebinding/templatebinding.html", {
        ready: function (element, options) {
            var fred = { firstName: "Fred", lastName: "Johnson", email: "fred@live.com" };
            var personTemplateCtl = personTemplate.winControl;
            personTemplateCtl.render(fred, renderHere);
        }
    });
})();
