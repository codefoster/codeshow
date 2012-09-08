(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/templateItems2/templateItems2.html", {
        ready: function (element, options) {
            var flexbox = document.querySelector("section[role=main] > div");
            document.querySelector("section[role=main] > p").onclick = function (e) {
                q(".templateItems2 section[role=main] > div > div").forEach(function(i) {
                    i.classList.add("after");
                });
            };

            var letters = [];
            for (var i = 65; i <= 90; i++) letters.push(String.fromCharCode(i));

            letters.forEach(function (l) {

                var e = document.createElement("div");
                var template = document.querySelector("#template").winControl;
                template.render({ name: l }, e).then(function (item) {
                    //var addToList = WinJS.UI.Animation.createAddToListAnimation(item, flexbox);
                   
                    var i = flexbox.insertBefore(item);
                    i.className = "before";
                    //i.onhover = function(e) { i.classList.add("test"); };
                    //addToList.execute();
                });
            });

        }
    });
})();
