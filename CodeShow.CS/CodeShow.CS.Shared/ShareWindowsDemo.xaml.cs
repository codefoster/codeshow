using Windows.ApplicationModel.DataTransfer;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Input;

namespace CodeShow.CS.Shared
{
    public sealed partial class ShareWindowsDemo : UserControl
    {
        public ShareWindowsDemo()
        {
            this.InitializeComponent();
        }

        private void Button_Tapped(object sender, TappedRoutedEventArgs e)
        {
            DataTransferManager.ShowShareUI();
        }
    }
}
