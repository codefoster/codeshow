(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/binding/template/template.html", {
        ready: function (element, options) {
            var fred = { firstName: "Fred", lastName: "Johnson", email: "fred@live.com" };
            var personTemplateCtl = personTemplate.winControl;
            personTemplateCtl.render(fred, renderHere);
        }
    });
})();
