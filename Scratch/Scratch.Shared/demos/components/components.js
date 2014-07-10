(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/components/components.html", {
        ready: function (element, options) {
            var that = this;
            element.querySelectorAll(".input").toArray().forEach(function(input) {
                input.onchange = function (e) { that.doTheMath(); };
            })

        },
        doTheMath: function () {
            //C++
            var cppcalc = new CalculatorCPP.Calculator();
            cpp.querySelector(".y").value = cppcalc.add(cpp.querySelector(".a").value, cpp.querySelector(".b").value);

            //C#
            var cscalc = new CalculatorCS.Calculator();
            cs.querySelector(".y").value = cscalc.add(cs.querySelector(".a").value, cs.querySelector(".b").value);
        }
    });
})();
