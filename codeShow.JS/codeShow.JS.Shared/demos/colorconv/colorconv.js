(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/colorconv/colorconv.html", {
        ready: function (element, options) {
            redcolor.onkeyup = dec2hexColor;
            greencolor.onkeyup = dec2hexColor;
            bluecolor.onkeyup = dec2hexColor;
            hexcolor.onkeyup = hex2decColor;
        }
    });
})();

function dec2hexColor() {
    var red = parseInt(q("#redcolor").value);
    var green = parseInt(q("#greencolor").value);
    var blue = parseInt(q("#bluecolor").value);

    redhex = (isNaN(red)) ? "00" : Math.max(0, Math.min(255, red)).toString(16);
    greenhex = (isNaN(green)) ? "00" : Math.max(0, Math.min(255, green)).toString(16);
    bluehex = (isNaN(blue)) ? "00" : Math.max(0, Math.min(255, blue)).toString(16);

    if (redhex.length < 2)
        redhex = "0" + redhex;

    if (greenhex.length < 2)
        greenhex = "0" + greenhex;

    if (bluehex.length < 2)
        bluehex = "0" + bluehex;

     hexcolor.value = (redhex + greenhex + bluehex).toUpperCase();

    outputcolor.style.background = "#" + redhex + greenhex + bluehex;
}

function hex2decColor() {
    var hex = hexcolor;
    hex.value = hex.value.substr(0, 6);
    outputcolor.style.backgroundColor = "#" + hex.value;
    redcolor.value = parseInt(hex.value.substr(0, 2), 16);
    greencolor.value = parseInt(hex.value.substr(2, 2), 16);
    bluecolor.value = parseInt(hex.value.substr(4, 2), 16);
}