using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Input;

#if WINDOWS_APP
using Windows.ApplicationModel.Search;
#endif

namespace CodeShow.CS.Shared
{
    public sealed partial class PropertyBindingDemo : UserControl
    {
        public PropertyBindingDemo()
        {
            this.InitializeComponent();
        }

        private void Button_Tapped(object sender, TappedRoutedEventArgs e)
        {
            sliderOneWayDataSource.Value = 10;
            sliderTwoWayDataSource.Value = 50;
            sliderOneTimeDataSource.Value = 75;
        }

        private void editBox_GotFocus(object sender, Windows.UI.Xaml.RoutedEventArgs e)
        {
#if WINDOWS_APP
            SearchPane.GetForCurrentView().ShowOnKeyboardInput = false;
#endif
        }

        private void editBox_LostFocus(object sender, Windows.UI.Xaml.RoutedEventArgs e)
        {
#if WINDOWS_APP
            SearchPane.GetForCurrentView().ShowOnKeyboardInput = true;
#endif
        }
    }
}
