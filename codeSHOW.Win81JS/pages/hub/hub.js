(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;

    // Get the groups used by the data-bound sections of the Hub.
    var section2Group = Data.resolveGroupReference("group1");
    var section5Group = Data.resolveGroupReference("group6");

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
                    //build team list
                    Data.team.forEach(function (member) {
                        codeSHOW.Pages.Hub.teamList.push(member);
                    });
                    
                    //build demos list
                    Data.demos.forEach(function (demo) {
                        codeSHOW.Pages.Hub.demosList.push(demo);
                    });

                    //mark data as loaded
                    codeSHOW.Pages.Hub.pageDataLoaded = true;
                });
        },
    });

    
    function createHeaderNavigator(group) {
        return util.markSupportedForProcessing(function (args) {
            nav.navigate("/pages/section/section.html", { title: this.header, groupKey: group.key });
        });
    }

    function createItemNavigator(group) {
        var items = Data.getItemsFromGroup(group);
        return util.markSupportedForProcessing(function (args) {
            var item = Data.getItemReference(items.getAt(args.detail.itemIndex));
            nav.navigate("/pages/item/item.html", { item: item });
        });
    }

    function getItemsDataSourceFromGroup(group) {
        return Data.getItemsFromGroup(group).dataSource;
    }

    
    WinJS.Namespace.define("codeSHOW.Pages.Hub", {
        pageDataLoaded: false,

        teamList: new WinJS.Binding.List(),
        demosList: new WinJS.Binding.List(),

        Converters: {
            twitterHandleConverter: new WinJS.Binding.converter(function(value) {
                return "@" + value;
            })
        }
    });

    //eventually do away with this namespace in favor of the one above
    WinJS.Namespace.define("HubPage", {
        //section2DataSource: getTeamAsync(),
        section2HeaderNavigate: createHeaderNavigator(section2Group),
        section2ItemNavigate: createItemNavigator(section2Group),
        section5DataSource: getItemsDataSourceFromGroup(section5Group),
        demosNavigate: function () {
            return util.markSupportedForProcessing(function () {
                nav.navigate("/pages/demos/demos/html");
            });
        }
    });
})();