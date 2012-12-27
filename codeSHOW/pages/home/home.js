/// <reference path="///Microsoft.WinJS.1.0/js/wl.js" />

(function () {
    "use strict";
    var _element, _options;
    var demosListView;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            _element = element;
            _options = options;
            demosListView = q("#demosListView", element).winControl;
            this.bindList();
            this.layoutList();
            this.applySettings();
            WinJS.Namespace.define("codeSHOW.Pages.Home", {
                applySettings: this.applySettings //allow the settings pane to call this to change the tile color
            });
        },
        unload: function () {
            app.sessionState.homeScrollPosition = demosListView.scrollPosition;
            q("#appbar").winControl.sticky = false;
            q("#appbar").winControl.hide();
            Ocho.AppBar.set();
        },
        updateLayout: function (element, viewState, lastViewState) {
            this.layoutList(viewState);
        },
        bindList: function () {
            var demosList = app.demosList;
            var options = _options || {};
            if (options.queryText)
                demosList = demosList.createFiltered(function (i) {
                    var result = i.keywords && i.keywords.split(" ").contains(options.queryText);
                    return result;
                });
            demosList.forEach(function (item) {
                item.onchangefct = WinJS.Utilities.markSupportedForProcessing(function (e) {
                    new Windows.UI.Popups.MessageDialog("hi").showAsync();
                });
            });

            demosListView.itemDataSource = demosList.dataSource;
            demosListView.selectionMode = "single";
            demosListView.oniteminvoked = function (e) {
                e.detail.itemPromise.then(function (x) {
                    var location = format("/demos/{0}/{0}.html", x.data.key);
                    Windows.UI.ViewManagement.ApplicationView.tryUnsnap();
                    WinJS.Navigation.navigate(location, x.data);
                });
            };
            if (app.sessionState.homeScrollPosition)
                demosListView.scrollPosition = app.sessionState.homeScrollPosition;
            
            demosListView.onselectionchanged = this.setCommandVisibility;
            
            Ocho.AppBar.set({
                buttons: [{ id: "seeTheCode", label: "See the Code", section: "selection", icon: "page2", click: seeTheCodeClick, hidden: true }],
                addClass: "win-ui-dark"
            });
            this.setCommandVisibility();

            function seeTheCodeClick(e) {
                //get the selected item and pass the demo name in to the navigate function below
                var demo;
                q("#demosListView").winControl.selection.getItems().then(function (selectedItems) {
                    demo = selectedItems[0].data;
                });
                WinJS.Navigation.navigate("/pages/demoCode/demoCode.html", demo);
            }
        },

        layoutList: function () {
            //set the ListView item template to a function so that it can switch based on view state
            demosListView.itemTemplate = this.selectItemTemplate;

            //use items that look good in a long, tall list layout for snapped view
            if (Windows.UI.ViewManagement.ApplicationView.value == Windows.UI.ViewManagement.ApplicationViewState.snapped) {
                demosListView.layout = new WinJS.UI.ListLayout();
            }

                //use items that look good as tiles for the full/fill/portrait views
            else {
                demosListView.layout = new WinJS.UI.GridLayout();
                demosListView.layout.groupInfo = function () { return { enableCellSpanning: true, cellWidth: 250, cellHeight: 125 }; };
            }
        },
        selectItemTemplate: function (itemPromise) {
            return itemPromise.then(function (item) {
                //get the right item template, render the item data into it and return the result
                var itemTemplate;
                var i = item.index;
                if (Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
                    itemTemplate = q("#snappedItemTemplate", _element);
                }
                else if (item.data.key === "ad") {
                    //return ad template
                    itemTemplate = q("#adItemTemplate", _element);
                }
                else {
                    itemTemplate = q("#itemTemplate", _element);
                }
                return itemTemplate.winControl.render(item.data);

            });
        },
        setCommandVisibility: function () {
            var appbar = q("#appbar").winControl;
            if (demosListView.selection.count() > 0) {
                appbar.sticky = true;
                appbar.show();
                appbar.showCommands(["seeTheCode"]);
            } else {
                appbar.sticky = false;
                appbar.hide();
                appbar.hideCommands(["seeTheCode"]);
            }
        },
        applySettings: function () {
            document.styleSheets.toArray()
                .first(function (ss) { return ss.href.endsWith("home.css"); })
                .rules.toArray()
                .first(function (r) { return r.selectorText == ".homepage #demosListView .win-item"; })
                .style.backgroundColor = appdata.roamingSettings.values["tileColor"];
        }


    });





})();
