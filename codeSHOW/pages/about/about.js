(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/about/about.html", {
        ready: function (element, options) {
            var profilesList = new WinJS.Binding.List();
            var lv = q(".win-listview", element).winControl;
            lv.itemDataSource = profilesList.dataSource;
            lv.itemTemplate = q("#profileTemplate", element);
            lv.layout = new WinJS.UI.ListLayout();
            
            getTwitterProfiles(["codefoster","palermo4","valeASeattle"])
                .then(
                    function (profiles) {
                        q("progress", element).style.display = "none";
                        profiles
                            .map(function (profile) {
                                profile.name = format("{0} ({1})", profile.name, profile.handle);
                                return profile;
                            })
                            .forEach(function (profile) { profilesList.push(profile); });

                    },
                    function () {
                        //no internet connection... stop progress and show the offline div
                        q("progress", element).style.display = "none";
                        q("#offlineVersion", element).style.display = "block";
                    }
                );
        }
    });
    
    function getTwitterProfiles(handles) {
        return new WinJS.Promise(function (c, e, p) {
            //get promises for all of the twitter.com calls
            var resultPromises = handles.map(function (handle) {
                return WinJS.xhr({ url: format("http://www.twitter.com/{0}", handle), responseType: "document" });
            });
            
            //join the promises and map the responses into local objects
            WinJS.Promise.join(resultPromises)
                .then(
                    function(results) {
                        c(results.map(function(result) {
                            return {
                                imageUrl: result.response.querySelector("img.avatar.size128").src,
                                name: result.response.querySelector("h1.fullname").innerText,
                                handle: result.response.querySelector(".screen-name").innerText,
                                bio: result.response.querySelector("p.bio").innerHTML,
                                website: result.response.querySelector(".url a").href
                            };
                        }));
                    },
                    function() {
                        e();
                    }
                );
        });
    }
})();
