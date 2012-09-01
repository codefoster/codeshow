(function () {
    "use strict";

    var log = Ocho.Logging.log;
    
    WinJS.UI.Pages.define("/pages/eventHandlers/eventHandlers.html", {
        ready: function (element, options) {
            //method 1
            document.getElementById("btn1").onclick = function (args) {
                WinJS.Navigation.navigate('/pages/context/context.html');
                log("Hello World (using onclick)");
            };

            //method 2
            document.getElementById("btn2").addEventListener("click", function(args) {
                log("Hello World (using addEventListener)");
            });
        }
    });
})();
