(function () {
    "use strict";

    var SECONDS_DELAY = 3;

    WinJS.UI.Pages.define("/demos/promises/promises.html", {
        ready: function (element, options) {
            //call the longTaskSync method which will block the UI while it's working
            var method1 = element.querySelector(".promises .method1");
            method1.querySelector("button.start").onclick = function (e) {
                longTaskSync();
                method1.querySelector("progress").value = 100;
            };
            method1.querySelector("button.reset").onclick = function (e) {
                method1.querySelector("progress").value = 0;
            };

            var method2 = element.querySelector(".promises .method2");
            method2.querySelector("button.start").onclick = function (e) {
                longTaskAsync();
                method2.querySelector("progress").value = 100;
            };
            method2.querySelector("button.reset").onclick = function (e) {
                method2.querySelector("progress").value = 0;
            };

            var method3 = element.querySelector(".promises .method3");
            method3.querySelector("button.start").onclick = function (e) {
                method3.querySelector("progress").value = "0";
                longTaskAsyncPromise().done(null, null, function (s) { method3.querySelector("progress").value = (100 / SECONDS_DELAY) * s; });
            };
            method3.querySelector("button.reset").onclick = function (e) {
                method3.querySelector("progress").value = 0;
            };
        }
    });
    function longTaskSync() {
        var start = new Date().getTime();
        var delay = SECONDS_DELAY * 1000;
        while (new Date().getTime() < start + delay);
    }

    function longTaskAsync() {
        var seconds = 0;
        var intervalId = window.setInterval(function () {
            seconds++;
            if (seconds >= SECONDS_DELAY) {
                window.clearInterval(intervalId);
            }
        }, 1000);
    }

    function longTaskAsyncPromise() {
        return new WinJS.Promise(function (c, e, p) {
            var seconds = 0;
            var intervalId = window.setInterval(function () {
                seconds++;
                p(seconds);
                if (seconds >= SECONDS_DELAY) {
                    window.clearInterval(intervalId);
                    c();
                }
            }, 1000);
        });
    }
})();
