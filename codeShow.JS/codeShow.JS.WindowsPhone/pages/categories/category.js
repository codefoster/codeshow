(function () {
	"use strict";

	WinJS.UI.Pages.define("/pages/categories/category.html", {
		ready: function (element, options) {
			var title = document.getElementById('category');
			if (title)
				title.textContent = options.category.group;

			var listView = element.querySelector(".itemslist").winControl;

			var filtered = Data.demos.filter(function (d) { return d.group === options.category.group; });

			listView.itemDataSource = new WinJS.Binding.List(filtered).dataSource;
			listView.oniteminvoked = this.demoInvoked.bind(this);

		},
		demoInvoked: function (eventInfo) {
			eventInfo.detail.itemPromise.then(function (demo) {
				nav.navigate("/pages/demo/demo.html", { demo: demo.data });
			});
		}


	});

})();
