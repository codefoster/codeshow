using CodeShow.CS.Shared;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace CodeShow.CS
{
    public sealed partial class ItemDetailGridControl : UserControl
    {
        public GridLength LeftMargin
        {
            set
            {
                this.leftMargin.Width = value;
            }
        }
        public ItemDetailGridControl()
        {
            this.InitializeComponent();
            this.mainGridView.ItemsSource = new DemoItemsData().DemoItems;
            this.mainGridView.ItemClick += this.Grid_Tapped;
        }

        public ItemDetailGridControl(string searchString)
        {
            this.InitializeComponent();
            DemoItemsData data = new DemoItemsData();
            data.SetSearchFilter(searchString);
            this.mainGridView.ItemsSource = data.DemoItems;
            this.mainGridView.ItemClick += this.Grid_Tapped;
        }

        private void Grid_Tapped(object sender, ItemClickEventArgs e)
        {
            var item = (GridItem)e.ClickedItem;
            MainPage.Current.Frame.Navigate(typeof(CodeShowPage), item);
        }
    }
}
