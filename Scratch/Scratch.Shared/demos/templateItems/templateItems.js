(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/templateItems/templateItems.html", {
        ready: function (element, options) {
            var flexbox = document.querySelector("section[role=main] > #alphabet");

            loadPage();
            
            reset.onclick = function (e) {
                flexbox.querySelector("div").forEach(function (d) { removeItem(d); });
                loadPage();
            };

            function loadPage() {

                var letters = [];
                for (var i = 65; i <= 90; i++) letters.push(String.fromCharCode(i));

                letters.forEach(function (l) {
                    var e = document.createElement("div");
                    var template = template.winControl;
                    template.render(l, e).then(function (item) {
                        item.onclick = function (e) { removeItem(e.target); };
                        var addToList = WinJS.UI.Animation.createAddToListAnimation(item, flexbox.querySelector("div"));
                        flexbox.insertBefore(item);
                        addToList.execute();
                    });
                });

            }

            function removeItem(item) {
                var removeFromList = WinJS.UI.Animation.createDeleteFromListAnimation(item, flexbox.querySelector("div"));
                flexbox.removeChild(item);
                removeFromList.execute();
            }

        }
    });
    

})();
