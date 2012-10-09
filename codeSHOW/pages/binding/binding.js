(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/binding/binding.html", {
        ready: function (element, options) {

            var fred = { firstName: "Fred", lastName: "Johnson", email: "fred@live.com" };

            // simpleBinding
            WinJS.Binding.processAll(q("#person"), fred);

            //TODO: dynamic binding using as

            //template            
            var personTemplateCtl = q("#personTemplate").winControl;
            personTemplateCtl.render(fred, q("#renderHere"));

        }
    });
})();
