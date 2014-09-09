(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/observablebinding/observablebinding.html", {
        ready: function (element, options) {
            //creates a counter object as an observable so that when the value changes the UI will automatically change
            var counter = WinJS.Binding.as({ value: 10 });

            //bind that observable
            WinJS.Binding.processAll(document.getElementById("myElement"), counter);

            element.querySelector("button.go").onclick = function () {
                updateCounter();
            }

            function updateCounter() {
                if (counter.value > 0) counter.value--;
                setTimeout(updateCounter, 1000)
            }
        }
    });
})();
