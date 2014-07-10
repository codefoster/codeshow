(function () {
    "use strict";

    var log = Ocho.Logging.log;

    WinJS.UI.Pages.define("/demos/jsonFcts/jsonFcts.html", {
        ready: function (element, options) {
            var sara = JSON.parse('{ "name": "Sara", "age": 54 }');
            sara.age++;
            log(JSON.stringify(sara));
        }
    });
})();
