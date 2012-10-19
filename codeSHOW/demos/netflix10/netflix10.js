(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/netflix10/netflix10.html", {
        ready: function (element, options) {
            WinJS.Binding.processAll(q("body"), options);
            
            //created a list that's grouped by the first letter of the movie title
            var titlesListGrouped = new WinJS.Binding.List().createGrouped(
                function (i) { return i.name.charAt(0).toUpperCase(); },
                function (i) { return { firstLetter: i.name.charAt(0).toUpperCase() }; }
            );

            //bind the ListView to this Binding.List
            var list = document.querySelector("#list").winControl;
            list.itemDataSource = titlesListGrouped.dataSource;
            list.itemTemplate = document.querySelector("#template");
            list.groupDataSource = titlesListGrouped.groups.dataSource;
            list.groupHeaderTemplate = document.querySelector("#headertemplate");

            //make an asynchronous service call for each letter of the alphabet
            var letters = [];
            for (var i = 65; i <= 90; i++) letters.push(String.fromCharCode(i));
            var promises = letters.map(function (l) { return WinJS.xhr({ url: "http://odata.netflix.com/Catalog/Titles?$format=json&$filter=startswith(ShortName,'" + l + "')&$top=10&$select=ShortName,BoxArt" }); });
            WinJS.Promise.join(promises)
                .then(
                    function (composite) {
                        composite.forEach(function (xhr) {
                            var titles = JSON.parse(xhr.response).d;
                            titles.forEach(function (i) {
                                titlesListGrouped.push({
                                    name: i.ShortName,
                                    image: i.BoxArt.LargeUrl
                                });
                            });
                        });
                    },
                    function (error) {
                        var x = error;
                    }
                );
        }
    });
})();
