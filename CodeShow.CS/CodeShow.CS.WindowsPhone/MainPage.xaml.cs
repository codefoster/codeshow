using CodeShow.CS.Shared;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234238

namespace CodeShow.CS
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        public static MainPage Current;
        public MainPage()
        {
            this.InitializeComponent();
            ItemDetailGridControl gridControl = new ItemDetailGridControl();
            gridControl.LeftMargin = new GridLength(55);
            this.mainGrid.Children.Add(gridControl);
            MainPage.Current = this;
        }

        /// <summary>
        /// Invoked when this page is about to be displayed in a Frame.
        /// </summary>
        /// <param name="e">Event data that describes how this page was reached.  The Parameter
        /// property is typically used to configure the page.</param>
        protected async override void OnNavigatedTo(NavigationEventArgs e)
        {
            // This loads the search terms but which aren't needed for the phone
            // but it also loads the object names that are needed for syntax highlighting.
            DemoItemsData di = new DemoItemsData();
            await di.GetSearchTerms();
        }
    }
}
