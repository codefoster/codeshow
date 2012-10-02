(function () {
    "use strict";

    function getOffset(event) {
        return {
            offsetX: event.offsetX === undefined ? event.layerX : event.offsetX,
            offsetY: event.offsetY === undefined ? event.layerY : event.offsetY
        };
    }

    var subscription;
    function initialize() {
        if (subscription && !subscription.isDisposed) {
            subscription.dispose();
        }

        subscription = new Rx.SingleAssignmentDisposable();

        var canvas = document.getElementById('tutorial');
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'yellow';
        ctx.beginPath();

        var mouseMoves = Rx.Observable.fromEvent(canvas, 'mousemove');
        var mouseDiffs = mouseMoves.bufferWithCount(2, 1).select(function (x) {
            return { first: getOffset(x[0]), second: getOffset(x[1]) };
        });
        var mouseButton = Rx.Observable.fromEvent(canvas, 'mousedown').select(function (x) { return true; })
            .merge(Rx.Observable.fromEvent(canvas, 'mouseup').select(function (x) { return false; }))

        var paint = mouseButton.select(function (down) { return down ? mouseDiffs : mouseDiffs.take(0) }).switchLatest();

        subscription.setDisposable(paint.subscribe(function (x) {
            ctx.moveTo(x.first.offsetX, x.first.offsetY);
            ctx.lineTo(x.second.offsetX, x.second.offsetY);
            ctx.stroke();
        }));
    }

    WinJS.UI.Pages.define("/pages/canvaspaint/canvaspaint.html", {
        ready: function (element, options) {
            initialize();
        }
    });
})();
