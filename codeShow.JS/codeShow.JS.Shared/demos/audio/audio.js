(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/audio/audio.html", {
        ready: function (element, options) {
            //TODO: consider https://github.com/katspaugh/wavesurfer.js for visualizing waveform?
            var recording = false;
            var capture;
            var fileName;
            var btn = element.querySelector("#captureButton");
            btn.onclick = function () {
                if (!recording) {
                    Windows.Devices.Enumeration.DeviceInformation.findAllAsync(Windows.Devices.Enumeration.DeviceClass.audioCapture)
                        .then(function (devices) {
                            var captureInitSettings;
                            captureInitSettings = new Windows.Media.Capture.MediaCaptureInitializationSettings();
                            captureInitSettings.audioDeviceId = "";
                            captureInitSettings.streamingCaptureMode = Windows.Media.Capture.StreamingCaptureMode.audio;
                            captureInitSettings.realTimeModeEnabled = true;

                            var DEVICE_INDEX = 0;
                            if (devices[DEVICE_INDEX]) {
                                captureInitSettings.audioDeviceId = devices[DEVICE_INDEX].id;

                                capture = new Windows.Media.Capture.MediaCapture();
                                var profile;
                                capture.initializeAsync(captureInitSettings).then(function (result) {
                                    profile = Windows.Media.MediaProperties.MediaEncodingProfile.createWma(Windows.Media.MediaProperties.AudioEncodingQuality.high);
                                    Windows.Storage.KnownFolders.musicLibrary.createFileAsync("capture.wma", Windows.Storage.CreationCollisionOption.generateUniqueName).then(function (newFile) {
                                        capture.startRecordToStorageFileAsync(profile, newFile).then(function (result) {
                                            recording = true;
                                            fileName = newFile.name;
                                            btn.innerText = "Stop";
                                            btn.classList.add("recording");
                                        });
                                    });
                                });
                            }
                        });
                }
                else {
                    capture.stopRecordAsync();
                    recording = false;
                    btn.innerText = "Capture";
                    btn.classList.remove("recording");
                    Windows.Storage.KnownFolders.musicLibrary.getFileAsync(fileName).then(function (captureFile) {
                        var audioBlobUrl = URL.createObjectURL(captureFile, { oneTimeOnly: true });
                        element.querySelector("#capturedAudio").src = audioBlobUrl;
                    });
                }
            };
        }
    });
})();
