using CodeShow.CS.Common;
using CodeShow.CS.Shared;
using System;
using Windows.ApplicationModel.DataTransfer;
using Windows.Foundation;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;

namespace CodeShow.CS
{
    /// <summary>
    /// A basic page that provides characteristics common to most applications.
    /// </summary>
    public sealed partial class CodeShowPage : Page
    {

        private NavigationHelper navigationHelper;
        private ObservableDictionary defaultViewModel = new ObservableDictionary();

        /// <summary>
        /// This can be changed to a strongly typed view model.
        /// </summary>
        public ObservableDictionary DefaultViewModel
        {
            get { return this.defaultViewModel; }
        }

        /// <summary>
        /// NavigationHelper is used on each page to aid in navigation and 
        /// process lifetime management
        /// </summary>
        public NavigationHelper NavigationHelper
        {
            get { return this.navigationHelper; }
        }

        public CodeShowPage()
        {
            this.InitializeComponent();
            this.navigationHelper = new NavigationHelper(this);
            this.navigationHelper.LoadState += navigationHelper_LoadState;
            this.navigationHelper.SaveState += navigationHelper_SaveState;
        }


        /// <summary>
        /// Preserves state associated with this page in case the application is suspended or the
        /// page is discarded from the navigation cache.  Values must conform to the serialization
        /// requirements of <see cref="SuspensionManager.SessionState"/>.
        /// </summary>
        /// <param name="sender">The source of the event; typically <see cref="NavigationHelper"/></param>
        /// <param name="e">Event data that provides an empty dictionary to be populated with
        /// serializable state.</param>
        private void navigationHelper_SaveState(object sender, SaveStateEventArgs e)
        {
        }

        #region NavigationHelper registration
        // BeginCutPaste

        private DataTransferManager dataTransferManager;
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            navigationHelper.OnNavigatedTo(e);

            // Register the current page as a share source.
            this.dataTransferManager = DataTransferManager.GetForCurrentView();
            this.dataTransferManager.DataRequested += this.OnDataRequested;
        }

        protected override void OnNavigatedFrom(NavigationEventArgs e)
        {
            navigationHelper.OnNavigatedFrom(e);

            // Unregister the current page as a share source.
            this.dataTransferManager.DataRequested -= this.OnDataRequested;
        }

        private void OnDataRequested(DataTransferManager sender, DataRequestedEventArgs e)
        {
            // A deferral is NOT needed here but this is for demo
            // purposes. Once you have offically requested the deferral
            // you can do async operations.
            DataRequestDeferral deferal = e.Request.GetDeferral();

            try
            {
                DataPackage requestData = e.Request.Data;
                requestData.Properties.Title = this.currentItem.Title;
                requestData.Properties.Description = this.currentItem.Description;
                requestData.SetStorageItems(this.storageItems);
            }
            finally
            {
                deferal.Complete();
            }
        }

        // EndCutPaste

        #endregion
    }
}
