(function () {
    "use strict";

    var tileColors;
    var r = appdata.roamingSettings.values;
    
    WinJS.UI.Pages.define("/demos/settings/settings.html", {
        ready: function (element, options) {
            init(element);
            loadPrefs();
        }
    });

    function init(element) {
        
        q("#showPrefs").onclick = function (e) {
            WinJS.UI.SettingsFlyout.showSettings("preferencesDiv", "/demos/settings/settings.html");
        };

        //tile color
        var colors = ["#0098ab", "#0070a9", "#d9532c", "#a400ac", "#009086", "#5838b4", "#ae193e", "#2c86ee", "#009c00"];
        r["tileColor"] || (r["tileColor"] = colors[0]); //default
        tileColors = q("#tileColors > div");
        tileColors.forEach(function (d, i) {
            d.style.backgroundColor = colors[i];
            d.onclick = function (e) {
                tileColors.forEach(function (d) { d.classList.remove("selected"); });
                e.target.classList.add("selected");
                r["tileColor"] = e.target.style.backgroundColor;
                codeSHOW.Pages.Home.changeColor(e.target.style.backgroundColor);
            };
        });
        
        //group by tag
        r["groupByTag"] || (r["groupByTag"] = false); //default
        q("#tglTagGroup").onchange = function (e) {
            r["groupByTag"] = q("#tglTagGroup").winControl.checked;
        };
        
        //sort by
        r["sortBy"] || (r["sortBy"] = "name"); //default
        q("#sortBy").onchange = function(e) {
            r["sortBy"] = q("#sortBy").value;
        };
    }
    
    function loadPrefs() {
        //load tile color
        if (!r["tileColor"]) r["tileColor"] = "rgb(0, 144, 134)";
        tileColors.forEach(function (d) {
            if (d.style.backgroundColor == r["tileColor"]) d.classList.add("selected");
        });
        
        //load group setting
        q("#tglTagGroup").winControl.checked = r["groupByTag"];
        //TODO: trigger this change to take effect
        
        //sort by
        q("#sortBy").value = r["sortBy"];
        //TODO: trigger this change to take effect
    }
})();
