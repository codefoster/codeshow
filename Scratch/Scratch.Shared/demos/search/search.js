(function () {
    "use strict";

    var p, osr, oqr;
    
    WinJS.UI.Pages.define("/demos/search/search.html", {
        ready: function (element, options) {
            p = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();
            
            //save existing search functionality so we can restore it when we're done
            osr = p.onsuggestionsrequested;
            oqr = p.onquerysubmitted;
            
            //add a few suggestions
            p.onsuggestionsrequested = function (args) {
                args.request.searchSuggestionCollection.appendQuerySuggestion("orange");
                args.request.searchSuggestionCollection.appendQuerySuggestion("banana");
                args.request.searchSuggestionCollection.appendQuerySuggestion("apple");
            };
            
            //let windows make some suggestions from your music library
            //var s = new Windows.ApplicationModel.Search
            //    .LocalContentSuggestionSettings();
            //s.locations.append(Windows.Storage.KnownFolders.musicLibrary);
            //p.setLocalContentSuggestionSettings(s);
            
            p.onquerysubmitted = function (args) {
                document.querySelector(".search h2").innerText = args.queryText;
            };
            
        },

        unload: function () {
            //restore existing search functionality that this page overrided
            p.onsuggestionsrequested = osr;
            p.onquerysubmitted = oqr;
        }
    });
})();
