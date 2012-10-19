(function () {
    "use strict";

    var appdata = Windows.Storage.ApplicationData.current;
    var tileColors;
    
    WinJS.UI.Pages.define("/demos/settings/settings.html", {
        ready: function (element, options) {
            //init();
            //loadPrefs();
        }
    });

    function init() {
        //TODO
        tileColors = q("#tileColors > div");
        
        q("#showPrefs").onclick = function (e) {
            WinJS.UI.SettingsFlyout.showSettings("preferencesDiv", "/demos/settings/settings.html");
        };

        var colors = ["#0098ab", "#0070a9", "#d9532c", "#a400ac", "#009086", "#5838b4", "#ae193e", "#2c86ee", "#009c00"];
        tileColors.forEach(function (d, i) {
            d.style.backgroundColor = colors[i];
            d.onclick = function (e) {
                tileColors.forEach(function (d) { d.classList.remove("selected"); });
                e.target.classList.add("selected");
                
            };
        });
    }
    
    function loadPrefs() {
        var tileColor = appdata.roamingSettings.values["tileColor"];
        if(!tileColor) tileColor = "#0098ab";
        tileColors.forEach(function (d) { if (d.style.backgroundColor == tileColor) d.target.classList.add("selected"); });
    }
})();
