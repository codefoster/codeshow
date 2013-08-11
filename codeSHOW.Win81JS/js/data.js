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
            });
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
            })
            .then(function(team) { Data.team = team; });
    }

    //populate demos (from the package)
    function loadDemos() {
        //populate demos (from the package)
        return pkg.installedLocation.getFolderAsync("demos")
            .then(function(demosFolder) { return demosFolder.getFoldersAsync(); })
            .then(function(demoFolders) {
                demoFolders.forEach(function(demoFolder) {
                    var demo = { name: demoFolder.displayName, enabled: true };
                    return demoFolder.getFileAsync(demoFolder.displayName + ".html")
                        .then(
                            null,
                            function() {
                                //there is not an html file, so enumerate sections
                                demo.sections = [];
                                var c = 1;
                                demoFolder.getFoldersAsync()
                                    .then(function(sectionFolders) {
                                        //TODO: if there are no section folders then this demo should not be added at all
                                        sectionFolders.forEach(function (sectionFolder) {
                                            var section = { name: sectionFolder.displayName, demoName: demo.name, enabled: true, order: c++ };
                                            getMetadataAsync(section, sectionFolder)
                                                .then(function(result) {
                                                    if(result && result.jsonFileExists && section.enabled)
                                                        demo.sections.push(section);
                                                }, function () { debugger; });
                                        });
                                    }, function () { debugger; });
                            }
                        )
                        .then(function() {
                            return getMetadataAsync(demo, demoFolder)
                                .then(function (result) {
                                    if (result.jsonFileExists && demo.enabled) 
                                        Data.demos.push(demo);
                                }, function () { debugger;  });
                        });
                });
            }, function () { debugger; });
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
