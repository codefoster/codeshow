(function () {
    "use strict";


    WinJS.UI.Pages.define("/demos/print/print.html", {
        ready: function (element, options) {
            sourceOfVideo.msPlayToSource.connection.addEventListener("statechanged",
                function (pte) {
                    var states = Windows.Media.PlayTo.PlayToConnectionState;
                    var state = "";
                    if (pte.currentState === states.disconnected) {
                        state = "Disconnected";
                    } else if (pte.currentState === states.connected) {
                        state = "Connected";
                    } else if (pte.currentState === states.rendering) {
                        state = "Rendering";
                    }
                    output.innerText = state;
                });// state changed
            souceOfVideo.msPlayToSource.connection.addEventListener("error",
                function (pte) {
                    output.innerText = pte.message;
                });// error
        }// ready
    });// page

    
})();
