(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/popups/popups.html", {
        ready: function (element, options) {
            alertMsg.onclick = function () {
                //Simplydoes Windows.UI.Popups.MessageDialog(str).showAsync()
                Ocho.Popups.alert("Say anything here in this message dialog", "Title");
            };
            confirmMsg.onclick = function () {
                //Ocho.Popups.confirm GOES HERE
                //confirm: function (message, title) {
                //    return new WinJS.Promise(function (c) {
                //        title = title || "";
                //        var msgDialog = Windows.UI.Popups.MessageDialog(message, title);
                //        msgDialog.commands.append(new Windows.UI.Popups.UICommand("OK", c, 1));
                //        msgDialog.commands.append(new Windows.UI.Popups.UICommand("Cancel", c, 0));
                //        msgDialog.showAsync();
                //    });
                //}
                Ocho.Popups.confirm("Would you like to use confirmation dialogs in your app?")
                    .done(
                        function (command) {
                            detailConfirm.innerText = "You pressed " + command.label + " button with commandID: " + command.id;
                        }
                    );
            };
        },
    });
})();
