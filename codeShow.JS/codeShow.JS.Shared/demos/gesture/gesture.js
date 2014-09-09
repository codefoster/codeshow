(function () {
    "use strict";

    var gr;

    WinJS.UI.Pages.define("/demos/gesture/gesture.html", {
        ready: function (element, options) {
            var target = element.querySelector(".target");
            target.addEventListener("pointerdown", function (e) {
                gr.processDownEvent(e.currentPoint);
                e.currentTarget.setPointerCapture(e.pointerId);
                e.touchAction = "none";
            }, false);
            target.addEventListener("pointermove", function (e) { gr.processMoveEvents(e.intermediatePoints); }, false);
            target.addEventListener("pointerup", function (e) { gr.processUpEvent(e.currentPoint); }, false);
            target.addEventListener("pointercancel", function (e) { gr.completeGesture(); }, false);

            var gs = Windows.UI.Input.GestureSettings;
            gr = new Windows.UI.Input.GestureRecognizer();
            gr.gestureSettings = gs.hold | gs.holdWithMouse | gs.tap | gs.drag;
            gr.addEventListener("holding", function (e) { target.innerHTML += "holding<br/>"; });
            gr.addEventListener("tapped", function (e) { target.innerHTML += "tapped<br/>"; });
            gr.addEventListener("dragging", function (e) { target.innerHTML += "dragging<br/>"; });
        }
    });
})();
