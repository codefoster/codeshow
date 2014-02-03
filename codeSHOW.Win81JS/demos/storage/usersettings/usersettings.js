(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/storage/usersettings/usersettings.html", {
        ready: function (element, options) {
            //restore local settings
            var inputLocal = q(".storage .usersettings section[role=main] input:nth-of-type(1)");
            appData.localSettings.values.hasKey("storagedemo") && (inputLocal.value = appData.localSettings.values["storagedemo"]);

            //save local settings on blur
            inputLocal.onblur = function (e) { appData.localSettings.values["storagedemo"] = inputLocal.value; };

            //restore roaming settings
            var inputRoaming = q(".storage .usersettings section[role=main] input:nth-of-type(2)");
            appData.roamingSettings.values.hasKey("storagedemo") && (inputRoaming.value = appData.roamingSettings.values["storagedemo"]); //restore value

            //save roaming settings on blur
            inputRoaming.onblur = function (e) { appData.roamingSettings.values["storagedemo"] = inputRoaming.value; };
        }
    });
})();
