(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/video/video.html", {
        ready: function (element, options) {
            element.querySelector("#captureButton").onclick = function () {
                var dialog = new Windows.Media.Capture.CameraCaptureUI();
                dialog.videoSettings.format = Windows.Media.Capture.CameraCaptureUIVideoFormat.mp4;
                dialog.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.video)
                    .done(
                        function (file) {
                            if (file) element.querySelector("#capturedVideo").src = URL.createObjectURL(file, { oneTimeOnly: true });
                        }
                    );
            };
        }
    });
})();
