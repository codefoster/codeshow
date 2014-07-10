// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/snappoints/snappoints.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var a = [];
            for (var i = 0; i <= 100; i++) {
                a.push({ number: i });
            }
            var aList = new WinJS.Binding.List(a);

            list.winControl.itemDataSource = aList.dataSource;
            list.winControl.itemTemplate = template;
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
