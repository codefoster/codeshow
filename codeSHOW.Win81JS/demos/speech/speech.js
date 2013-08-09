(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/speech/speech.html", {
        ready: function (element, options) {
            //sayit.onclick = function () {

            //    // The object for controlling and playing audio.
            //    var audio = new Audio();

            //    // The object for controlling the speech-synthesis engine (voice).
            //    var synth = new Windows.Media.SpeechSynthesis.SpeechSynthesizer();

            //    // Generate the audio stream from plain text.
            //    synth.synthesizeTextToStreamAsync(say.value).then(function (markersStream) {

            //        // Convert the stream to a URL Blob.
            //        var blob = MSApp.createBlobFromRandomAccessStream(markersStream.ContentType, markersStream);

            //        // Send the Blob to the audio object.
            //        audio.src = URL.createObjectURL(blob, { oneTimeOnly: true });
            //        audio.play();
            //    });
            //};
        }
    });
})();
