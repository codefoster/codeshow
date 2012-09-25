self.onmessage = function(e) {
    self.postMessage("\"Hey, boss. I heard you say '" + e.data + "\"");
};