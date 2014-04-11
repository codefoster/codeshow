(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/components/components.html", {
        ready: function (element, options) {
            var that = this;
            q(".input",element).forEach(function(input) {
                input.onchange = function (e) { that.doTheMath(); };
            })

        },
        doTheMath: function () {
            //C++
            var cppcalc = new CalculatorCPP.Calculator();
            q("#cpp .y").value = cppcalc.add(q("#cpp .a").value, q("#cpp .b").value);

            //C#
            var cscalc = new CalculatorCS.Calculator();
            q("#cs .y").value = cscalc.add(q("#cs .a").value, q("#cs .b").value);
        }
    });
})();
