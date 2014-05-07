using System;
using Windows.Data.Xml.Dom;
using Windows.UI.Notifications;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Input;

#if WINDOWS_APP
using Windows.ApplicationModel.Search;
#endif

namespace CodeShow.CS.Shared
{
    public sealed partial class ToastDemo : UserControl
    {
        public ToastDemo()
        {
            this.InitializeComponent();
        }

        // BeginCutPaste
        private void Button_Tapped(object sender, TappedRoutedEventArgs e)
        {
            if (!String.IsNullOrEmpty(this.notificationTextBox.Text))
            {
                 string xml =
                "<toast><visual>" +
                    "<binding template=\"ToastText01\">" +
                        "<text id=\"1\">" +
                        this.notificationTextBox.Text +
                    "</text></binding>" +
                "</visual></toast>";
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(xml);
                ToastNotification toast = new ToastNotification(doc);
                ToastNotifier notifier = ToastNotificationManager.CreateToastNotifier();
                notifier.Show(toast);
            }
        }

        // EndCutPaste

        // Prevent the search pane from appearing when text is entered.
        private void notificationTextBox_GotFocus(object sender, Windows.UI.Xaml.RoutedEventArgs e)
        {
#if WINDOWS_APP
            SearchPane.GetForCurrentView().ShowOnKeyboardInput = false;
#endif
        }

        private void notificationTextBox_LostFocus(object sender, Windows.UI.Xaml.RoutedEventArgs e)
        {
#if WINDOWS_APP
            SearchPane.GetForCurrentView().ShowOnKeyboardInput = true;
#endif
        }
    }
}
