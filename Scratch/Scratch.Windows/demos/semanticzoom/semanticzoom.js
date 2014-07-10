(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/semanticzoom/semanticzoom.html", {
        ready: function (element, options) {
            var attractions = [
                { name: "Fern Grotto", category: "Flora", location: "East", imageUrl: "http://www.kauai.com/photos/kauai/point/98/super/fern_grotto-kauai-attraction.JPG" },
                { name: "Hanalei Valley Lookout", category: "Scenery", location: "North", imageUrl: "http://www.kauai.com/photos/kauai/point/51/super/hanalei-valley-lookout-kauai-attractions-3.jpg" },
                { name: "Hanapepe Swinging Bridge", category: "Other", location: "West", imageUrl: "http://www.kauai.com/photos/kauai/point/93/super/843726541306971801.jpg" },
                { name: "Kalalau Lookout", category: "Scenery", location: "West", imageUrl: "http://www.kauai.com/photos/kauai/point/94/super/3075381091306977440.jpg" },
                { name: "Kauai Coastal Path", category: "Coastline", location: "East", imageUrl: "http://www.kauai.com/photos/kauai/point/100/super/kauai-coastal-path-kauai-attractions.JPG" },
                { name: "Keahua Arboretum", category: "Flora", location: "East", imageUrl: "http://www.kauai.com/photos/kauai/point/95/super/keahua-arboretum-kauai-attractions-5.JPG" },
                { name: "Kilauea Lighthouse National Wildlife Preserve", category: "Coastline", location: "North", imageUrl: "http://www.kauai.com/photos/kauai/point/49/super/kilauea_lighthouse_national_wildlife_preserve-kauai-attraction.JPG" },
                { name: "Koloa Landing", category: "Coastline", location: "South", imageUrl: "http://www.kauai.com/photos/kauai/point/99/super/koloa-landing-kauai-attractions-2.jpg" },
                { name: "Lawai International Center", category: "Other", location: "South", imageUrl: "http://www.kauai.com/photos/kauai/point/110/super/lawai-international-center-kauai-attractions.JPG" },
                { name: "Menehune Fishpond", category: "Other", location: "East", imageUrl: "http://www.kauai.com/photos/kauai/point/48/super/menehune-fishpond-kauai-attractions.JPG" },
                { name: "Napali Coast", category: "Coastline", location: "North", imageUrl: "http://www.kauai.com/photos/kauai/point/82/super/napali-coast-kauai-attractions.jpg" },
                { name: "Opaekaa Falls", category: "Waterfall", location: "East", imageUrl: "http://www.kauai.com/photos/kauai/point/88/super/opaekaa_falls-kauai-attraction.JPG" },
                { name: "Spouting Horn", category: "Coastline", location: "South", imageUrl: "http://www.kauai.com/photos/kauai/point/86/super/spouting-horn-kauai-attractions-1.JPG" },
                { name: "Tree Tunnel", category: "Flora", location: "South", imageUrl: "http://www.kauai.com/photos/kauai/point/91/super/tree-tunnel-kauai-attractions.JPG" },
                { name: "Wailua Falls", category: "Waterfall", location: "East", imageUrl: "http://www.kauai.com/photos/kauai/point/50/super/wailua_falls-kauai-attraction.JPG" },
                { name: "Waimea Canyon", category: "Other", location: "West", imageUrl: "http://www.kauai.com/photos/kauai/point/83/super/waimea-canyon-kauai-attractions-2.JPG" },
                { name: "Wet and Dry Caves", category: "Other", location: "North", imageUrl: "http://www.kauai.com/photos/kauai/point/111/super/wet-and-dry-caves-kauai-attractions.jpg" },
            ];

            var attractionsList = new WinJS.Binding.List(attractions);
            var attractionsListGrouped = attractionsList.createGrouped(
                function (i) { return i.category; }, //group key
                function (i) { return { category: i.category }; }  //group
            );

            var zin = document.querySelector("#zoomedinlist").winControl;
            zin.itemDataSource = attractionsListGrouped.dataSource;
            zin.groupDataSource = attractionsListGrouped.groups.dataSource;
            zin.itemTemplate = document.querySelector("#zoomedintemplate");
            zin.groupHeaderTemplate = document.querySelector("#headertemplate");

            var zout = document.querySelector("#zoomedoutlist").winControl;
            zout.itemDataSource = attractionsListGrouped.groups.dataSource;
            zout.itemTemplate = document.querySelector("#zoomedouttemplate");
        }
    });
})();
