/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="../../js/ocho.js" />
/// <reference path="///Microsoft.WinJS.1.0/js/wl.js" />
/// <reference path="/js/default.js" />

(function () {
    "use strict";
    var element, options;
    var demosListView;
    var adTimer;
    var AD_REFRESH_RATE = 32; //refresh every 32 seconds seems to be better than 30
    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (e, o) {
            element = e;
            options = o;
            demosListView = q("#demosListView", element).winControl;
            this.bindList();
            this.layoutList();
            this.applySettings();
            WinJS.Namespace.define("codeSHOW.Pages.Home", {
                applySettings: this.applySettings //allow the settings pane to call this to change the tile color
            });
            Windows.ApplicationModel.Search.SearchPane.getForCurrentView().showOnKeyboardInput = true;
            adTimer = setInterval(this._refreshAd, AD_REFRESH_RATE * 1000);

        },
        _refreshAd: function () {
            //refresh ad
            if (q(".adTile") && q(".adTile").winControl) {
                var ad = q(".adTile").winControl;
                ad.refresh();
            }
            
            setInterval(this._refreshAd, AD_REFRESH_RATE * 1000);
        },
        unload: function () {
            app.sessionState.homeScrollPosition = demosListView.scrollPosition;
            q("#appbar").winControl.sticky = false;
            q("#appbar").winControl.hide();
            Ocho.AppBar.set();
            Windows.ApplicationModel.Search.SearchPane.getForCurrentView().showOnKeyboardInput = false;
        },
        updateLayout: function (e, viewState, lastViewState) {
            this.layoutList(viewState);
        },
        bindList: function () {
            var demosList = app.demosList;
            var o = options || {};
            if (o.queryText)
                demosList = demosList.createFiltered(function (i) {
                    var containsOptions = { behavior: "contains", caseSensitive: "false" };
                    var x = i.description.contains(o.queryText, { caseSensitive: false });
                    return i.key && i.key.split(" ").contains(o.queryText, containsOptions)
                        || i.name && (i.name.contains(o.queryText, { caseSensitive: false }) || i.name.split(" ").contains(o.queryText, containsOptions))
                        || i.keywords && i.keywords.split(" ").contains(o.queryText, containsOptions)
                        || i.description && (i.description.contains(o.queryText, { caseSensitive: false }) || i.description.split(" ").contains(o.queryText, containsOptions));
                });

            demosListView.itemDataSource = demosList.dataSource;
            demosListView.loadingBehavior = "incremental";
            demosListView.selectionMode = "single";
            demosListView.oniteminvoked = function (e) {
                e.detail.itemPromise.then(function (x) {
                    if (x.data.key != "ad") { //'ad' is the embedded advertisement and should not navigate
                        var location = format("/demos/{0}/{0}.html", x.data.key);
                        Windows.UI.ViewManagement.ApplicationView.tryUnsnap();
                        WinJS.Navigation.navigate(location, x.data);
                    }
                });
            };

            //TODO: look at why this causes weird behavior. Ad near beginning of listview doesn't load
            demosListView.onloadingstatechanged = function () {
                if (app.sessionState.homeScrollPosition && demosListView.loadingState == "viewPortLoaded") {
                    demosListView.scrollPosition = app.sessionState.homeScrollPosition;
                    app.sessionState.homeScrollPosition = null;
                }

                //rotate in custom ads (from WAMS) if there are not pubcenter ads
                if (q(".adTile") && q(".adTile").winControl) {
                    q(".adTile").winControl.onErrorOccurred = function (sender, evt) {

                        //if there's no internet connection at all then use a local adtile
                        if (evt.errorCode === "NetworkConnectionFailure") {
                            var img = document.createElement("img");
                            img.src = "/images/adtile_codeplex.png";
                            sender._domElement.appendChild(img);
                        }

                        //if there's internet connection but no ad was served then fetch a custom tile from WAMS/blob storage
                        else if (evt.errorCode === "NoAdAvailable") {
                            app.client.getTable("adTiles").read().then(function (adTiles) {
                                var randomAd = adTiles.takeRandom(1)[0];
                                var img = document.createElement("img");
                                img.src = randomAd.imageUrl;
                                sender._domElement.appendChild(img);
                            });
                        }
                    };
                }
            };

            demosListView.onselectionchanged = this.setCommandVisibility;

            Ocho.AppBar.set({
                buttons: [{ id: "seeTheCode", label: "See the Code", section: "selection", icon: "page2", click: seeTheCodeClick, hidden: true }],
                addClass: "win-ui-dark"
            });
            this.setCommandVisibility();

            function seeTheCodeClick() {
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
                if (Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped)
                    itemTemplate = q("#snappedItemTemplate", element);
                else if (item.data.key === "ad") {
                    itemTemplate = q("#adItemTemplate", element);//return ad template
                }
                else
                    itemTemplate = q("#itemTemplate", element);
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
                .first(function (ss) { return ss.href && ss.href.endsWith("home.css"); })
                .rules.toArray()
                .first(function (r) { return r.selectorText == ".homepage #demosListView .win-item"; })
                .style.backgroundColor = appdata.roamingSettings.values["tileColor"];
        }


    });





})();
