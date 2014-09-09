//this is how the main thread talks to us (the web worker)
self.onmessage = function (e) {
    //here's how we talk to the main thread
    self.postMessage("\"Hey, boss. I heard you say '" + e.data + "\"");
};