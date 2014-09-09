(function () {
    "use strict";

    var cryptography = Windows.Security.Cryptography;
    var logElement;

    WinJS.UI.Pages.define("/demos/encoding/encoding.html", {
        ready: function (element, options) {
            logElement = document.querySelector(".encoding .log");
            this.clearLog();

            this.logLine("Processing cryptography script (\"see the code\" for details)...");
            var a, b, buffer

            //generate a random number
            this.log("Generating random number... ")
            a = cryptography.CryptographicBuffer.generateRandomNumber();
            this.logLine("done")

            //generate random data
            this.log("Generating random data... ")
            b = cryptography.CryptographicBuffer.encodeToHexString(cryptography.CryptographicBuffer.generateRandom(32));
            this.logLine("done");

            //decode a Base 64 string to a buffer and encode the buffer to a Base64 string.
            this.log("Encoding/decoding BASE64... ")
            a = "uiwyeroiugfyqcajkds897945234==";
            buffer = cryptography.CryptographicBuffer.decodeFromBase64String(a);
            b = cryptography.CryptographicBuffer.encodeToBase64String(buffer);
            this.logLine("done")

            //decode a hexadecimal string to a buffer and encode the buffer to a hexadecimal string.
            this.log("Encoding/decoding hexidecimal... ")
            a = "30310AFF";
            buffer = cryptography.CryptographicBuffer.decodeFromHexString(a);
            b = cryptography.CryptographicBuffer.encodeToHexString(buffer);
            this.logLine("done")

            //convert a string to binary data and convert binary data to a string.
            this.log("Converting string to binary data and back to a string... ")
            var inputString = "Input String";
            buffer = cryptography.CryptographicBuffer.convertStringToBinary(inputString, cryptography.BinaryStringEncoding.Utf16BE);
            b = cryptography.CryptographicBuffer.convertBinaryToString(cryptography.BinaryStringEncoding.Utf16BE, buffer);
            buffer = cryptography.CryptographicBuffer.convertStringToBinary(inputString, cryptography.BinaryStringEncoding.Utf16LE);
            b = cryptography.CryptographicBuffer.convertBinaryToString(cryptography.BinaryStringEncoding.Utf16LE, buffer);
            buffer = cryptography.CryptographicBuffer.convertStringToBinary(inputString, cryptography.BinaryStringEncoding.Utf8);
            b = cryptography.CryptographicBuffer.convertBinaryToString(cryptography.BinaryStringEncoding.Utf8, buffer);
            this.logLine("done")

            //create a buffer from a byte array and create a byte array from a buffer,
            this.log("Converting byte array to buffer and back... ")
            a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            buffer = cryptography.CryptographicBuffer.createFromByteArray(a);
            b = cryptography.CryptographicBuffer.copyToByteArray(buffer);
            this.logLine("done")

            //compare two buffers. b is true because the code points are equal.
            this.log("Comparing two buffers converted from hex and BASE64... ")
            a = [cryptography.CryptographicBuffer.decodeFromHexString("30310aff"), cryptography.CryptographicBuffer.decodeFromBase64String("MDEK/w==")];
            b = cryptography.CryptographicBuffer.compare(a[0], a[1]);
            this.logLine("done")
        },
        clearLog: function() { logElement.innerHTML = ""; },
        logLine: function(msg) { this.log(msg); this.log("<br/>"); },
        log: function (msg) {
            logElement.innerHTML += msg;
        }
    });
})();
