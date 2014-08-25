(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/usersettings/usersettings.html", {
        ready: function (element, options) {
            //restore local settings
            var inputLocal = element.querySelector("section[role=main] input:nth-of-type(1)");
            appdata.localSettings.values.hasKey("storagedemo") && (inputLocal.value = appdata.localSettings.values["storagedemo"]);

            //save local settings on blur
            inputLocal.onblur = function (e) { appdata.localSettings.values["storagedemo"] = inputLocal.value; };

            //restore roaming settings
            var inputRoaming = element.querySelector("section[role=main] input:nth-of-type(2)");
            appdata.roamingSettings.values.hasKey("storagedemo") && (inputRoaming.value = appdata.roamingSettings.values["storagedemo"]); //restore value

            //save roaming settings on blur
            inputRoaming.onblur = function (e) { appdata.roamingSettings.values["storagedemo"] = inputRoaming.value; };
        }
    });
})();
