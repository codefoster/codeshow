(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/code/code.html", {
        ready: function (element, options) {
            WinJS.xhr({ url: "/js/ocho.js" })
                .then(
                    function(xhr) {
                        //TODO: add a "working" spinner
                        var result = xhr.responseText;
                        q("#codeViewer").innerText = result;
                    }
                );
        }
    });
})();
