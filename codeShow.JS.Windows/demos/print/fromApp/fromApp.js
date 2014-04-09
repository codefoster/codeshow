(function () {
    "use strict";

    var isPrintTaskRequestedHandled = false;
    var printManager = Windows.Graphics.Printing.PrintManager;

    WinJS.UI.Pages.define("/demos/print/fromApp/fromApp.html", {
        ready: function (element, options) {
            q(".print #invokePrint").onclick = invokePrint;
            updatePrintDisplay() 
        }
    });

    function updatePrintDisplay() {
        q(".print #printStatus").innerText = isPrintTaskRequestedHandled ? "Registered" : "Unregistered";
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
            frag.appendChild(q(".print #printFromApp").cloneNode(true));
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
