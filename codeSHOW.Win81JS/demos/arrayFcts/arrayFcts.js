(function () {
    "use strict";

    var clearLog = Ocho.Logging.clearLog;
    var log = Ocho.Logging.log;
    var format = Ocho.Utilities.format;
        
    WinJS.UI.Pages.define("/demos/arrayFcts/arrayFcts.html", {
        ready: function (element, options) {

            clearLog();

            //declare and assign some arrays
            log();
            var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            var s = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india"];
            log(format("a = {0}", a.join(",")));
            log(format("s = {0}", s.join(",")));

            //map
            log();
            var aPlus1 = a.map(function (i) { return i + 1; });
            log(format("map (i + 1): {0}", aPlus1.join(",")));
            
            //filter
            log();
            var bigNumbers = a.filter(function (i) { return i > 5; });
            log(format("filter (i > 5): {0}", bigNumbers.join(",")));
            
            //some
            log();
            var hasCharlie = s.some(function (i) { return i == "charlie"; });
            log(format("some (i == \"charlie\"): {0}", hasCharlie ? "yep, it has a charlie" : "nope, no charlie"));

            //every
            log();
            var allPositive = a.every(function (i) { return i >= 0; });
            log(format("every (i >= 0): {0}", allPositive ? "yep, they're all positive" : "nope, not all of them are positive"));

            //forEach
            log();
            log("forEach: ");
            s.forEach(function(item, index) {
                log(format("[{0}] - {1}", index, item.toUpperCase()));
            });
            
            //reduce
            log();
            var sum = a.reduce(function (previous, current) { return previous + current; });
            log(format("reduce (previous + current): {0}", sum));

            //sort
            log();
            log("a reversed");
            var aReversed = a.reverse();
            log(aReversed);
            log("sort");
            var sorted = aReversed.sort();
            log(sorted.join(","));
            
            //splice
            log();
            log("splice");
            var aSpliced = a;
            aSpliced.splice(2, 2, "20", "21");
            log(aSpliced);
            
            //slice
            //TODO: provide example for slice
            //TODO: improve the layout of this page
        }

    });

})();
