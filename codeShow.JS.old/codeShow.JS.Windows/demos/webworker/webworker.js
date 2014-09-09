(function () {
    "use strict";
    var log = Ocho.Logging.log;
    
    WinJS.UI.Pages.define("/demos/webworker/webworker.html", {
        ready: function (element, options) {
            //first we create a web worker and define the js file that defines it
            var worker = new Worker("/demos/webworker/task.js");

            //this is how the web worker talks to us (the main thread)
            worker.onmessage = function(e) {
                log("The worker said " + e.data);
            };

            //and this is how we talk to the web worker
            worker.postMessage("Hey there, worker.");
        }
    });
    
})();
