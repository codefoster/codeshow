(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/customControl/customControl.html", {
        ready: function (element, options) {

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

        }, {

            /// <field type="HTMLElement" domElement="true" hidden="true" locid="CustomControlNamespace.BigBox.element">
            ///   Gets the DOM element that hosts the control.
            /// </field>
            element: {
                get: function () { return this._element; }
            },
            _createVisualTree: function () {
                var child = document.createElement("div");
                child.style.height = "400px";
                child.style.width = "400px";
                child.style.padding = "10px";
                child.style.color = "white";
                child.style.backgroundColor = this._backgroundColor;
                child.innerText = "BigBox control";
                this._element.appendChild(child);
            }
        })
    });

})();
