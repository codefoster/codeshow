(function () {
    "use strict";

    var result = {};

    WinJS.UI.Pages.define("/demos/location/location.html", {
        ready: function (element, options) {
            new Windows.Devices.Geolocation.Geolocator()
                .onpositionchanged = this.bindPosition;
        },
        bindPosition: function(e) {
            result.lat = e.position.coordinate.latitude;
            result.lon = e.position.coordinate.longitude;
            result.accuracy = format("{0}m", e.position.coordinate.accuracy);
            WinJS.Binding.processAll(q("section[role=main]"), result);
        }
    });
})();
