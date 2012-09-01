(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/context/context.html", {
        ready: function (element, options) {
            //render the contents of the helloworld.html file to the div with the ID of helloworldDiv
            WinJS.UI.Fragments.render("/pages/context/helloworld.html", q("#fragdiv"));
        }
    });
})();
