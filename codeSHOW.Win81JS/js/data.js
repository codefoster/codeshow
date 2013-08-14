(function () {
    "use strict";

    function populateMemberAsync(member) {
        return WinJS.xhr({ url: format("http://www.twitter.com/{0}", member.twitterHandle), responseType: "document" })
            .then(function (result) {
                member.imageUrl = result.response.querySelector("img.avatar.size73").src;
                member.name = result.response.querySelector("h1.fullname").innerText;
                member.bio = result.response.querySelector("p.bio").innerHTML;
                member.website = result.response.querySelector(".url a").title;
                return member;
            }, function (err) { debugger; });
    }

    WinJS.Namespace.define("Data", {
        team: [],
        demos: [],
        loaded: null,
        loadData: loadData,
    });

    function loadData() {
        Data.loaded = WinJS.Promise.join([loadTeam(), loadDemos()]);
    }

    //read team from WAMS and fetch details from Twitter
    function loadTeam() {
        return app.client.getTable("team").read()
            .then(function(team) {
                return WinJS.Promise.join(team.map(function(member) { return populateMemberAsync(member); }));
            }, function (err) { debugger; })
            .then(function (team) { Data.team = team; }, function (err) { debugger; });
    }

    //populate demos (from the package)
    function loadDemos() {
        return pkg.installedLocation.getFolderAsync("demos")
            .then(function(demosFolder) { return demosFolder.getFoldersAsync(); })
            .then(function(demoFolders) {
                demoFolders.forEach(function(demoFolder) {
                    var demo = { name: demoFolder.displayName, enabled: true, sections: [] };
                    WinJS.xhr({ url: format("/demos/{0}/{0}.html", demo.name), responseType: "document" })

                        //get the title from the html file
                        //(for demos without section folders, this will intentionally and silently fail)
                        .then(function (result) { demo.title = result.response.querySelector("title").innerText; }, function (err) {  })

                        //get the metadata (from the json file) (overriding title if included)
                        .then(function () { return getMetadataAsync(demo, demoFolder); }, function (err) { debugger; })
                        .then(function (result) {
                            if (result.jsonFileExists && demo.enabled){
                                demo.sections.forEach(function (section) {
                                    //get the section title and add the section to the demo
                                    WinJS.xhr({url:format("/demos/{0}/{1}/{1}.html", demo.name, section.name), responseType:"document"})
                                        .then(function (result) {
                                            section.title = result.response.querySelector("title").innerText;
                                        }, function (err) {  })
                                });
                                Data.demos.push(demo);
                            }
                        }, function (err) { debugger; })

                });
            }, function (err) { debugger; })
    }
    
    function getMetadataAsync(ds, folder) {
        //TODO: first get the HTML and get the title from that... override with .json file below if it exists
        return folder.getFileAsync(folder.displayName + ".json")
            .then(
                function(file) {
                    //there was a json file
                    return Windows.Storage.FileIO.readTextAsync(file)
                        .then(function(text) {
                            var m = JSON.parse(text);
                            for (var key in m)
                                if (m.hasOwnProperty(key))
                                    ds[key] = m[key]; //copy all properties
                            return { jsonFileExists: true };
                        }, function(err) { debugger; });
                },
                function() {
                    //there was not a json file
                    return { jsonFileExists: false };
                }
            );
    }
})();
