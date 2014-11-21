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

            if (!WinJS.Utilities.isPhone) this._addSearchFunctionality();
            //condition the demos list for platform particulars
            this.demosList = this.demosList.createSorted(function (a, b) { return (a.title > b.title ? 1 : (a.title < b.title ? -1 : 0)); });
            if (WinJS.Utilities.isPhone) {
                this.demosList = this.demosList.createGrouped(function (d) { return d.group; }, function (d) { return { group: d.group }; });
            }
            else {
                //var c = 0, limit = 10;
                //this.demosList = this.demosList.createFiltered(function (d) { return (++c < limit); });
            }
        },
		//CATEGORIES
		categoriesList: Data.categories,

		categoryItemInvoke: util.markSupportedForProcessing(function (args) {
			args.detail.itemPromise.then(function (cat) {
				nav.navigate("/pages/categories/category.html", { category: cat.data });
			});
		}),

        //DEMOS
        demosList: Data.demos,
        demosHeaderInvoke: util.markSupportedForProcessing(function (args) {
            nav.navigate("/pages/demos/demos.html", { });
        }),
        demoItemInvoke: util.markSupportedForProcessing(function (args) {
            args.detail.itemPromise.then(function (demo) {
                nav.navigate("/pages/demo/demo.html", { demo: demo.data });
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

    });
})();