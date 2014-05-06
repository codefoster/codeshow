
(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/htmltotext/htmltotext.html", {

        ready: function (element, options) {
            var inpHTML = q("#inpHTML");
            var oupTEXT = q("#oupTEXT");
            convertButton.onclick = function () {
                oupTEXT.value = HTMLtoText(inpHTML.value);
            };
        }
    });
})();

function HTMLtoText(codetext) {
    var stringToReturn = "";

    for (var i = 0; i <= codetext.length; i++) {
        var curchar = codetext.charAt(i);
        (curchar == "<") ? stringToReturn += "&lt;" :
        (curchar == ">") ? stringToReturn += "&gt;" :
        (curchar == "&") ? stringToReturn += "&amp;" :
        (curchar == '"') ? stringToReturn += "&quot;" :
        (curchar == "'") ? stringToReturn += "&apos;" :
                stringToReturn += codetext.charAt(i);
    }
    return stringToReturn;
}
