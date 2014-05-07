using Windows.UI.Xaml.Controls;

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
            this.mainGrid.Children.Add(new ItemDetailGridControl());
            MainPage.Current = this;
        }

        public void RefreshGridWithSearchResults(string searchString)
        {
            ItemDetailGridControl gc = new ItemDetailGridControl(searchString);
            this.mainGrid.Children.Remove(this.mainGrid.Children[0]);
            this.mainGrid.Children.Add(gc);
        }

        public void GoBack()
        {

        }
    }
}
