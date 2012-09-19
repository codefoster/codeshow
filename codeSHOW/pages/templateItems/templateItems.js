(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/templateItems/templateItems.html", {
        ready: function (element, options) {
            var flexbox = document.querySelector("section[role=main] > div");
            document.querySelector("section[role=main] > p").onclick = function (e) {
                WinJS.Navigation.navigate("/pages/templateItems/templateItems.html");
            };

            var letters = [];
            for (var i = 65; i <= 90; i++) letters.push(String.fromCharCode(i));

            letters.forEach(function (l) {
                var e = document.createElement("div");
                var template = document.querySelector("#template").winControl;
                template.render({ name: l }, e).then(function (item) {
                    var addToList = WinJS.UI.Animation.createAddToListAnimation(item, flexbox);
                    flexbox.insertBefore(item);
                    addToList.execute();
                });
            });

        }
    });
})();
