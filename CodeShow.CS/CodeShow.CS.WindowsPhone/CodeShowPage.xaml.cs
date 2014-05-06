using CodeShow.CS.Common;
using Windows.Graphics.Display;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;

namespace CodeShow.CS
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class CodeShowPage : Page
    {
        private NavigationHelper navigationHelper;
        private ObservableDictionary defaultViewModel = new ObservableDictionary();

        /// <summary>
        /// NavigationHelper is used on each page to aid in navigation and 
        /// process lifetime management
        /// </summary>
        public NavigationHelper NavigationHelper
        {
            get { return this.navigationHelper; }
        }

        /// <summary>
        /// This can be changed to a strongly typed view model.
        /// </summary>
        public ObservableDictionary DefaultViewModel
        {
            get { return this.defaultViewModel; }
        }

        public CodeShowPage()
        {
            this.InitializeComponent();

            this.navigationHelper = new NavigationHelper(this);
            this.navigationHelper.LoadState += navigationHelper_LoadState;
            Windows.Phone.UI.Input.HardwareButtons.BackPressed += HardwareButtons_BackPressed;

            if (this.BottomAppBar != null)
            {
                this.BottomAppBar.SizeChanged += AppBar_SizeChanged;
            }
        }
        /// <summary>
        /// Check app bar size changed event and reserve space for app bar
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        void AppBar_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            // Reserve space on the page when an opaque AppBar.
            bool reserveAppBarSpace = this.BottomAppBar.Opacity >= 1.0
                && this.BottomAppBar.Visibility == Visibility.Visible;

            if (reserveAppBarSpace)
            {
                Thickness defaultPageMargin = default(Thickness);
                switch (DisplayInformation.GetForCurrentView().CurrentOrientation)
                {
                    case DisplayOrientations.Landscape:
                        defaultPageMargin.Right = this.BottomAppBar.Width;
                        break;
                    case DisplayOrientations.LandscapeFlipped:
                        defaultPageMargin.Left = this.BottomAppBar.Width;
                        break;
                    case DisplayOrientations.Portrait:
                        defaultPageMargin.Bottom = this.BottomAppBar.Height;
                        break;
                }

                this.Margin = defaultPageMargin;
            }
        }

        #region NavigationHelper registration

        /// The methods provided in this section are simply used to allow
        /// NavigationHelper to respond to the page's navigation methods.
        /// 
        /// Page specific logic should be placed in event handlers for the  
        /// <see cref="GridCS.Common.NavigationHelper.LoadState"/>
        /// and <see cref="GridCS.Common.NavigationHelper.SaveState"/>.
        /// The navigation parameter is available in the LoadState method 
        /// in addition to page state preserved during an earlier session.


        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            navigationHelper.OnNavigatedTo(e);
        }

        protected override void OnNavigatedFrom(NavigationEventArgs e)
        {
            navigationHelper.OnNavigatedFrom(e);
        }

        #endregion

        void HardwareButtons_BackPressed(object sender, Windows.Phone.UI.Input.BackPressedEventArgs e)
        {
            MainPage.Current.Frame.GoBack();
            e.Handled = true;
        }
    }
}
