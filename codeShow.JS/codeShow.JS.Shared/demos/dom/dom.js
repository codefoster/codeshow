// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var container;

    function addItem(item) {
        
        item.addEventListener("click", function () {
            item.className = "item";
            item.innerText = "item [li clicked]";
            var newItem = document.createElement("li");
            newItem.innerText = "item";
            item.parentElement.appendChild(newItem);
            addItem(newItem);
        });
    }

    WinJS.UI.Pages.define("/demos/dom/dom.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            var pbutton = document.getElementById("domButton");
            var title = document.getElementById("domTitle");

            container = domContainer;

            title.addEventListener("click", function() {
                title.innerText = "DOM [span innerText]";
                title.classList.add("item");
            });

            pbutton.addEventListener("click", function () {
                var txt = pbutton.innerText;
                container.removeChild(pbutton);
                var btn = document.createElement("button");
                btn.textContent = txt;
                container.appendChild(btn);
                var newDiv = document.createElement("div");
                newDiv.innerHTML = "<ul><li>item</li></ul>";
                container.appendChild(newDiv);
                var domItem = newDiv.querySelector("li");
                addItem(domItem);
            });

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
