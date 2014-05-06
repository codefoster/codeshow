using CodeShowCsXaml.Common;
using CodeShowCsXaml.Shared;
using System;
using System.Collections.ObjectModel;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The User Control item template is documented at http://go.microsoft.com/fwlink/?LinkId=234236

namespace CodeShowCsXaml
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

        private void Grid_Tapped(object sender, ItemClickEventArgs e)
        {
            var item = (GridItem)e.ClickedItem;
            MainPage.Current.Frame.Navigate(typeof(ItemDetailPage), item);
        }
    }
}
