(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/bowling/bowling.html", {
        ready: function (element, options) {

            var frameDiv = document.querySelector(".frame");
            var playerDiv = document.querySelector(".player");
            var gameDiv = document.querySelector(".game");

            //replicate the frames
            for (var i = 0; i < 9; i++)
                playerDiv.appendChild(frameDiv.cloneNode(true));

            //replicate the players
            for (var i = 0; i < 4; i++)
                gameDiv.appendChild(playerDiv.cloneNode(true));

            //set all the fields to 0 and add a handler to increment on click
            document.querySelectorAll(".field").toArray().forEach(function (field) {
                field.innerText = "0";
                field.onclick = function (args) {
                    field.innerText = parseInt(field.innerText) + 1;
                    document.querySelectorAll(".field").toArray().forEach(function (f) { f.classList.remove("selected"); }); //remove all selected classes
                    field.classList.add("selected"); //add selected class to the field that was clicked
                };
            });

        }
    });
})();

NodeList.prototype.toArray = Ocho.Array.toArray;