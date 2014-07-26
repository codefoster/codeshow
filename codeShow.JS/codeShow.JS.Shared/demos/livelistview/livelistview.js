(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/livelistview/livelistview.html", {
        init: function(element, options) {
            WinJS.Namespace.define("codeShow.Demos.livelistview",{
                data: new WinJS.Binding.List()
            });

        },
        ready: function (element, options) {
            const ITEM_COUNT = 10;
            const FREQUENCY = 2; //Hz

            for (var i = 0; i < ITEM_COUNT; i++) {
                codeShow.Demos.livelistview.data.push(WinJS.Binding.as({ value: 0 }));
            };

            updateNumbers();

            function updateNumbers() {
                codeShow.Demos.livelistview.data.forEach(function (value, index, array) {
                    value.value = Math.floor(Math.random() * 10);
                });
                setTimeout(updateNumbers, 1/FREQUENCY * 1000);
            }
        }
    });
})();
