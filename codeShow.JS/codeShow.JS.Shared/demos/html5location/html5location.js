(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/html5location/html5location.html", {
        ready: function (element, options) {
            navigator.geolocation.getCurrentPosition(function (p) {
                output.innerHTML = "lat: " + p.coords.latitude;
                output.innerHTML += "<br/>";
                output.innerHTML += "lon: " + p.coords.longitude;
            });
        }
    });
})();
