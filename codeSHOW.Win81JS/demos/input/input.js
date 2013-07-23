(function () {
    "use strict";

    var gr;

    WinJS.UI.Pages.define("/demos/input/input.html", {
        ready: function (element, options) {
            //click vs. pointer
            var d1 = q(".input #clickPointer #parent > div:nth-of-type(1)");
            var d2 = q(".input #clickPointer #parent > div:nth-of-type(2)");

            d1.onclick = function(e) {
                d1.innerHTML += "click<br/>";
            };

            d2.addEventListener("MSPointerUp", function(e) {
                switch(e.pointerType) {
                    case e.MSPOINTER_TYPE_TOUCH: d2.innerHTML += "touch<br/>"; break;
                    case e.MSPOINTER_TYPE_PEN: d2.innerHTML += "pen<br/>"; break;
                    case e.MSPOINTER_TYPE_MOUSE: d2.innerHTML += "mouse<br/>"; break;
                }
            });


            //gesture
            var target = q(".input #gesture .target");
            target.addEventListener("MSPointerDown", function(e) {
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
