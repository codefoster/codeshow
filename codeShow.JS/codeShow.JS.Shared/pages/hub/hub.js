(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;

    WinJS.UI.Pages.define("/pages/hub/hub.html", {
        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        ready: function (element, options) {
            var hub = element.querySelector(".hub").winControl;
            hub.onheaderinvoked = function (args) {
                args.detail.section.onheaderinvoked(args);
            };
            hub.onloadingstatechanged = function (args) {
                if (args.srcElement === hub.element && args.detail.loadingState === "complete") {
                    hub.onloadingstatechanged = null;
                }
            }

            ////this was an attempt to limit the demos on the hub to the first 10, but it's not working
            ////get the first 10 demos
            //this.demosList = new WinJS.Binding.List(Data.demos
            //    .splice()
            //    .sort(function (a, b) {
            //        return (!b.dateCreated || new Date(a.dateCreated) > new Date(b.dateCreated) ? -1 : 1);
            //    })
            //    .slice(0, 10)); 
        },

        //DEMOS
        demosList: Data.demos,
        demosHeaderInvoke: util.markSupportedForProcessing(function (args) {
            nav.navigate("/pages/demos/demos.html", { });
        }),
        demoItemInvoke: util.markSupportedForProcessing(function (args) {
            args.detail.itemPromise.then(function (demo) {
                nav.navigate("/pages/demo/demo.html", { demo: demo });
            });
        }),

        //CONTRIBUTORS
        contributorsList: Data.contributors.createSorted(function (a, b) {
            //sort contributors by their twitter handle
            a = a.twitterHandle.toLowerCase();
            b = b.twitterHandle.toLowerCase();
            if (a == b) return 0;
            else if (a > b) return 1;
            else return -1;
        }),
        contributorItemInvoke: util.markSupportedForProcessing(function (args) {
            args.detail.itemPromise.then(function (demo) {
                //TODO: link to their URL
            });
        }),

        unload: function () {
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },
    });
})();