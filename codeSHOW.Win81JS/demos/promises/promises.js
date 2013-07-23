(function () {
    "use strict";

    var SECONDS_DELAY = 3;
    
    WinJS.UI.Pages.define("/demos/promises/promises.html", {

        ready: function (element, options) {
            WinJS.Binding.processAll(q("body"), options);

            initConcept();
            initUses();
            initChaining();
        }
    });
    
    function initConcept() {
        //call the longTaskSync method which will block the UI while it's working
        var method1 = q(".promises #concept .method1");
        q("button.start", method1).onclick = function (e) {
            longTaskSync();
            q("progress", method1).value = 100;
        };
        q("button.reset", method1).onclick = function (e) {
            q("progress", method1).value = 0;
        };

        var method2 = q(".promises #concept .method2");
        q("button.start", method2).onclick = function (e) {
            longTaskAsync();
            q("progress", method2).value = 100;
        };
        q("button.reset", method2).onclick = function (e) {
            q("progress", method2).value = 0;
        };

        var method3 = q(".promises #concept .method3");
        q("button.start", method3).onclick = function (e) {
            q("progress", method3).value = "0";
            longTaskAsyncPromise().done(null, null, function (s) { q("progress", method3).value = (100 / SECONDS_DELAY) * s; });
        };
        q("button.reset", method3).onclick = function (e) {
            q("progress", method3).value = 0;
        };
    }

    function initUses() {

        //consuming a promise
        var method1 = q(".promises #uses .method1");
        q("button.start", method1).onclick = function (e) {
            longTaskAsyncPromise().then(function () {
                q("progress", method1).value = 100;
            });
        };
        q("button.reset", method1).onclick = function (e) {
            q("progress", method1).value = 0;
        };

        //passing on a promise
        var method2 = q(".promises #uses .method2");
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
        var method3 = q(".promises #uses .method3");
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
        var method4 = q(".promises #uses .method4");
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

    function initChaining() {
        var chaining = q(".promises #chaining");
        var log = q(".log", chaining);

        q("button.start", chaining).onclick = function (e) {
            ////WRONG! (even though it works just fine) nested promises are very difficult to maintain
            //log.innerHTML += "1<br/>";
            //longTaskAsyncPromise()
            //    .then(function () {
            //        log.innerHTML += "2<br/>";
            //        longTaskAsyncPromise()
            //            .then(function () {
            //                log.innerHTML += "3<br/>";
            //                longTaskAsyncPromise()
            //                    .then(function () {
            //                        log.innerHTML += "4<br/>";
            //                    });
            //            });
            //    });

            //Right. See how much more maintainable the code is
            log.innerHTML += "1<br/>";
            longTaskAsyncPromise()
                .then(function () {
                    log.innerHTML += "2<br/>";
                    return longTaskAsyncPromise();
                })
                .then(function () {
                    log.innerHTML += "3<br/>";
                    return longTaskAsyncPromise();
                })
                .done(function () {
                    log.innerHTML += "4<br/>";
                });
        };
        q("button.reset", chaining).onclick = function (e) {
            log.innerHTML = "";
        };
    }

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
