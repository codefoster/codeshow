(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/cameracap/cameracap.html", {
        ready: function (element, options) {
            q(".still button").onclick = function () {
                new Windows.Media.Capture.CameraCaptureUI().captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo)
                    .done(function (file) {
                        if(file) q("#capturedImage").src = URL.createObjectURL(file);
                    });
            };
            q(".video button").onclick = function () {
                new Windows.Media.Capture.CameraCaptureUI().captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photoOrVideo)
                    .done(function (file) {
                        if(file) q("#capturedVideo").src = URL.createObjectURL(file);
                    });
            };
        }
    });
})();
