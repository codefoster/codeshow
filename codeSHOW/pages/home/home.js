(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            Ocho.AppBar.defineAppBarButtons(document.getElementById("appbar"), [
                //{ id: 'groupby', label: 'Group By', click: groupBy, icon: 'U+E130', section: 'global', extraClass: 'x', tooltip: 'Group By' },
                //{ id: 'delete', label: 'Delete', click: deleteClick, icon: 'add', section: 'selection', extraClass: 'singleSelect', tooltip: 'tooltip', options: { onSelectionOf: q("#list") } }
            ]);

            function groupBy() {
                new Windows.UI.Popups.MessageDialog("hi").showAsync();
            }

            Windows.ApplicationModel.Package.current.installedLocation.getFolderAsync("pages")
                .then(function (pagesFolder) {
                    return pagesFolder.getFoldersAsync();
                })
                .done(function (folders) {
                    var promises = [];
                    folders
                        //TODO: see what the sort function is expecting and fix this
                        //.sort(function (a,b) { return a.name < b.name; })
                        .filter(function(f) { return f.name !== "home" })
                        .forEach(function (f) {
                            promises.push(WinJS.xhr({ url: "/pages/" + f.name + "/" + f.name + ".html", responseType: "document" })
                                .then(function (xhr) {
                                    demos.push({
                                        key: f.name,
                                        name: q(".pagetitle", xhr.response).innerText,
                                        tags: "html",
                                        group: "html",
                                        difficulty: 0
                                    });
                                }));
                        });
                    WinJS.Promise.join(promises).then(function () {
                        var colors = ["#0098ab", "#0070a9", "#d9532c", "#a400ac", "#009086", "#5838b4", "#ae193e", "#2c86ee", "#009c00"];
                        demos.forEach(function (i) {
                            i.tileColor = "gray"; //colors[Math.floor(Math.random() * colors.length)];
                            i.click = function () {
                                var location = "/pages/" + i.key + "/" + i.key + ".html";
                                WinJS.Navigation.navigate(location, i);
                            };
                            i.click.supportedForProcessing = true;
                        });

                        var demosListGrouped = new WinJS.Binding.List(demos).createGrouped(
                            function (i) { return i.group; },
                            function (i) { return i.group; }
                        );

                        var list = q("#list").winControl;
                        list.itemDataSource = demosListGrouped.dataSource;
                        list.itemTemplate = q("#itemTemplate");
                        //list.groupDataSource = demosListGrouped.groups.dataSource;
                        //list.groupHeaderTemplate = q("#headerTemplate");

                    });
                });
        }
    });
})();
