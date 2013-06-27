(function () {
	"use strict";

	var NULL = null;

	var CodeViewer = WinJS.Class.define(
		// Constructor
		function (codePath, codeViewerElement) {
			var that = this;
			that._codeContentElement = codeViewerElement;
		    that._loadFile(codePath); //
		},
	    
		// Instances members
		{
			_element: NULL,
			_codePath: NULL,
			_codeContentElement: NULL,
            _container: NULL,
			_loadFile: function (filePath) {
				var that = this;

			    WinJS.xhr({ url: filePath }).then(
			        function(result) {
			            that._codeContentElement.style.color = "";

			            var extStartIndex = filePath.lastIndexOf(".") + 1,
			                extLength = filePath.length - extStartIndex,
			                brushName = filePath.substr(extStartIndex, extLength),
			                escapedHTML = result.responseText.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
			                config = {
			                    brush: brushName,
			                    light: true
			                },

                            code = "<pre>" + escapedHTML + "</pre>";

			            that._container = document.createElement("div");
			            that._container.classList.add("codeContainer");
			            //config["quick-code"] = false;

			            that._copyLink = document.createElement("a");
			            that._copyLink.innerHTML = "<i>copy the code</i>";
			            that._copyLink.onclick = function () {
			                window.clipboardData.setData("Text", result.responseText);
			            };

			            that._container.innerHTML = code;
			            that._codeContentElement.appendChild(that._container);

			            SyntaxHighlighter.highlight(config, q("pre", that._codeContentElement));

			            q(".codeViewer", that._container.parentElement).appendChild(that._copyLink);
			            q(".codeViewer", that._container.parentElement).style.textAlign = "right";

			        },
			        function(error) {
			            that._codeContentElement.style.color = "red";
			            that._codeContentElement.innerText = error;
			        }
			    );
			},
			_onChange: function (filePath) {
				this._loadFile(filePath);
			},
			copyCode: function () {
				var dataPackage = new Windows.ApplicationModel.DataTransfer.DataPackage();
				dataPackage.requestedOperation = Windows.ApplicationModel.DataTransfer.DataPackageOperation.copy;
				dataPackage.setText(this._codeContentElement.innerText);
				Windows.ApplicationModel.DataTransfer.Clipboard.setContent(dataPackage);
			}
		}
	);

	WinJS.UI.Pages.define("/pages/codeViewer/codeViewer.html", {
		ready: function (element, options) {
			if (options) {
				this._codePath = options.codePath;
				var that = this;

				if (this.codeViewer == null) {
				    this.codeViewer = new CodeViewer(this._codePath, element);
				}
            }
		}
	});
})();