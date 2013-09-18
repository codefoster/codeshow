(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/speech/speech.html", {
        ready: function (element, options) {
            var audio = new Audio();
            var synth = new Windows.Media.SpeechSynthesis.SpeechSynthesizer();
            say("Welcome to the text to speech demo");

            sayit.onclick = function () {
                say(textToSpeak.value);
            };

            function say(msg) {
                synth.synthesizeTextToStreamAsync(msg).then(function (s) {
                    var blob = MSApp.createBlobFromRandomAccessStream(s.ContentType, s);
                    audio.src = URL.createObjectURL(blob, { oneTimeOnly: true });
                    audio.play();
                });
            }
        }
    });
})();
