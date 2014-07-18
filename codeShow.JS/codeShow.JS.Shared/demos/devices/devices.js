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

    //allow us to reduce a list by making it distinct on a certain key
    Array.prototype.distinct = function (keyFct) {
        var result = [];
        if (!keyFct) keyFct = function (d) { return d; };
        for (var i = 1; i < this.length; i++) {
            var that = this;
            if (!result.some(function (item) { return keyFct(item) === keyFct(that[i]); }))
                result.push(that[i]);
        }
        return result;
    }
})();
