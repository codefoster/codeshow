(function() {
    var r = Windows.Storage.ApplicationData.current.roamingSettings.values;

    WinJS.Namespace.define("Converters", {
        twitterHandleConverter: new WinJS.Binding.converter(function (value) {
            return (value ? "@" + value : "");
        })
    });

})();
