(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/bingmaps/bingmaps.html", {
        ready: function (element, options) {
            //q(".seecode", element).onclick = function(e) {
            //    WinJS.Navigation.navigate("/pages/demoCode/demoCode.html", options);
            //};
            
            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en - us", homeRegion: "US" });
            function initMap() {
                var mapOptions = { credentials: "AkkbQwrwIpByEF9ZAnsWJlp3am9qhRzv8Q8GrsOhbNc_TfwFqum6hgiVlOZKRZ6t" };

                //basicMap
                var basicMap = new Microsoft.Maps.Map(element.querySelector("#basicMap_map"), mapOptions);
                basicMap.setOptions({ width: 640, height: 480 });
                
                //moveAround
                var moveAround = new Microsoft.Maps.Map(element.querySelector("#moveAround_map"), mapOptions);
                moveAround.setOptions({ width: 640, height: 480 });
                q("#moveAround > button.seattle", element).onclick = function (e) {
                    var seattle = { center: new Microsoft.Maps.Location(47.6215, -122.349329), mapTypeId: Microsoft.Maps.MapTypeId.auto, zoom: 18 };
                    moveAround.setView(seattle);
                };
                q("#moveAround > button.kauai", element).onclick = function (e) {
                    var kauai = { center: new Microsoft.Maps.Location(22.0833, -159.5), mapTypeId: Microsoft.Maps.MapTypeId.aerial, zoom: 10 };
                    moveAround.setView(kauai);
                };
            }

        }
    });
})();
