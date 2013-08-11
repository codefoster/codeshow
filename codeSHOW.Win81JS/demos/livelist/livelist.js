(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/livelist/livelist.html", {
        init: function(element, options) {
            WinJS.Namespace.define("codeShow.Demos.listview",{
                data: new WinJS.Binding.List()
            });

        },
        ready: function (element, options) {

            for (var i = 0; i < 10; i++) {
                codeShow.Demos.listview.data.push(WinJS.Binding.as({ value: 0 }));
            };

            updateNumbers();

            function updateNumbers() {
                codeShow.Demos.listview.data.forEach(function (value, index, array) {
                    value.value = Math.floor(Math.random() * 10);
                });
                setTimeout(updateNumbers, 1000);
            }
        }
    });
})();
