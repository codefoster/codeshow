(function () {
    "use strict";

    function populateMemberAsync(member) {
        return WinJS.xhr({ url: format("http://www.twitter.com/{0}", member.twitterHandle), responseType: "document" })
            .then(function (result) {
                return {
                    imageUrl: result.response.querySelector("img.avatar.size73").src,
                    name: result.response.querySelector("h1.fullname").innerText,
                    bio: result.response.querySelector("p.bio").innerHTML,
                    website: result.response.querySelector(".url a").title
                }
            });
    }

    WinJS.Namespace.define("Data", {
        team: [],
        demos: [],
        apps: [],
        loaded: null,
        loadData: loadData,
    });

    function loadData() {
        Data.loaded = WinJS.Promise.join([
            loadTeam(),
            loadDemos(),
            //loadApps()
        ]);
    }

    //read team from WAMS and fetch details from Twitter
    function loadTeam() {
        var start = new Date().getTime();
        return codeshowClient.getTable("team").read()
            .then(function (team) {
                return WinJS.Promise.join(team.map(function (member) { return populateMemberAsync(member); }));
            }, function (err) { /* gulp */ })
            .then(function (team) { Data.team = team; }, function (err) { debugger; })
            .then(function () {
                var now = new Date().getTime();
                console.info("Team profiles loaded in " + ((now - start) / 1000) + " seconds");
            });
    }

    function loadApps() {
        return codeshowClient.getTable("apps").read()

            //get app details from their Store landing page
            .then(function(apps) {
            WinJS.Promise.join(apps.map(function(app) {
                    return fetchAppDetails(app.appid);
                }))

                    //record the apps in the Data namespace
                    .then(function(appsWithDetails) {
                        Data.apps = appsWithDetails;
                    })

                    //writes apps to local storage for offline scenario
                    .then(function () {
                        if (Data.apps.length > 0) {
                            appdata.localFolder.createFileAsync("apps.json", Windows.Storage.CreationCollisionOption.replaceExisting)
                                .then(function(file) {
                                    Windows.Storage.FileIO.writeTextAsync(file, JSON.stringify(Data.apps));
                                });
                        }
                    });
            }, function(err) {
                //no internet so try to load from file
                if (err.message == "Unexpected connection failure.") {
                    return appdata.localFolder.getFileAsync("apps.json")
                        .then(function(file) { Windows.Storage.FileIO.readTextAsync(file); })
                        .then(function(contents) {
                            return JSON.parse(contents);
                        });

                }
            });

        function fetchAppDetails(id) {
            var app = {};
            return WinJS.xhr({ url: format("http://apps.microsoft.com/windows/en-us/app/{0}",id), responseType: "document" })
                .then(function (result) {
                    var d = result.response;
                    var e; //TODO: do all of these like subcategory to be safe

                    //developer name
                    e = d.querySelector("meta[name='MS.CList.Dev.Name']");
                    app.devname = (e ? e.content : "");

                    //category
                    e = d.querySelector("#CategoryText a.launchStoreCategory");
                    app.category = (e ? e.innerText : "");

                    //subcategory
                    e = d.querySelector("#CategoryText a.launchStoreCategoryWSub");
                    app.subcategory = (e ? e.innerText : "");

                    //title
                    e = d.querySelector("meta[property='og:title']");
                    app.title = (e ? e.content : "");

                    //image url
                    e = d.querySelector("meta[property='og:image']");
                    app.imageurl = (e ? e.content : "");

                    //tile background color
                    e = d.querySelector("#AppLogo .AppTileIcon");
                    if (e) {
                        var x = e.style.cssText.match(/background-color:\s?(.*);?$/)[1];
                        app.tileBackgroundColor = x;
                    }
                    else app.tileBackgroundColor = "white";

                    //description
                    e = d.querySelector("#DescriptionText");
                    app.description = (e ? e.innerHTML : "");

                    //price
                    e = d.querySelector("#Price");
                    app.price = (e ? e.innerText : "");

                    //screenshots
                    app.screenshots = [];
                    e = q("#ScreenshotImageButtons .imageButton", d);
                    if(e) e.forEach(function (b) {
                        app.screenshots.push({ url: q("img", b).src });
                    });
                })
                .then(function() { return app; });
        }

    }

    //populate demos (from the package)
    function loadDemos() {
        var start = new Date().getTime();
        return pkg.installedLocation.getFolderAsync("demos")
            .then(function (demosFolder) { return demosFolder.getFoldersAsync(); })
            .then(function (demoFolders) {
                demoFolders.forEach(function (demoFolder) {
                    //initialize and set defaults
                    var demo = { name: demoFolder.displayName, enabled: true, suppressAppBar: false, sections: [] };

                    WinJS.xhr({ url: format("/demos/{0}/{0}.html", demo.name), responseType: "document" })

                        //get the title from the html file
                        //(for demos without section folders, this will intentionally and silently fail)
                        .then(function (result) { demo.title = result.response.querySelector("title").innerText; }, function (err) { })

                        //get the metadata (from the json file) (overriding title if included)
                        .then(function () { return getMetadataAsync(demo, demoFolder); }, function (err) { debugger; })
                        .then(function (result) {
                            if (result.jsonFileExists && demo.enabled) {
                                demo.sections.forEach(function (section) {
                                    //get the section title and add the section to the demo
                                    WinJS.xhr({ url: format("/demos/{0}/{1}/{1}.html", demo.name, section.name), responseType: "document" })
                                        .then(function (result) {
                                            section.title = result.response.querySelector("title").innerText;
                                        }, function (err) { })
                                });
                                Data.demos.push(demo);
                            }
                        });
                });
            })
            .then(function () {
                var now = new Date().getTime();
                console.info("Demos loaded in " + ((now - start) / 1000) + " seconds");
            });
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
