(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/eventHandlers/eventHandlers.html", {
        ready: function (element, options) {
            var log = Ocho.Logging.log;
            
            document.getElementById("setOnclickBtn").onclick = function (e) {
                document.getElementById("theButton").onclick = sayHi;
            };

            document.getElementById("removeOnclickBtn").onclick = function (e) {
                document.getElementById("theButton").onclick = null;
            };
            
            document.getElementById("addEventListenerBtn").onclick = function (e) {
                document.getElementById("theButton").addEventListener("click", sayHi);
            };

            document.getElementById("removeEventListenerBtn").onclick = function (e) {
                document.getElementById("theButton").removeEventListener("click", sayHi);
            };

            document.getElementById("addAnonEventListenerBtn").onclick = function (e) {
                document.getElementById("theButton").addEventListener("click", function () { log("hi"); });
            };

            document.getElementById("clearLogBtn").onclick = function(e) {
                document.getElementById("log").innerText = "";
            };
            function sayHi() { log("hi"); }
        }
    });
})();
