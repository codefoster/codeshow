(function() {
    "use strict";
    
    var demos = [
        //HTML
        { key: "html5video", name: "HTML5 Video", group: "HTML", tags: "html", difficulty: 0 },
        { key: "html5audio", name: "HTML5 Audio", group: "HTML", tags: "html", difficulty: 0 },
        { key: "context", name: "Contexts", group: "HTML", tags: "html", difficulty: 0 },
        { key: "viewbox", name: "Viewbox", group: "HTML", tags: "html, layout", difficulty: 0 },
        { key: "semanticzoom", name: "Semantic Zoom", group: "HTML", tags: "html, data", difficulty: 0 },

        //CSS
        { key: "textprops", name: "Text and Font Properties", group: "CSS", tags: "css", difficulty: 0 },
        { key: "boxprops", name: "Box Properties", group: "CSS", tags: "css", difficulty: 0 },
        { key: "csscolumns", name: "Columns", group: "CSS", tags: "css", difficulty: 0 },
        { key: "grid", name: "Grid", group: "CSS", tags: "css, layout", difficulty: 0 },
        { key: "flexbox", name: "Flexbox", group: "CSS", tags: "css, layout", difficulty: 0 },
        { key: "flexboxwrap", name: "Flexbox Wrap", group: "CSS", tags: "css, layout", difficulty: 0 },
        { key: "mediaqueries", name: "Media Queries", group: "CSS", tags: "css", difficulty: 0 },
        { key: "snappoints", name: "Snap Points", group: "CSS", tags: "css", difficulty: 0 },

        //JavaScript
        { key: "eventHandlers", name: "Event Handlers", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "arrayFcts", name: "Array Functions", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "jsonFcts", name: "JSON.parse and .stringify", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "local", name: "Loading local data", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "netflix", name: "Loading Netflix data", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "netflix10", name: "Loading Netflix data by 10", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "netflixTrickle", name: "Loading Netflix Trickle", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "custom_promise", name: "Using custom promises", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "datejs", name: "date.js", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "classes", name: "WinJS Classes", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "simple", name: "Simple data binding", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "properties", name: "Binding more properties", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "template", name: "Templates", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "share_simple", name: "Sharing text data", group: "JavaScript", tags: "javascript, sharing", difficulty: 0 },
        { key: "devices", name: "Devices", group: "JavaScript", tags: "javascript", difficulty: 0 },
        { key: "cameracap", name: "Camera Capture", group: "JavaScript", tags: "javascript, camera", difficulty: 0 },
        { key: "templateItems", name: "Adding Template Items", group: "JavaScript", tags: "html, flexbox, template", difficulty: 6 }
    ];

    //TODO: use colors like a heat map indicating how advanced (difficult) the sample is (green=easy, red=hard)
    var colors = ["#0098ab", "#0070a9", "#d9532c", "#a400ac", "#009086", "#5838b4", "#ae193e", "#2c86ee", "#009c00"];
    demos.forEach(function (i) {
        i.tileColor = colors[Math.floor(Math.random() * colors.length)];
    });
    demos.forEach(function (i) {
        i.click = function () {
            var location = "/pages/" + i.key + "/" + i.key + ".html";
            WinJS.Navigation.navigate(location, i);
        };
        i.click.supportedForProcessing = true;
    });

    WinJS.Namespace.define("Data", {
        demos: demos
    });

})();