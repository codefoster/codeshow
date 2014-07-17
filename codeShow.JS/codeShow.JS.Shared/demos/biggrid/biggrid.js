(function () {
    "use strict";

    var element;
    var COLS = 80;
    var ROWS = 40;

    WinJS.UI.Pages.define("/demos/biggrid/biggrid.html", {
        ready: function (e, o) {
            element = e;
            this.buildBigGrid(element);
        },

        buildBigGrid: function () {
            var grid = element.querySelector(".biggrid .msgrid");
            grid.style.display = "-ms-grid";
            grid.style.msGridColumns = Ocho.Array.repeat("10px", COLS).join(" ");
            grid.style.msGridRows = Ocho.Array.repeat("10px", ROWS).join(" ");
            for (var i = 1; i <= COLS; i++) {
                for (var j = 1; j <= ROWS; j++) {
                    var childDiv = document.createElement("div");
                    childDiv.style.msGridColumn = i;
                    childDiv.style.msGridRow = j;
                    childDiv.style.width = "9px";
                    childDiv.style.height = "9px";
                    childDiv.style.backgroundColor = Ocho.Utilities.format("rgb({0},{1},{2})", Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
                    childDiv.style.margin = "1px";
                    grid.appendChild(childDiv);
                }
            }
        }
    });
})();
