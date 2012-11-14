(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/location/location.html", {
        ready: function (element, options) {
            var loc = new Windows.Devices.Geolocation.Geolocator();
            var result = { };
            loc.onstatuschanged = function(e) {
                debugger;
            };

            loc.onpositionchanged = function(e) {
                result.lat = e.position.coordinate.latitude;
                result.lon = e.position.coordinate.longitude;
                result.accuracy = format("{0}m", e.position.coordinate.accuracy);
                WinJS.Binding.processAll(q("section[role=main]"), result);
            };
        }
    });
})();
