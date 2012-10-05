(function () {
    "use strict";

    var SECONDS_DELAY = 3;
    
    WinJS.UI.Pages.define("/pages/promises/promises.html", {

        ready: function (element, options) {
            WinJS.Binding.processAll(q("body"), options);

            initConcept();
            initUses();
        }
    });

    function initUses() {

        //consuming a promise
        var method1 = q(".promises #uses #method1");
        q("button", method1).onclick = function (e) {
            longTaskAsyncPromise().then(function() {
                q("progress", method1).value = 100;
            });
        };

        //passing on a promise
        var method2 = q(".promises #uses #method2");
        q("button", method2).onclick = function (e) {
            function myAsyncFunction() {
                 return longTaskAsyncPromise();
            }

            myAsyncFunction().then(function() {
                q("progress", method2).value = 100;
            });
        };

        //creating a promise
        var method3 = q(".promises #uses #method3");
        q("button", method3).onclick = function (e) {
            function myAsyncFunction() {
                return new WinJS.Promise(function(c, e, p) {
                    //do something that might take longer than 50ms
                    try {
                        longTaskAsyncPromise().then(function() {
                            c();
                        });
                    }
                    catch(err) {
                        e(err);
                    }
                });
            }

            myAsyncFunction().then(function() {
                q("progress", method3).value = 100;
            });
        };

        //storing a promise
        var method4 = q(".promises #uses #method4");
        q("button", method4).onclick = function (e) {

            var storedPromise = longTaskAsyncPromise();

            storedPromise.then(function() {
                q("progress", method4).value = 100;
            });
        };

    }
    
    function initConcept() {
        //call the longTaskSync method which will block the UI while it's working
        var method1 = q(".promises #concept #method1");
        q("button", method1).onclick = function (e) {
            longTaskSync();
            q("progress", method1).value = 100;
        };

        var method2 = q(".promises #concept #method2");
        q("button", method2).onclick = function (e) {
            longTaskAsync();
            q("progress", method2).value = 100;
        };

        var method3 = q(".promises #concept #method3");
        q("button", method3).onclick = function (e) {
            q("progress", method3).value = "0";
            longTaskAsyncPromise().done(null, null, function (s) { q("progress", method3).value = (100 / SECONDS_DELAY) * s; });
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
