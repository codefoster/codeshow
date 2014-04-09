(function () {
    "use strict";

    var page;
    WinJS.UI.Pages.define("/pages/hub/hub.html", {
        init: function (element, options) {
            page = this;

            //make select portions of this page's functionality available outside the page
            createNamespace();

            if (!codeShow.Pages.Hub.pageDataLoaded)
                return Data.loaded
                    .then(function () {

                        //build demos list
                        Data.demos
                            .sort(function (a,b) {
                                return (!b.dateCreated || new Date(a.dateCreated) > new Date(b.dateCreated) ? -1 : 1);
                            })
                            .take(12)
                            .forEach(function (demo) {
                                codeShow.Pages.Hub.demosList.push(demo);
                            });

                        //build team list
                        if(Data.team)
                            Data.team.forEach(function (member) {
                                codeShow.Pages.Hub.teamList.push(member);
                            });

                        //build apps list
                        if (Data.apps) {
                            var a = Data.apps.takeRandom(8);
                            codeShow.Pages.Hub.featuredApp = a[0];
                            for (var i = 1; i < a.length; i++) {
                                codeShow.Pages.Hub.subFeaturedApps.push(a[i]);
                            }
                        }

                        //mark data as loaded
                        codeShow.Pages.Hub.pageDataLoaded = true;
                    });
        },

        ready: function (element, options) {
            if (options.message) {
                Windows.UI.Popups.MessageDialog(options.message).showAsync().then(function () {
                    options.message = null;
                });
            }
            var hub = element.querySelector(".hub").winControl;
            hub.onloadingstatechanged = function (args) {
                if (args.srcElement === hub.element && args.detail.loadingState === "complete") {
                    page._hubReady(hub);
                    hub.onloadingstatechanged = null;
                }
            }.bind(this);

            hub.onheaderinvoked = function (args) {
                args.detail.section.onheaderinvoked(args);
            };

            //bind apps section
            //TODO: try to get this to work more elegantly by binding... couldn't get it to work
            if (codeShow.Pages.Hub.featuredApp && codeShow.Pages.Hub.featuredApp.screenshots[0]) {
                document.querySelector(".section_apps .top-image-row .screenshot img").src = codeShow.Pages.Hub.featuredApp.screenshots[0].url;
                document.querySelector(".section_apps .top-image-row .logo").style.backgroundColor += codeShow.Pages.Hub.featuredApp.tileBackgroundColor;
                document.querySelector(".section_apps .top-image-row .logo img").src = codeShow.Pages.Hub.featuredApp.imageurl;
            }

        },

        processed: function() {
            //when data is finished loading then hide the extended splash screen
            splash.classList.add("hidden");
        },

        unload: function () {
            session.hubScroll = document.querySelector(".hub").winControl.scrollPosition;
        },

        updateLayout: function (element) {
            // first attempt at hiding the ad if the app has been paid for
            // var adStyle = document.querySelector(".section_ad").style;
            // adStyle.width = (app.paid ? "0px" : "auto");
            // if (app.paid) adStyle.display = "none";
        },

        _hubReady: function (hub) {
            /// <param name="hub" type="WinJS.UI.Hub" />

            WinJS.Resources.processAll();
            if (typeof session.hubScroll === "number") {
                hub.scrollPosition = session.hubScroll;
            }

            //WinJS.Binding.processAll(document.querySelector(".section_apps .top-image-row"), codeShow.Pages.Hub.featuredApp);
            //set app section featured app images (TODO: do this with binding instead)
            //var r = document.querySelector(".section_apps .top-image-row");
            //r.querySelector(".screenshot").src = codeShow.Pages.Hub.featuredApp.screenshots[0].url;
            //r.querySelector(".logo").src = codeShow.Pages.Hub.featuredApp.imageurl;

            page._addSearchFunctionality();

            //handle ad exceptions
            hubad.winControl.onErrorOccurred = function (sender, evt) {
                //if there's no internet connection at all then use a local adtile
                if (evt.errorCode === "NetworkConnectionFailure") {
                    var img = document.createElement("img");
                    img.src = "/images/adtile_codeplex.png";
                    sender.element.appendChild(img);
                    img.onclick = function () { launch("http://codeshow.codeplex.com"); };
                }

                //if there's internet connection but no ad was served then fetch a custom tile from WAMS/blob storage
                else if (evt.errorCode === "NoAdAvailable") {
                    app.client.getTable("adTiles")
                        .where({ size: "300x600" })
                        .read()
                        .then(function (tiles) {
                            var randomAd = tiles
                                .takeRandom(1)[0];
                            if (randomAd) {
                                var img = document.createElement("img");
                                img.src = randomAd.imageUrl;
                                sender.element.appendChild(img);
                                img.onclick = function () { launch(randomAd.linkUrl); };
                            }
                            else {
                                sender.element.style.display = "none";
                            }
                        });
                }
            };

            this.updateLayout();
        },
        
        _addSearchFunctionality: function() {
            //focus on the search box when the users presses CTRL+E or starts typing
            var s = document.querySelector(".win-searchbox");
            s.addEventListener("querysubmitted", function (e) {
                WinJS.Navigation.navigate("/pages/demos/demos.html", { queryText: e.detail.queryText });
            });
            document.body.onkeypress = function (e) {
                if (e.ctrlKey && e.key == "e")
                    s.querySelector(".win-searchbox-input").focus();
            };
            s.winControl.focusOnKeyboardInput = true;
        }
    });

    function createNamespace() {
        WinJS.Namespace.define("codeShow.Pages.Hub", {
            pageDataLoaded: false,
            demosList: new WinJS.Binding.List(),
            teamList: new WinJS.Binding.List(),
            featuredApp: {},
            subFeaturedApps: new WinJS.Binding.List(),
            contributorList: new WinJS.Binding.List(),
            updateLayout: page.updateLayout,

            //converters
            Converters: {
                twitterHandleConverter: new WinJS.Binding.converter(function (value) {
                    return "@" + value;
                })
            },

            //commands
            Commands: {
                demoNavigate: util.markSupportedForProcessing(function (data) {
                    data.detail.itemPromise.then(function (item) {
                        nav.navigate("/pages/demo/demo.html", { demo: item.data, viewMode: "demo" });
                    });
                }),
                demosNavigate: util.markSupportedForProcessing(function () {
                    nav.navigate("/pages/demos/demos.html");
                }),
                teamMemberNavigate: util.markSupportedForProcessing(function () {
                    nav.navigate("/pages/teamMember/teamMember.html");
                }),
                appsNavigate: util.markSupportedForProcessing(function () {
                    nav.navigate("/pages/apps/apps.html");
                }),
                contributorNavigate: util.markSupportedForProcessing(function () {
                    nav.navigate("/pages/contributors/contributors.html");
                }),
                contributorsNavigate: util.markSupportedForProcessing(function () {
                    nav.navigate("/pages/contributors/contributors.html");
                })
            }
        });
    }
})();