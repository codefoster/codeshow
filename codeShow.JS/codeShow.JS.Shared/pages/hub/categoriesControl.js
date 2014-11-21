(function () {
	"use strict";

	WinJS.Namespace.define("Controls", {
		CategoriesControl: WinJS.UI.Pages.define("/pages/hub/categoriesControl.html", {
			ready: function (element, options) {
				options = options || {};

				var listView = element.querySelector(".itemslist").winControl;

				listView.itemDataSource = options.dataSource.dataSource;
				listView.layout = options.layout;
				listView.oniteminvoked = options.oniteminvoked;
			}
		})
	});
})();