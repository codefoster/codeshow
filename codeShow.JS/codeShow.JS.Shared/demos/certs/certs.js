(function () {
    "use strict";

    var cryptography = Windows.Security.Cryptography;
    var logElement;

    WinJS.UI.Pages.define("/demos/certs/certs.html", {
        ready: function (element, options) {
            var that = this;
            logElement = document.querySelector(".certs .log");
            this.clearLog();

            this.log("Creating and importing certificates (\"see the code\" for details)...");

            return WinJS.Promise.wrap(true)
                .then(function () {
                    //create a certificate request
                    that.log(">Creating a new certificate request... ");
                    var props = new Windows.Security.Cryptography.Certificates.CertificateRequestProperties();
                    props.subject = "Fred Flintstone";
                    props.friendlyName = "Fred's Certificate";
                    return cryptography.Certificates.CertificateEnrollmentManager.createRequestAsync(props)
                    .then(
                        function (req) {
                            that.logLine("done");
                            that.logLine("Encoded request String:" + req);
                        },
                        function (e) {
                            that.logLine("error(" + e.message + ")");
                        }
                    );
                })
                .then(function () {
                    //import a PFX certificate
                    that.log(">Importing a PFX certificate... ");
                    var pfxCertificate = "-----BEGIN CERTIFICATE-----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-----END CERTIFICATE-----";
                    return cryptography.Certificates.CertificateEnrollmentManager.importPfxDataAsync(
                        pfxCertificate,
                        "sampletest", //password
                        cryptography.Certificates.ExportOption.NotExportable,
                        cryptography.Certificates.KeyProtectionLevel.NoConsent,
                        cryptography.Certificates.InstallOptions.None,
                        "test pfx certificate")
                        .then(
                            function () { that.logLine("done"); },
                            function (err) { that.logLine("error (" + err.message + ")"); }
                        );
                });
        },
        clearLog: function () { logElement.innerHTML = ""; },
        logLine: function (msg) { this.log(msg); this.log("<br/>"); },
        log: function (msg) {
            logElement.innerHTML += msg;
        }
    });
})();
