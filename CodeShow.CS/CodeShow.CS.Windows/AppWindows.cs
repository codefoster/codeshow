using CodeShow.CS.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Windows.ApplicationModel.Activation;
using Windows.ApplicationModel.Search;
using Windows.Foundation;
using Windows.Storage;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace CodeShow.CS
{
    sealed partial class App : Application
    {
        private List<string> searchTerms;
        public async Task EnableSearch()
        {
            this.searchTerms = await new DemoItemsData().GetSearchTerms();
            this.searchTerms = this.searchTerms.Distinct().ToList();
            this.searchTerms.Sort();
            
            Nullable<bool> demoEnabled = (Nullable<bool>)ApplicationData.Current.RoamingSettings.Values[SettingsFlyoutHelper.DemoSettingStorageString];
            if (demoEnabled == null)
            {
                ApplicationData.Current.RoamingSettings.Values[SettingsFlyoutHelper.DemoSettingStorageString] = false;
            }

            int count = 0;
            bool repeat = true;
            while (repeat)
            {
                try
                {
                    count++;
                    Windows.ApplicationModel.Search.SearchPane searchPane = SearchPane.GetForCurrentView();

                    // Register QuerySubmitted handler for the window at window 
                    // creation time and only registered once
                    // so that the app can receive user queries at any time.
                    searchPane.QuerySubmitted +=
                        new TypedEventHandler<SearchPane,
                            SearchPaneQuerySubmittedEventArgs>(this.OnQuerySubmitted);
                    SearchPane.GetForCurrentView().ShowOnKeyboardInput = true;
                    SearchPane.GetForCurrentView().SuggestionsRequested
                        += OnSuggestionsRequested;
                    repeat = false;
                }
                catch (Exception)
                {

                }
            }
        }

        /// <summary>
        /// This is the handler for Search activation.
        /// </summary>
        /// <param name="args">This is the list of arguments for 
        /// search activation, including QueryText and Language</param>
        protected override void OnSearchActivated(SearchActivatedEventArgs args)
        {
            this.EnsureMainPageActivated(args, null);
            if (args.QueryText != "")
            {
                // display search results.
                Frame rootFrame = Window.Current.Content as Frame;
                rootFrame.Navigate(typeof(MainPage));
                MainPage.Current.RefreshGridWithSearchResults(args.QueryText);
            }
        }

        private void OnQuerySubmitted(object sender, 
            SearchPaneQuerySubmittedEventArgs args)
        {
            if (MainPage.Current != null)
            {
                Frame rootFrame = Window.Current.Content as Frame;
                rootFrame.Navigate(typeof(MainPage));
                MainPage.Current.RefreshGridWithSearchResults(args.QueryText);
            }
        }

        /// <summary>
        /// Once the main windows is created we register the search functions.
        /// </summary>
        /// <param name="args"></param>
        protected override void OnWindowCreated(WindowCreatedEventArgs args)
        {

        }

        /// <summary>
        /// Adds up to 5 search suggestions.
        /// </summary>
        /// <param name="sender">Search Pane.</param>
        /// <param name="args">Contains the QueryText.</param>
        private void OnSuggestionsRequested(SearchPane sender, 
            SearchPaneSuggestionsRequestedEventArgs args)
        {
            int count = 0;
            string searchText = args.QueryText.ToLower();
            foreach (string term in this.searchTerms)
            {
                if (term.ToLower().IndexOf(searchText) == 0)
                {
                    count++;
                    args.Request.SearchSuggestionCollection.AppendQuerySuggestion(term);
                    if (++count == 5)
                    {
                        return;
                    }
                }
            }
        }
    }
}
