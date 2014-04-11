(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/bingmaps/custompushpin/custompushpin.html", {
        ready: function (element, options) {
            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en - us", homeRegion: "US" });
            function initMap() {
                var mapOptions = { credentials: "AkkbQwrwIpByEF9ZAnsWJlp3am9qhRzv8Q8GrsOhbNc_TfwFqum6hgiVlOZKRZ6t", width: 640, height: 480 };

                //customPushpin
                var customPushpinMap = new Microsoft.Maps.Map(element.querySelector(".map"), mapOptions);
                element.querySelector("section button").onclick = function (e) {
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
