// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    function getOffset(element) {
        var doc = element.ownerDocument,
            docElem = doc.documentElement,
            body = doc.body,
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            scrollTop = window.pageYOffset,
            scrollLeft = window.pageXOffset;

        return { top: scrollTop - clientTop, left: scrollLeft - clientLeft };
    }

    var disposables;

    function initialize() {
        if (disposables) {
            disposables.dispose();
        }
        disposables = new Rx.CompositeDisposable();
        var text = 'time flies like an arrow in WinJS';
        var container = document.getElementById('timeFliesRegion');
        var mouseMove = Rx.Observable.fromEvent(document, 'mousemove');

        var mouseMoveOffset = mouseMove.select(function (value) {
            var offset = getOffset(container);
            return {
                offsetX: value.clientX - offset.left + document.documentElement.scrollLeft,
                offsetY: value.clientY - offset.top + document.documentElement.scrollTop
            };
        });

        for (var i = 0, len = text.length; i < len; i++) {
            (function (i) {
                var s = document.createElement('span');
                s.innerHTML = text[i];
                s.className = 'timeFliesText';
                s.style.position = 'absolute';
                container.appendChild(s);

                disposables.add(mouseMoveOffset.delay(i * 100).subscribe(function (mouseEvent) {
                    s.style.top = mouseEvent.offsetY + 'px';
                    s.style.left = mouseEvent.offsetX + i * 10 + 15 + 'px';
                }));
            })(i);
        }
    }

    WinJS.UI.Pages.define("/demos/timeflies/timeflies.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            initialize();


        },

        unload: function () {
            if (disposables) {
                disposables.dispose();
            }
        }
    });
})();
