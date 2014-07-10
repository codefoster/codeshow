(function () {
    "use strict";

    var SECONDS_DELAY = 3;

    WinJS.UI.Pages.define("/demos/promises/uses/uses.html", {
        ready: function (element, options) {

            //consuming a promise
            var method1 = q(".uses .method1");
            q("button.start", method1).onclick = function (e) {
                longTaskAsyncPromise().then(function () {
                    q("progress", method1).value = 100;
                });
            };
            q("button.reset", method1).onclick = function (e) {
                q("progress", method1).value = 0;
            };

            //passing on a promise
            var method2 = q(".uses .method2");
            q("button.start", method2).onclick = function (e) {
                function myAsyncFunction() {
                    return longTaskAsyncPromise();
                }

                myAsyncFunction().then(function () {
                    q("progress", method2).value = 100;
                });
            };
            q("button.reset", method2).onclick = function (e) {
                q("progress", method2).value = 0;
            };

            //creating a promise
            var method3 = q(".uses .method3");
            q("button.start", method3).onclick = function (e) {
                function myAsyncFunction() {
                    return new WinJS.Promise(function (c, e, p) {
                        //do something that might take longer than 50ms
                        try {
                            longTaskAsyncPromise().then(function () {
                                c();
                            });
                        }
                        catch (err) {
                            e(err);
                        }
                    });
                }

                myAsyncFunction().then(function () {
                    q("progress", method3).value = 100;
                });
            };
            q("button.reset", method3).onclick = function (e) {
                q("progress", method3).value = 0;
            };

            //storing a promise
            var method4 = q(".uses .method4");
            q("button.start", method4).onclick = function (e) {

                var storedPromise = longTaskAsyncPromise();

                storedPromise.then(function () {
                    q("progress", method4).value = 100;
                });
            };
            q("button.reset", method4).onclick = function (e) {
                q("progress", method4).value = 0;
            };
        }
    });

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
