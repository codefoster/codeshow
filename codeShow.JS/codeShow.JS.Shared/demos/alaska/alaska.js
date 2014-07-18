(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/alaska/alaska.html", {
        ready: function (element, options) {
            var width = 960, height = 500;

            var projection = d3.geo.conicEqualArea()
                 .scale(1400)
                 .rotate([154, 0])
                 .center([0, 62])
                 .parallels([55, 65])
                 .clipExtent([[-1, -1], [width + 1, height + 1]]);

            var path = d3.geo.path()
                .projection(projection);

            var svg = d3.select(".alaska .result").append("svg")
                .attr("width", width)
                .attr("height", height);

            var graticule = d3.geo.graticule()
                .step([2, 2]);

            svg.append("path")
                .datum(graticule)
                .attr("class", "graticule")
                .attr("d", path);

            var us;
            WinJS.xhr({ url: "/demos/alaska/us.json" })
                .then(
                    function (result) {
                        us = JSON.parse(result.response);
                        var alaskaState = us.objects.states.geometries.filter(function (d) { return d.id === 2; })[0],
                            alaskaCounties = us.objects.counties.geometries.filter(function (d) { return d.id / 1000 | 0 === 2; });

                        svg.insert("path", ".graticule")
                            .datum(topojson.feature(us, alaskaState))
                            .attr("class", "land")
                            .attr("d", path);

                        svg.insert("path", ".graticule")
                            .datum(topojson.mesh(us, { type: "GeometryCollection", geometries: alaskaCounties }))
                            .attr("class", "boundary")
                            .attr("d", path);
                    },
                    function (err) { debugger; }
                );

        }
    });
})();
