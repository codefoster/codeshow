(function () {
    "use strict";

    var SECONDS_DELAY = 3;

    WinJS.UI.Pages.define("/demos/promiseuses/promiseuses.html", {
        ready: function (element, options) {

            //consuming a promise
            var method1 = element.querySelector(".method1");
            method1.querySelector("button.start").onclick = function (e) {
                longTaskAsyncPromise().then(function () {
                    method1.querySelector("progress").value = 100;
                });
            };
            method1.querySelector("button.reset").onclick = function (e) {
                method1.querySelector("progress").value = 0;
            };

            //passing on a promise
            var method2 = element.querySelector(".method2");
            method2.querySelector("button.start").onclick = function (e) {
                function myAsyncFunction() {
                    return longTaskAsyncPromise();
                }

                myAsyncFunction().then(function () {
                    method2.querySelector("progress").value = 100;
                });
            };
            method2.querySelector("button.reset").onclick = function (e) {
                method2.querySelector("progress").value = 0;
            };

            //creating a promise
            var method3 = element.querySelector(".method3");
            method3.querySelector("button.start").onclick = function (e) {
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
                    method3.querySelector("progress").value = 100;
                });
            };
            method3.querySelector("button.reset").onclick = function (e) {
                method3.querySelector("progress").value = 0;
            };

            //storing a promise
            var method4 = element.querySelector(".method4");
            method4.querySelector("button.start").onclick = function (e) {

                var storedPromise = longTaskAsyncPromise();

                storedPromise.then(function () {
                    method4.querySelector("progress").value = 100;
                });
            };
            method4.querySelector("button.reset").onclick = function (e) {
                method4.querySelector("progress").value = 0;
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
