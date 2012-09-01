(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/template/template.html", {
        ready: function (element, options) {
            WinJS.Binding.processAll(q("body"), options);
            
            var fred = { firstName: "Fred", lastName: "Johnson", email: "fred@live.com" };
            var personTemplateCtl = document.querySelector("#personTemplate").winControl;
            personTemplateCtl.render(fred, document.querySelector("#renderHere"));

        }
    });
})();
