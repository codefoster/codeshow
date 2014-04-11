// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    function isTypeOf(o,t) {
        if (t && t.charAt && t.charAt(0)) {
            return (Object.prototype.toString.call(o) === "[object " + t + "]");
        } else {
            throw new WinJS.ErrorFromName("Args", "'t' required and must be a string.");
        }
    }

    function doAsync(msg, limit) {
        return new WinJS.Promise(
            // c complete, e error, p progress
            function (c, e, p) {
            msg = msg || "no-msg";
            limit = limit || 3;
            var seconds = 0;
            doProgress(msg + ": started"); 
            var iId = window.setInterval(function () {
                try {
                    seconds++;
                    if (msg === "fail") {
                        throw new WinJS.ErrorFromName(
                            "promise", "Muhahaha!");
                    }
                    p && p(msg + ": " + seconds.toString());
                    if (seconds > limit) {
                        window.clearInterval(iId);
                        c && c(msg);
                    }
                } catch (ex) {
                    window.clearInterval(iId);
                    e && e(ex);
                }

            }, 1000); // repeat every second, stop at limit
        });
    }

    function doComplete(msg) {
        WinJS.log && WinJS.log(msg + ": complete", "demo", "info");
    }
    function doProgress(msg) {
        WinJS.log && WinJS.log(msg, "demo", "info");
    }
    function doError(err) {
        var msg = "undefined error";
        if (err) {
            msg = err.detail;
            if (!(msg && msg.message))
                msg = err.message || "err type unknown";
        }
        WinJS.log && WinJS.log(msg, "demo", "error");
    }

    WinJS.UI.Pages.define("/demos/errors/errors.html", {

        stateOfLog: null,
        // This function is called when unhandled errors are captured 
        error: function (err) {
            // errInfo parameter has the following properties that are useful
            //      .message
            //      .description
            //      .stack
            WinJS.log && WinJS.log("[page-level] " + err.message, "demo", "error");
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // capture the state of log method for restoring later in unload event
            this.stateOfLog = WinJS.log;

            // initialize custom log method
            WinJS.log = function (msg, tags, type) {

                // get element from errors.html.  if no longer in DOM, exit immediately
                var output = document.querySelector("div#output");
                if (!output) return;

                // msg is required and must be a string
                if (isTypeOf(msg, "String")) {

                    // default type to "info" if no value provided
                    type = type || "info";

                    // only output msg if tags parameter contains demo
                    if (tags && tags.match && tags.match(/demo/gi)) {
                        // output is the id of a div on the page
                         output.innerText = msg;
                    }
                    if (type === "error") {
                         output.classList.add("error");
                    } else {
                        output.classList.remove("error");
                    }
                }
            };

            boxPromise.onclick = function () {
                doAsync("promise", 4)
                    .then(doComplete, doError, doProgress);
            };

            boxPromiseChainDone.onclick = function () {
                doAsync("chain[1]", 2)
                    .then(function (msg) {
                        doComplete(msg);
                        return doAsync("chain[2]", 2);
                    }, null, doProgress)
                    .then(function (msg) {
                        doComplete(msg);
                        return doAsync("fail");
                    }, null, doProgress)
                    .then(function (msg) {
                        doComplete(msg);
                        return doAsync("chain[4]", 4);
                    }, null, doProgress)
                    .done(null, doError);
            };

            boxPromiseChainJoined.onclick = function () {
                var promises = [];
                var i = 0;
                // each promise has an error handler
                promises[i++] = doAsync("2seconds", 2)
                    .then(doComplete, doError);
                promises[i++] = doAsync("fail", 8)
                    .then(doComplete, doError);
                promises[i++] = doAsync("3seconds", 3)
                    .then(doComplete, doError);
                // join promises
                WinJS.Promise.join(promises)
                    .done(function () {
                        doProgress("all promises completed");
                    }, doError);
            };

        },

        unload: function () {

            // Restore log method to state it was in prior to this page
            WinJS.log = this.stateOfLog;
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
