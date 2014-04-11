(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/mediaqueries/mediaqueries.html", {
        ready: function (element, options) {
        },

        updateLayout: function (element, viewState, lastViewState) {
            q(".pagetitle").innerText = getViewStateName(viewState);
        }
    });

    function getViewStateName(code) {
        var states = Windows.UI.ViewManagement.ApplicationViewState;
        for (var s in states) {
            if(states[s] === code) return s;
        }
    }
})();
