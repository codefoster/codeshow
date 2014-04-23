(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/discover/discover.html", {
        element: null,
        ready: function (element, options) {
            this.element = element;
            var that = this;

            //geolocation
            var g = new Windows.Devices.Geolocation.Geolocator();
            g.onstatuschanged = function (e) {
                var status = Ocho.Misc.getEnumValue(g.locationStatus, Windows.Devices.Geolocation.PositionStatus);
                geostatus.innerText = status;
            };

            //accelerometer
            accvalue.innerText = (Windows.Devices.Sensors.Accelerometer.getDefault() ? "does" : "does not");

            //removable storage
            Windows.Devices.Enumeration.DeviceInformation.findAllAsync(Windows.Devices.Portable.StorageDevice.getDeviceSelector(), null)
                .then(
                    function (storageDevices) {
                        try {
                            Windows.Devices.Portable.StorageDevice.fromId(storageDevices.getAt(0).id);
                            rsvalue.innerText = "is";
                        }
                        catch (exc) {
                            rsvalue.innerText = "is not";
                        }
                    }
                );

        }
    });
})();
