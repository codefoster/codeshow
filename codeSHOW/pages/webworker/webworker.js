(function () {
    "use strict";
    var log = Ocho.Logging.log;
    
    WinJS.UI.Pages.define("/pages/webworker/webworker.html", {
        ready: function (element, options) {
            var worker = new Worker("/pages/webworker/task.js");
            worker.onmessage = function(e) {
                log("The worker said " + e.data);
            };
            worker.postMessage("Hey there, worker.");
        }
    });
    
})();
