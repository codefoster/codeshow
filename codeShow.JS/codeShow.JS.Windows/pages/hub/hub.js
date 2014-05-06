(function () {
    "use strict";

    var page;
    WinJS.UI.Pages.define("/pages/hub/hub.html", {
        init: function (element, options) {
            var start = new Date().getTime();
            console.info("hub.js init start");
            page = this;

            //make select portions of this page's functionality available outside the page
            page._createNamespace();

            if (!codeShow.Pages.Hub.pageDataLoaded)
                return Data.loaded
                    .then(function () {

                        //build the demos list
                        codeShow.Pages.Hub.demosList.push.apply(codeShow.Pages.Hub.demosList, 
                            Data.demos
                                .sort(function (a, b) {
                                    return (!b.dateCreated || new Date(a.dateCreated) > new Date(b.dateCreated) ? -1 : 1);
                                })
                                .take(12)
                        );

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
                    })
                    .then(function () {
                        var now = new Date().getTime();
                        console.info("hub.js init done (" + ((now - start) / 1000) + " seconds)");
                    });
        },

        ready: function (element, options) {
            var start = new Date().getTime();
            console.info("hub.js ready start");
            //if (options && options.message) {
            //    Windows.UI.Popups.MessageDialog(options.message).showAsync().then(function () {
            //        options.message = null;
            //    });
            //}
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

            ////bind apps section
            ////TODO: try to get this to work more elegantly by binding... couldn't get it to work
            //if (codeShow.Pages.Hub.featuredApp && codeShow.Pages.Hub.featuredApp.screenshots[0]) {
            //    document.querySelector(".section_apps .top-image-row .screenshot img").src = codeShow.Pages.Hub.featuredApp.screenshots[0].url;
            //    document.querySelector(".section_apps .top-image-row .logo").style.backgroundColor += codeShow.Pages.Hub.featuredApp.tileBackgroundColor;
            //    document.querySelector(".section_apps .top-image-row .logo img").src = codeShow.Pages.Hub.featuredApp.imageurl;
            //}

            var now = new Date().getTime();
            console.info("hub.js ready done (" + ((now - start) / 1000) + " seconds)");
        },

        processed: function () {
            var start = new Date().getTime();
            console.info("hub.js processed start");
            //when data is finished loading then hide the extended splash screen
            splash.classList.add("hidden");

            var now = new Date().getTime();
            console.info("hub.js processed done (" + ((now - start) / 1000) + " seconds)");
        },

        unload: function () {
            //TODO: reenable and test
            //session.hubScroll = document.querySelector(".hub").winControl.scrollPosition;
        },

        updateLayout: function (element) {
        },

        _hubReady: function (hub) {
            var start = new Date().getTime();
            console.info("hub.js _hubReady start");
            /// <param name="hub" type="WinJS.UI.Hub" />

            //WinJS.Resources.processAll();
            //if (typeof session.hubScroll === "number") {
            //    hub.scrollPosition = session.hubScroll;
            //}

            //WinJS.Binding.processAll(document.querySelector(".section_apps .top-image-row"), codeShow.Pages.Hub.featuredApp);
            //set app section featured app images (TODO: do this with binding instead)
            //var r = document.querySelector(".section_apps .top-image-row");
            //r.querySelector(".screenshot").src = codeShow.Pages.Hub.featuredApp.screenshots[0].url;
            //r.querySelector(".logo").src = codeShow.Pages.Hub.featuredApp.imageurl;

            page._addSearchFunctionality();

            page.updateLayout();

            var now = new Date().getTime();
            console.info("hub.js _hubReady done (" + ((now - start) / 1000) + " seconds)");
        },

        _addSearchFunctionality: function () {
            //focus on the search box when the users presses CTRL+E or starts typing
            var s = document.querySelector(".win-searchbox");
            s.winControl.onquerysubmitted = function (e) {
                WinJS.Navigation.navigate("/pages/demos/demos.html", { queryText: e.detail.queryText });
            };
            document.body.onkeypress = function (e) {
                if (e.ctrlKey && e.key == "e")
                    s.querySelector(".win-searchbox-input").focus();
            };
            s.winControl.focusOnKeyboardInput = true;
        },

        _createNamespace: function () {
            WinJS.Namespace.define("codeShow.Pages.Hub", {
                pageDataLoaded: false,
                demosList: new WinJS.Binding.List(),
                featuredApp: {},
                subFeaturedApps: new WinJS.Binding.List(),
                updateLayout: page.updateLayout,

                //converters
                Converters: {
                    twitterHandleConverter: new WinJS.Binding.converter(function (value) {
                        return (value ? "@" + value : "");
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
                    contributorNavigate: util.markSupportedForProcessing(function () {
                        nav.navigate("/pages/contributor/contributor.html");
                    }),
                    appsNavigate: util.markSupportedForProcessing(function () {
                        nav.navigate("/pages/apps/apps.html");
                    })
                }
            });
        }
    });


})();