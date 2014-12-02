(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/selectors/selectors.html", {
        ready: function (element, options) {
            q(".selectors #render").innerHTML = q(".selectors pre").innerText;
            
            q(".selectors pre").onkeyup = function(e) {
                try {
                    q(".selectors #render").innerHTML = q(".selectors pre").innerText;
                }
                catch(err) {}
            };
            q(".selectors #input").onkeyup = function (e) {
                try {
                    q(".selectors #styleSection").innerText = q(".selectors #input").innerText;
                }
                catch(err) {}
            };

            var input = q(".selectors #input");
            input.onclick = function (e) {
                input.classList.remove('watermark');
                input.innerText = "";
                input.onclick = null;
            };
        }
    });

    var q = Ocho.Utilities.query;
})();
