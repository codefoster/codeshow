(function () {
    "use strict";

    var subscriptions;

    function searchWikipedia(term) {
        var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + window.encodeURI(term);
        return WinJS.xhr({ url: url }).toObservable().select(function (response) {
            return JSON.parse(response.response)[1];
        });
    }

    function initializeSearchCharm() {
        var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();

        // Hook into the suggestions requested event and then create the deferral and anything else we need
        var suggestions = Rx.Observable
            .fromEvent(searchPane, 'suggestionsrequested')
            .select(function (e) {
                return {
                    deferral: e.request.getDeferral(),
                    queryText: e.queryText,
                    searchSuggestions: e.request.searchSuggestionCollection
                };
            })
            .throttle(1000)
            .select(function (e) {
                return searchWikipedia(e.queryText).select(function (r) {
                    return {
                        results: r,
                        searchSuggestions: e.searchSuggestions,
                        deferral: e.deferral
                    };
                });
            })
            .switchLatest();

        // Subscribe, append results and set the deferral to complete
        var subscription = suggestions.subscribe(function (e) {
            e.searchSuggestions.appendQuerySuggestions(e.results);
            e.deferral.complete();
        }, function (err) {
            console.log(err);
        });

        subscriptions.add(subscription);
    }

    function initializeAutoComplete() {

        // Get input/output
        var input = document.querySelector('#rxInput');
        var list = new WinJS.Binding.List();
        var results = document.querySelector('#results').winControl;
        results.itemDataSource = list.dataSource;

        // Handle Key ups
        var keyup = Rx.Observable.fromEvent(input, 'keyup')
            .select(function (ev) {
                return ev.currentTarget.value;
            })
            .where(function (text) {
                return text.length > 2;
            })
            .throttle(500)
            .distinctUntilChanged();

        // Handle query
        var searcher = keyup
            .select(function (text) { return searchWikipedia(text); })
            .switchLatest();

        // Subscribe to results and handle the cancellation
        var subscription = searcher.subscribe(
            function (data) {
                list.splice(0, list.length);
                data.forEach(function (item) {
                    list.push({ text: item });
                });
            },
            function (err) {
                list.splice(0, list.length);
                list.push({ text: err });
            });

        subscriptions.add(subscription);
    }

    function initialize() {
        subscriptions = new Rx.CompositeDisposable();
        initializeAutoComplete();
        initializeSearchCharm();
    }

    function teardown() {
        subscriptions.dispose();
    }

    WinJS.UI.Pages.define("/demos/autocomplete/autocomplete.html", {
        ready: function (element, options) {
            initialize();
        },
        
        unload: function () {
            teardown();
        }
    });
})();
