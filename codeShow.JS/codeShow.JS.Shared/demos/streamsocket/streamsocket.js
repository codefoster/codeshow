(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/streamsocket/streamsocket.html", {
        ready: function (element, options) {
            var socket = new Windows.Networking.Sockets.StreamSocket();
            socket.connectAsync(new Windows.Networking.HostName("echo.websocket.org"), "80").done(function (evt) {
                writeToScreen("CONNECTED");
                var writer = new Windows.Storage.Streams.DataWriter(socket.outputStream);
                var string = "Hello World";
                writer.writeInt32(writer.measureString(string));
                writer.writeString(string);
                writer.storeAsync().done(function () {
                    writer.detachStream();
                    writeToScreen("MESSAGE SENT");
                }, function () { debugger; });

            }, function() { debugger; });
        }
    });

    function writeToScreen(message) {
        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message;
        output.appendChild(pre);
    }

})();
