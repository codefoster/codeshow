(function () {
    "use strict";

    var gr;

    WinJS.UI.Pages.define("/demos/input/gesture/gesture.html", {
        ready: function (element, options) {
            var target = q(".input .gesture .target");
            target.addEventListener("MSPointerDown", function (e) {
                gr.processDownEvent(e.currentPoint);
                e.currentTarget.msSetPointerCapture(e.pointerId);
                e.msTouchAction = "none";
            }, false);
            target.addEventListener("MSPointerMove", function (e) { gr.processMoveEvents(e.intermediatePoints); }, false);
            target.addEventListener("MSPointerUp", function (e) { gr.processUpEvent(e.currentPoint); }, false);
            target.addEventListener("MSPointerCancel", function (e) { gr.completeGesture(); }, false);

            var gs = Windows.UI.Input.GestureSettings;
            gr = new Windows.UI.Input.GestureRecognizer();
            gr.gestureSettings = gs.hold | gs.holdWithMouse | gs.tap | gs.drag;
            gr.addEventListener("holding", function (e) { target.innerHTML += "holding<br/>"; });
            gr.addEventListener("tapped", function (e) { target.innerHTML += "tapped<br/>"; });
            gr.addEventListener("dragging", function (e) { target.innerHTML += "dragging<br/>"; });
        }
    });
})();
