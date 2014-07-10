(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/devices/devices.html", {
        ready: function (element, options) {
            
            var devicesList = new WinJS.Binding.List();

            list.winControl.itemDataSource = devicesList.dataSource;
            list.winControl.itemTemplate = template;
            
            Windows.Devices.Enumeration.DeviceInformation.findAllAsync().done(function (devices) {
                devices
                    .filter(function (d) { return d.name.length > 0 && d.isEnabled; })
                    .distinct(function (d) { return d.name; })
                    .forEach(function (d) {
                        d.getGlyphThumbnailAsync().then(function(thumbnail) {
                            if (thumbnail && thumbnail.size > 0) {
                                devicesList.push({
                                    imageUrl: URL.createObjectURL(thumbnail, { oneTimeOnly: false }),
                                    name: d.name
                                });
                            }
                        });
                    });
            });
        }
    });
})();
