(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/binding/binding.html", {
        ready: function (element, options) {

            var fred = { firstName: "Fred", lastName: "Johnson", email: "fred@live.com" };

            // simpleBinding
            WinJS.Binding.processAll(q("#simpleBinding .person", element), fred);

            //template            
            var personTemplateCtl = q("#personTemplate").winControl;
            personTemplateCtl.render(fred, q("#renderHere"));

            //converter
            WinJS.Namespace.define("Demos.binding.Converters", {
                isAdultConverter: new WinJS.Binding.converter(function(value) {
                    return (value ? "Adult" : "Child");
                })
            });
            var yakko = { firstName: "Yakko", lastName: "Warner", email: "yakko@live.com", isAdult: false };
            WinJS.Binding.processAll(q("#converter .person", element), yakko);

            //TODO: dynamic binding using as

            //TODO: add two-way data binding
        }
    });
})();
