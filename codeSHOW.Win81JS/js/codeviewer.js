(function () {
    
    WinJS.Namespace.define("codeShow.UI", {
        codeViewer: WinJS.Class.define(function (element, options) {
 
                //This is the div-element of the control
                if (!element) {
                    throw "element must be provided";
                }
                options = options || {};

                //Store the element
                this._element = element;

                this._createVisualTree();

 
            }, {
 
                /// <field type="HTMLElement" domElement="true" hidden="true" 
                ///     locid="codeShow.UI.codeViewer.element">
                /// Gets the DOM element that hosts the codeViewer.
                /// </field>
                element: {
                    get: function () { return this._element; }
                },
                _createVisualTree: function () {
                    var child = document.createElement("div");
                    child.className = "codeContent";
                    child.style.overflowY = "auto";
                    child.style.height = "auto";
                    child.style.width = "100%";
                    child.style.backgroundColor = "blue";
                    this._element.appendChild(child);
                }
            } 
        ) 
    });

})();
