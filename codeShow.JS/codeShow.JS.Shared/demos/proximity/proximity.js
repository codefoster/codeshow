(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/proximity/proximity.html", {
        ready: function (element, options) {
            var p = Windows.Networking.Proximity;
            var findingLabel = element.querySelector(".finding");
            var proximityDevice = p.ProximityDevice.getDefault();
            p.PeerFinder.role = p.PeerRole.peer
            p.PeerFinder.start();

            setTimeout(function () {
                p.PeerFinder.stop();
                findingLabel.style.display = "none";
            }, 5000)
        }
    });
})();
