(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/convertbase/baseconv/baseconv.html", {
        ready: function (element, options) {
            q("#baseconvbtn").addEventListener("click", function () {
                var basefrom = parseInt(q("#fromBase").value);
                var baseto = parseInt(q("#toBase").value);

                if (basefrom > 1 && basefrom < 37 && baseto > 1 && baseto < 37) {
                    var inputNumber = parseInt(q("#inputNumber").value, basefrom);
                    q("#resultNumber").value = inputNumber.toString(baseto);
                }
                else {
                    Ocho.Popups.alert("Base numbers must be from 2 to 36 inclusive");
                }
            });
        }
    });
})();