(function () {
    "use strict";

    var isPrintTaskRequestedHandled = false;
    var printManager = Windows.Graphics.Printing.PrintManager;
    var pageElement = null;

    WinJS.UI.Pages.define("/demos/printFromApp/printFromApp.html", {
        ready: function (element, options) {
            pageElement = element;
            pageElement.querySelector("#invokePrint").onclick = invokePrint;
            updatePrintDisplay() 
        }
    });


    function updatePrintDisplay() {
        pageElement.querySelector("#printStatus").innerText = isPrintTaskRequestedHandled ? "Print task registered with completion task" : "No print task registered for completion event";
    }


    function invokePrint() {
        var printer = printManager.getForCurrentView();
        printer.onprinttaskrequested = printFrag;
        isPrintTaskRequestedHandled = true;
        updatePrintDisplay();
        printManager.showPrintUIAsync();
    }

    function printFrag(printEvent) {
        var printTask = printEvent.request.createPrintTask("codeShow Print Frag", function (args) {
            var frag = document.createDocumentFragment();
            frag.appendChild(pageElement.querySelector("#printFromApp").cloneNode(true));
            args.setSource(MSApp.getHtmlPrintDocumentSource(frag));
            // Register the handler for print task completion event
            printTask.oncompleted = printTaskCompleted;
        });
    }

    function printTaskCompleted(printEvent) {
        // Notify the user about the failure
        if (printEvent.completion === Windows.Graphics.Printing.PrintTaskCompletion.failed) {
            WinJS.log && WinJS.log("Failed to print.", "sample", "error");
        }
    }
})();
