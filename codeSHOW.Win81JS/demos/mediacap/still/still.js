(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/mediacap/still/still.html", {
        ready: function (element, options) {
            var btn = element.querySelector("#captureButton");
            btn.onclick = function () {
                new Windows.Media.Capture.CameraCaptureUI().captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo)
                    .done(function (file) {
                        if (file) element.querySelector("#capturedImage").src = URL.createObjectURL(file);
                    });
            };
        }
    });
})();
