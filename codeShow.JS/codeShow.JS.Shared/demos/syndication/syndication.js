(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/syndication/syndication.html", {
        ready: function (element, options) {
            var client = new Windows.Web.Syndication.SyndicationClient();
            var uri = new Windows.Foundation.Uri("http://codefoster.com/rss");
            client.retrieveFeedAsync(uri).done(function (feed) {
                feed.items.forEach(function (i) {
                    out.innerHTML += i.title.text + "<br/>";
                });
            });
        }
    });
})();
