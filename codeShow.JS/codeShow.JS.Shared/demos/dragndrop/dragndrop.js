/// <reference path="../../lib/RxJS/rx.winjs.js" />
/// <reference path="../../lib/RxJS/rx.js" />

(function () {
    "use strict";
    
    // Without RxJS
    var isDrag, offset, dragElement;

    function onmouseup() {
        isDrag = false;
    }
    
    function onmousemove(e) {
        if (isDrag) {
            dragElement.style.left = (e.clientX + offset.startX) + 'px';
            dragElement.style.top = (e.clientY + offset.startY) + 'px';
        }
    }
    
    function onmousedown(e) {
        e.preventDefault();
        isDrag = true;
        offset = {
            startX: parseInt(dragElement.style.left) - e.clientX, startY: parseInt(dragElement.style.top) - e.clientY
        };
    }
    
    function initializeWithoutRxJs() {
        dragElement = document.querySelector('#dragTarget');
        dragElement.addEventListener('mouseup', onmouseup, false);
        document.addEventListener('mousemove', onmousemove, false);
        dragElement.addEventListener('mousedown', onmousedown, false);
    }
    
    function teardownWithoutRxJs() {
        dragElement.removeEventListener('mouseup', onmouseup, false);
        document.removeEventListener('mousemove', onmousemove, false);
        dragElement.removeEventListener('mousedown', onmousedown, false);
    }

    // With RxJS
    var subscription;
    
    function initialize() {
        var dragTarget = document.querySelector('#dragTarget');

        // Get the three major events
        var mouseup = Rx.Observable.fromEvent(dragTarget, 'mouseup');
        var mousemove = Rx.Observable.fromEvent(document, 'mousemove');
        var mousedown = Rx.Observable.fromEvent(dragTarget, 'mousedown');

        var mousedrag = mousedown.selectMany(function (md) {
            // calculate offsets when mouse down
            var startX = md.offsetX, startY = md.offsetY;

            return mousemove.select(function (mm) {
                mm.preventDefault();

                return {
                    left: mm.clientX - startX,
                    top: mm.clientY - startY
                };
            }).takeUntil(mouseup);
        });

        subscription = mousedrag.subscribe(function (pos) {
            // Update position
            dragTarget.style.top = pos.top + 'px';
            dragTarget.style.left = pos.left + 'px';
        });
    }
    
    function teardown() {
        subscription.dispose();
    }

    WinJS.UI.Pages.define("/demos/dragndrop/dragndrop.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            //initialize();
            initializeWithoutRxJs();
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            // TODO: Respond to changes in viewState.
        },

        unload: function () {
            //teardown();
            teardownWithoutRxJs();
        }
    });
})();
