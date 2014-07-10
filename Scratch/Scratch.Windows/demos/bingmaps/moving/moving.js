(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/bingmaps/moving/moving.html", {
        ready: function (element, options) {
            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en - us", homeRegion: "US" });
            function initMap() {
                var mapOptions = { credentials: "AkkbQwrwIpByEF9ZAnsWJlp3am9qhRzv8Q8GrsOhbNc_TfwFqum6hgiVlOZKRZ6t", width: 640, height: 480 };

                //moveAround
                var moveAroundMap = new Microsoft.Maps.Map(element.querySelector(".map"), mapOptions);
                element.querySelector("button.seattle").onclick = function (e) {
                    var seattle = { center: new Microsoft.Maps.Location(47.6215, -122.349329), mapTypeId: Microsoft.Maps.MapTypeId.auto, zoom: 18 };
                    moveAroundMap.setView(seattle);
                };
                element.querySelector("button.kauai").onclick = function (e) {
                    var kauai = { center: new Microsoft.Maps.Location(22.0833, -159.5), mapTypeId: Microsoft.Maps.MapTypeId.aerial, zoom: 10 };
                    moveAroundMap.setView(kauai);
                };
            }

        }
    });
})();
