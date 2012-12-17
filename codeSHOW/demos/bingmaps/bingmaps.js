(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/bingmaps/bingmaps.html", {
        ready: function (element, options) {
            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en - us", homeRegion: "US" });
            function initMap() {
                var mapOptions = { credentials: "AkkbQwrwIpByEF9ZAnsWJlp3am9qhRzv8Q8GrsOhbNc_TfwFqum6hgiVlOZKRZ6t", width:640, height:480 };
                //basicMap
                var basicMap = new Microsoft.Maps.Map(element.querySelector("#basicMap_map"), mapOptions);
                
                //moveAround
                var moveAroundMap = new Microsoft.Maps.Map(element.querySelector("#moveAround_map"), mapOptions);
                q("#moveAround > button.seattle", element).onclick = function (e) {
                    var seattle = { center: new Microsoft.Maps.Location(47.6215, -122.349329), mapTypeId: Microsoft.Maps.MapTypeId.auto, zoom: 18 };
                    moveAroundMap.setView(seattle);
                };
                q("#moveAround > button.kauai", element).onclick = function (e) {
                    var kauai = { center: new Microsoft.Maps.Location(22.0833, -159.5), mapTypeId: Microsoft.Maps.MapTypeId.aerial, zoom: 10 };
                    moveAroundMap.setView(kauai);
                };

                //addPushpin
                var addPushpinMap = new Microsoft.Maps.Map(element.querySelector("#addPushpin_map"), mapOptions);
                q("#addPushpin > button", element).onclick = function (e) {
                    addPushpinMap.entities.push(new Microsoft.Maps.Pushpin(addPushpinMap.getCenter(), null));
                };
                
                //customPushpin
                var customPushpinMap = new Microsoft.Maps.Map(element.querySelector("#customPushpin_map"), mapOptions);
                q("#customPushpin > button", element).onclick = function (e) {
                    customPushpinMap.entities.push(new Microsoft.Maps.Pushpin(customPushpinMap.getCenter(), {
                        width: null,
                        height: null,
                        htmlContent: "<div style='padding:5px;font-size:12px;font-weight:bold;border:2px solid gray;background-color:rgba(255,255,255,0.2);color:white;text-shadow:0px 0px 4px black;width:100px;border-radius:12px;border-top-left-radius:0px;'>Custom Pushpin</div>"
                    }));
                };
            }

        }
    });
})();
