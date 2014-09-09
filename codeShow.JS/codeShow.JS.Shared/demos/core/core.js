(function () {
    "use strict";

    var cryptography = Windows.Security.Cryptography;
    var logElement;

    WinJS.UI.Pages.define("/demos/core/core.html", {
        ready: function (element, options) {
            var that = this;
            logElement = element.querySelector(".log");
            this.clearLog();

            this.logLine("Enter a value and Create SHA-1...");

            element.querySelector("#shaButton").onclick = function (e) {
                that.logLine(that.hash(element.querySelector("input").value));
            };
        },
        clearLog: function () { logElement.innerHTML = ""; },
        logLine: function (msg) { this.log(msg); this.log("<br/>"); },
        log: function (msg) {
            logElement.innerHTML += msg;
        },
        hash: function (msg) {
            // Convert the message string to binary data.
            var buffUtf8Msg = cryptography.CryptographicBuffer.convertStringToBinary(msg, cryptography.BinaryStringEncoding.Utf8);

            // Create a HashAlgorithmProvider object.
            var objAlgProv = cryptography.Core.HashAlgorithmProvider.openAlgorithm("SHA1");

            // Hash the message.
            var buffHash = objAlgProv.hashData(buffUtf8Msg);

            // Verify that the hash length equals the length specified for the algorithm.
            if (buffHash.length != objAlgProv.hashLength) {
                throw Error("There was an error creating the hash");
            }

            // Convert the hash to a string (for display).
            var strHashBase64 = cryptography.CryptographicBuffer.encodeToBase64String(buffHash);

            // Return the encoded string
            return strHashBase64;
        }
    });
})();
