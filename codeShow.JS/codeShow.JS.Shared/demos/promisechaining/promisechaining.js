(function () {
    "use strict";

    var SECONDS_DELAY = 3;

    WinJS.UI.Pages.define("/demos/promisechaining/promisechaining.html", {
        ready: function (element, options) {
            var chaining = element.querySelector("section[role=main]");
            var log = chaining.querySelector(".log");

            chaining.querySelector("button.start").onclick = function (e) {
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
            chaining.querySelector("button.reset").onclick = function (e) {
                log.innerHTML = "";
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
