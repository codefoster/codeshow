(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/cssidclass/cssidclass.html", {
        ready: function (element, options) {
            // for each of the div's
            element.querySelectorAll(".cssidclass div").toArray().forEach(function (div) {
                div.innerText = "The quick brown fox jumps over the lazy dog."; // set the text content
                div.onmouseover = function (e) { e.target.classList.add("active"); }; // add function to set active class on hover
                div.onmouseout = function (e) { e.target.classList.remove("active"); }; // add function to remove active class on hover
            });
        }
    });

    //we need the toArray() function on this page, so pull it in from the Ocho library
    NodeList.prototype.toArray = Ocho.Array.toArray;
})();
