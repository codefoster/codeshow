(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/canvasball/canvasball.html", {
        ready: function (element, options) {
            var dx = 5, dy = 5, r = 20, x = r, y = r;

            var c = canvas.getContext("2d");

            setInterval(function () { draw(); step(); }, 10);

            function draw() {
                c.clearRect(0, 0, c.canvas.width, c.canvas.height);
                c.beginPath();
                c.fillStyle = "darkorange";
                c.arc(x, y, r, 0, Math.PI * 2, true);
                c.closePath();
                c.fill();
            }
            
            function step() {
                if (x > c.canvas.width - r || x < r) dx *= -1;
                if (y > c.canvas.height - r || y < r) dy *= -1;
                x += dx;
                y += dy;
            }
        }
    });
})();
