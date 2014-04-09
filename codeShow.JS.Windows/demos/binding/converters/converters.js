(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/binding/converters/converters.html", {
        ready: function (element, options) {
            WinJS.Namespace.define("codeShow.Demos.binding.simple.Converters", {
                isAdultConverter: new WinJS.Binding.converter(function(value) {
                    return (value ? "Adult" : "Child");
                })
            });
            var yakko = { firstName: "Yakko", lastName: "Warner", email: "yakko@live.com", isAdult: false };
            WinJS.Binding.processAll(element.querySelector(".person"), yakko);
        }
    });
})();
