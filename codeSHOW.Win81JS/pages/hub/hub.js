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

            // TODO: Initialize the hub sections here.
            if (!codeSHOW.Pages.Hub.pageDataLoaded)
                Data.loaded.then(function () {
                    //build demos list
                    //TODO: add logic to only take a select number of demos (8 perhaps?)
                    Data.demos.forEach(function (demo) {
                        codeSHOW.Pages.Hub.demosList.push(demo);
                    });

                    //build team list
                    Data.team.forEach(function (member) {
                        codeSHOW.Pages.Hub.teamList.push(member);
                    });
                    
                    //mark data as loaded
                    codeSHOW.Pages.Hub.pageDataLoaded = true;
                });
        },
    });
    
    WinJS.Namespace.define("codeSHOW.Pages.Hub", {
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