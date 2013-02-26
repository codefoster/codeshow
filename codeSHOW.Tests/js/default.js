// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    function runSpecs() {
        // configure the spec runner
        var specRunner = new Hilo.SpecRunner({
            src: "codeSHOW",
            specs: "tests",
            helpers: "tests/Helpers"
        });

        // Handle any errors in the execution that
        // were not part of a failing test
        specRunner.addEventListener("error", function (args) {
            document.querySelector("body").innerText = args.detail;
        });

        // run the specs
        specRunner.run();
    }

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            args.setPromise(WinJS.UI.processAll()).then(function() {
                runSpecs();
            });
        }
    };

    app.oncheckpoint = function (args) { };

    app.start();
})();
