(function () {
    "use strict";

    var websocket = new WebSocket("ws://echo.websocket.org/");

    WinJS.UI.Pages.define("/demos/html5sockets/html5sockets.html", {
        ready: function (element, options) {

            websocket.onopen = function (evt) {
                writeToScreen("CONNECTED");
                var message = "Web socket test";
                writeToScreen("SENT: " + message);
                websocket.send(message);
            };

            websocket.onclose = function (evt) {
                writeToScreen("DISCONNECTED");
            };

            websocket.onmessage = function (evt) {
                writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
                websocket.close();
            };
            websocket.onerror = function (evt) { writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data); };

            function writeToScreen(message) {
                var pre = document.createElement("p");
                pre.style.wordWrap = "break-word";
                pre.innerHTML = message;
                output.appendChild(pre);
            }
        },

        unload: function () {
            websocket.close();
        },

        updateLayout: function (element) {
        }
    });
})();
