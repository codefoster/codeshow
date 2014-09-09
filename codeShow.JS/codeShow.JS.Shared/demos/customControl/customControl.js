(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/customControl/customControl.html", {
        ready: function (element, options) {
            //create a green box imperatively
            var div = document.createElement("div");
            new CustomControlNamespace.BigBox(div,{backgroundColor:'green'});
            element.querySelector("section[role=main]").appendChild(div);
        }
    });

    WinJS.Namespace.define("CustomControlNamespace", {
        BigBox: WinJS.Class.define(function (element, options) {

            //This is the div-element of the control
            if (!element) { throw "element must be provided"; }
            options = options || {};

            //Store the element
            this._element = element;
            this._backgroundColor = options.backgroundColor;
            this._createVisualTree();
            WinJS.Utilities.addClass(this._element, "win-disposable");

        }, {

            /// <field type="HTMLElement" domElement="true" hidden="true" locid="CustomControlNamespace.BigBox.element">
            ///   Gets the DOM element that hosts the control.
            /// </field>
            element: {
                get: function () { return this._element; }
            },
            _createVisualTree: function () {
                var child = document.createElement("div");
                child.style.height = "200px";
                child.style.width = "200px";
                child.style.padding = "10px";
                child.style.color = "white";
                child.style.backgroundColor = this._backgroundColor;
                child.innerText = "BigBox control";
                this._element.appendChild(child);
            },
            dispose: function () {
                // do any cleanup necessary to avoid memory leaks
                WinJS.Utilities.disposeSubTree(this._element);
                this._element = null;
            }
        })
    });

})();
