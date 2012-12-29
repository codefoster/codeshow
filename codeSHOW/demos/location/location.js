(function () {
    "use strict";

    var result = {};

    WinJS.UI.Pages.define("/demos/location/location.html", {
        ready: function (e, o) {
            var self = this;
            var geo = new Windows.Devices.Geolocation.Geolocator();
            geo.onpositionchanged = function (e) { self.bindPosition(e.position); };
            geo.onstatuschanged = function (e) {
                q("#msg", e).innerText = self.getStatusString(e.status);
                if (e.status == 0) {
                    geo.getGeopositionAsync().then(function (pos) {
                        self.bindPosition(pos);
                    });
                }
            };
        },
        bindPosition: function (pos) {
            result.lat = pos.coordinate.latitude;
            result.lon = pos.coordinate.longitude;
            result.accuracy = format("{0}m", pos.coordinate.accuracy);
            WinJS.Binding.processAll(q("section[role=main]"), result);
        },
        getStatusString: function (locStatus) {
            switch (locStatus) {
                case Windows.Devices.Geolocation.PositionStatus.ready:
                    return "Location is available.";
                    break;
                case Windows.Devices.Geolocation.PositionStatus.initializing:
                    return "Location devices are still initializing.";
                    break;
                case Windows.Devices.Geolocation.PositionStatus.noData:
                    return "Data from location services is currently unavailable.";
                    break;
                case Windows.Devices.Geolocation.PositionStatus.disabled:
                    return "Your location is currently turned off. " +
                        "Change your settings through the Settings charm " +
                        " to turn it back on.";
                    break;
                case Windows.Devices.Geolocation.PositionStatus.notInitialized:
                    return "Location status is not initialized because " +
                        "the app has not requested location data.";
                    break;
                case Windows.Devices.Geolocation.PositionStatus.notAvailable:
                    return "You do not have the required location services " +
                        "present on your system.";
                    break;
                default:
                    break;
            }
        }
    });
})();
