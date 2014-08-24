(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;

    // Get the groups used by the data-bound sections of the Hub.
    var section2Group = codeShow.Demos.hub.data.resolveGroupReference("group1");
    var section5Group = codeShow.Demos.hub.data.resolveGroupReference("group6");

    WinJS.UI.Pages.define("/demos/hub/hub.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
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

            // TODO: Initialize the page here.
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            session.hubScroll = document.querySelector(".hub").winControl.scrollPosition;
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },

        _hubReady: function (hub) {
            /// <param name="hub" type="WinJS.UI.Hub" />

            WinJS.Resources.processAll();
            if (typeof session.hubScroll === "number") {
                hub.scrollPosition = session.hubScroll;
            }

            // TODO: Initialize the hub sections here.
        },
    });

    function createHeaderNavigator(group) {
        return util.markSupportedForProcessing(function (args) {
            nav.navigate("/pages/section/section.html", { title: this.header, groupKey: group.key });
        });
    }

    function createItemNavigator(group) {
        var items = codeShow.Demos.hub.data.getItemsFromGroup(group);
        return util.markSupportedForProcessing(function (args) {
            var item = codeShow.Demos.hub.data.getItemReference(items.getAt(args.detail.itemIndex));
            nav.navigate("/pages/item/item.html", { item: item });
        });
    }

    function getItemsDataSourceFromGroup(group) {
        return codeShow.Demos.hub.data.getItemsFromGroup(group).dataSource;
    }

    WinJS.Namespace.define("HubPage", {
        section2DataSource: getItemsDataSourceFromGroup(section2Group),
        section2HeaderNavigate: createHeaderNavigator(section2Group),
        section2ItemNavigate: createItemNavigator(section2Group),
        section5DataSource: getItemsDataSourceFromGroup(section5Group),
        section5ItemNavigate: createItemNavigator(section5Group)
    });
})();