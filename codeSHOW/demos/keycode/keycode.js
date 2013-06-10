
(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/keycode/keycode.html", {

        ready: function (element, options) {
            var result = q("#fetchcode #result");
            q("#fetchcode #keyField").addEventListener("keydown", function () { this.value = ""; result.innerHTML = "Keydown code: " + window.event.keyCode; });
            q("#fetchcode #keyField").addEventListener("keypress", function () { result.innerHTML += "<br />Keypress code: " + window.event.keyCode; });
            q("#generatecode #genButton").addEventListener("click", function () {
                var genstr = "";
                for (var counter = 0; counter < 10; counter++) {
                    var x = 96 + Math.ceil(Math.random() * 26); //range from 97 to 26 more characters (lowercase letters)
                    var y = 64 + Math.ceil(Math.random() * 26); //range from 65 to 26 more characters (uppercase letters)
                    if (Math.round(Math.random()) == 1) {
                        genstr += String.fromCharCode(x); //add a lowercase letter (randomly chosen)
                    } else {
                        genstr += String.fromCharCode(y); //add an uppercase letter
                    }
                }
                q("#generatecode #result1").innerHTML += genstr + "<br />";
            });
        },

        unload: function () {

        },

        updateLayout: function (element, viewState, lastViewState) {

        }
    });
})();
