(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/baseconv/baseconv.html", {
        ready: function (element, options) {
            baseconvbtn.addEventListener("click", function () {
                var basefrom = parseInt(fromBase.value);
                var baseto = parseInt(toBase.value);

                if (basefrom > 1 && basefrom < 37 && baseto > 1 && baseto < 37) {
                    resultNumber.value = parseInt(inputNumber.value, basefrom).toString(baseto);
                }
                else {
                    Ocho.Popups.alert("Base numbers must be from 2 to 36 inclusive");
                }
            });
        }
    });
})();