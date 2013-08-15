(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/bingmaps/pushpin/pushpin.html", {
        ready: function (element, options) {
            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en - us", homeRegion: "US" });
            function initMap() {
                var mapOptions = { credentials: "AkkbQwrwIpByEF9ZAnsWJlp3am9qhRzv8Q8GrsOhbNc_TfwFqum6hgiVlOZKRZ6t", width: 640, height: 480 };

                var addPushpinMap = new Microsoft.Maps.Map(element.querySelector(".map"), mapOptions);
                element.querySelector("section button").onclick = function (e) {
                    addPushpinMap.entities.push(new Microsoft.Maps.Pushpin(addPushpinMap.getCenter(), null));
                };

            }

        }
    });
})();
