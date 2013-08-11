(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/hub/hub.html", {
        ready: function (element, options) {
            var hub = element.querySelector(".hub").winControl;
            hub.onloadingstatechanged = function (args) {
                if (args.srcElement === hub.element && args.detail.loadingState === "complete") {
                    this._hubReady(hub);
                    hub.onloadingstatechanged = null;
                }
            }.bind(this);

            hub.onheaderinvoked = function (args) {
                args.detail.section.onheaderinvoked(args);
            };

        },

        unload: function () {
            session.hubScroll = document.querySelector(".hub").winControl.scrollPosition;
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />
        },

        _hubReady: function (hub) {
            /// <param name="hub" type="WinJS.UI.Hub" />

            WinJS.Resources.processAll();
            if (typeof session.hubScroll === "number") {
                hub.scrollPosition = session.hubScroll;
            }

            if (!codeShow.Pages.Hub.pageDataLoaded)
                Data.loaded
                    .then(function () {
                        //when data is finished loading then hide the extended splash screen
                        splash.classList.add("hidden");

                        //build demos list
                        Data.demos
                            .sort(function (a,b) {
                                return (a.title < b.title ? -1 : 1);
                            })
                            //.take(20)
                            .forEach(function (demo) {
                                codeShow.Pages.Hub.demosList.push(demo);
                            });

                        //build team list
                        Data.team.forEach(function (member) {
                            codeShow.Pages.Hub.teamList.push(member);
                        });
                    
                        //mark data as loaded
                        codeShow.Pages.Hub.pageDataLoaded = true;
                });
        },
    });
    
    WinJS.Namespace.define("codeShow.Pages.Hub", {
        pageDataLoaded: false,
        demosList: new WinJS.Binding.List(),
        teamList: new WinJS.Binding.List(),
        contributorList: new WinJS.Binding.List(),

        //converters
        Converters: {
            twitterHandleConverter: new WinJS.Binding.converter(function(value) {
                return "@" + value;
            })
        },

        //commands
        Commands: {
            demoNavigate: util.markSupportedForProcessing(function (data) {
                data.detail.itemPromise.then(function(item) {
                    nav.navigate("/pages/demo/demo.html", item.data);
                });
            }),
            demosNavigate: util.markSupportedForProcessing(function () {
                nav.navigate("/pages/demos/demos.html");
            }),
            teamMemberNavigate: util.markSupportedForProcessing(function() {
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
})();