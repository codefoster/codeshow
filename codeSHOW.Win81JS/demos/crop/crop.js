/// <reference path="../../lib/RxJS/rx.js" />
/// <reference path="../../lib/RxJS/rx.winjs.js" />

(function () {
    'use strict';

    var utilities = WinJS.Utilities;
    var promise = WinJS.Promise;
    var cleanup; // `we'll use `cleanup` to ensure that we don't have any Rx stuff hanging around around we unload the page
    var boundingBox = { x: 0, y: 0, x2: 0, y2: 0 };// a model for the region of the image about to be cropped
    var handles = []; // an array of draggable elements that modify the crop region
    var overlay; // `overlay` is a canvas element that allows us to darken the portion  of the image that will be removed.
    var ctx; // `ctx` will be the drawing context for `overlay`

    function initBoundingBox(size) {
        boundingBox.x = 0;
        boundingBox.y = 0;
        boundingBox.x2 = size.width;
        boundingBox.y2 = size.height;
        return promise.wrap(boundingBox);
    }

    function loadImage() {

        // This promise completes when the img is loaded.
        return new promise(function (complete, error, progress) {

            var // `buffer` is a canvas element that displays the actual image to crop
                buffer = document.querySelector('#buffer'),
                // `img` is an img element we use to load the img, though we never add it to the DOM
                img = document.createElement('img');

            img.src = '/demos/crop/images/leaf twirl.jpg';

            img.addEventListener('load', function (args) {
                overlay.width = img.width;
                overlay.height = img.height;

                buffer.width = img.width;
                buffer.height = img.height;
                buffer.getContext('2d').drawImage(img, 0, 0);

                // return the dimensions of the image we just loaded
                complete({
                    width: img.width,
                    height: img.height
                });

            }, false);
        });
    }

    function createHandles(boundingBox) {
        var container = document.querySelector('#container');

        function createHandle(id, render, updateModel) {
            var handle = document.createElement('div');
            utilities.addClass(handle, 'handle');
            handle.setAttribute('id', id);
            container.appendChild(handle);

            // `render` allows us to visually update the handle after it has been dragged
            handle['render'] = render;
            // `updateModel` allows us to modify the correct part of the crop region model
            handle['updateModel'] = updateModel;

            handles.push(handle);
        };

        // top left
        createHandle('tl', function () {
            this.style.top = boundingBox.y + 'px';
            this.style.left = boundingBox.x + 'px';
        }, function (x, y) {
            boundingBox.x = x;
            boundingBox.y = y;
        });

        //top right
        createHandle('tr', function () {
            this.style.top = boundingBox.y + 'px';
            this.style.left = boundingBox.x2 + 'px';
        }, function (x, y) {
            boundingBox.y = y;
            boundingBox.x2 = x;
        });

        // bottom left
        createHandle('bl', function (s) {
            this.style.top = boundingBox.y2 + 'px';
            this.style.left = boundingBox.x + 'px';
        }, function (x, y) {
            boundingBox.x = x;
            boundingBox.y2 = y;
        });

        // bottom right
        createHandle('br', function (s) {
            this.style.top = boundingBox.y2 + 'px';
            this.style.left = boundingBox.x2 + 'px';
        }, function (x, y) {
            boundingBox.y2 = y;
            boundingBox.x2 = x;
        });

        // render the handles in their initial positiions
        handles.forEach(function (element) { element['render'](); });

        return new promise(function (complete) {
            complete(handles);
        });
    }
    function drawOverlay(x, y, w, h) {
        var x = boundingBox.x,
            y = boundingBox.y,
            w = boundingBox.x2 - boundingBox.x,
            h = boundingBox.y2 - boundingBox.y;

        ctx.globalCompositeOperation = 'source-over';

        ctx.clearRect(0, 0, overlay.width, overlay.height);

        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, overlay.width, overlay.height);

        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.fillRect(x, y, w, h);
        ctx.fill();

        handles.forEach(function (tool) { tool['render'](); });
    }

    function respondToGestures(handles) {
        var fromEvent = Rx.Observable.fromEvent;

        var moves = fromEvent(overlay, 'mousemove'),
            up = fromEvent(document, 'mouseup'),
            subscription;

        // When the mouse is down on a handle, return the handle element
        var events = fromEvent(handles, 'mousedown')
            .selectMany(function (handle) {
                return moves
                    // We combine the handle element with the position data from the move event
                    .select(function (pos) {
                        return {
                            element: handle.target,
                            offsetX: pos.offsetX,
                            offsetY: pos.offsetY
                        };
                    })
                    // However, when the mouse is up (anywhere on the document) then stop the stream
                    .takeUntil(up);
            });

        subscription = events.subscribe(function(data) {
            data.element.updateModel(data.offsetX, data.offsetY);
            window.requestAnimationFrame(drawOverlay);
        });
        cleanup.setDisposable(subscription);
    }

    // Start with `ready`. It's the function that is invoked when the page is loaded.
    WinJS.UI.Pages.define('/demos/crop/crop.html', {

        ready: function (element, options) {
            cleanup = new Rx.SingleAssignmentDisposable(),

            overlay = document.querySelector('#overlay');
            ctx = overlay.getContext('2d');

            loadImage()
                .then(initBoundingBox)
                .then(createHandles)
                .then(respondToGestures);
        },
        unload: function () {
            cleanup.dispose();
        }
    });
})();
