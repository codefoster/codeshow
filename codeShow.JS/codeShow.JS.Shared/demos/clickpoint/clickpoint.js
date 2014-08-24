(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/clickpoint/clickpoint.html", {
        ready: function (element, options) {
            var d1 = element.querySelector("#parent > div:nth-of-type(1)");
            var d2 = element.querySelector("#parent > div:nth-of-type(2)");

            d1.onclick = function (e) {
                d1.innerHTML += "click<br/>";
            };

            d2.addEventListener("MSPointerUp", function (e) {
                switch (e.pointerType) {
                    case "touch": d2.innerHTML += "touch<br/>"; break;
                    case "pen": d2.innerHTML += "pen<br/>"; break;
                    case "mouse": d2.innerHTML += "mouse<br/>"; break;
                }
            });
        }
    });
})();
