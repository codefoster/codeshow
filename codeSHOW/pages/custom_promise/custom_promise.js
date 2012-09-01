(function () {
    "use strict";
    
    WinJS.UI.Pages.define("/pages/custom_promise/custom_promise.html", {

        ready: function (element, options) {
            WinJS.Binding.processAll(q("body"), options);
            
            //call the longTaskSync method which will block the UI while it's working
            var divs = q("section[role=main] > div > div");
            divs[1].onclick = function (args) {
                longTaskSync();
                divs[0].style.backgroundColor = "green";
            };

            divs[3].onclick = function (args) {
                longTaskAsync();
                divs[2].style.backgroundColor = "green";
            };

            divs[5].onclick = function (args) {
                var completed = 0;
                divs[4].style.width = "0px";
                divs[4].style.backgroundColor = "green";
                longTaskAsyncPromise().done(
                    function () {
                        divs[4].style.backgroundColor = "green";
                    },
                    null,
                    function () {
                        completed++;
                        divs[4].style.width = (completed * 120) + "px";
                    }
                );
            };
        }
    });

    function longTaskSync() {
        var start = new Date().getTime();
        var delay = 5000;
        while (new Date().getTime() < start + delay);
    }

    function longTaskAsync() {
        var seconds = 0;
        var intervalId = window.setInterval(function () {
            seconds++;
            if (seconds > 4) {
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
                if (seconds > 4) {
                    window.clearInterval(intervalId);
                    c();
                }
            }, 1000);
        });
    }

    function q(query, context) { context = context || document; var result = context.querySelectorAll(query); if (result.length > 1) return Array.prototype.slice.call(result); else if (result.length == 1) return result[0]; else return null; }
})();
