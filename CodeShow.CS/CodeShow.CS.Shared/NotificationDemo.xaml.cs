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
    public sealed partial class NotificationDemo : UserControl
    {
        public NotificationDemo()
        {
            this.InitializeComponent();
        }

        // BeginCutPaste
        private void Button_Tapped(object sender, TappedRoutedEventArgs e)
        {
            if (!String.IsNullOrEmpty(this.notificationTextBox.Text))
            {
                string xml =
                    "<tile><visual version=\"2\">" +
                        "<binding template=\"TileSquare150x150Text04\" " +
                           "fallback=\"TileSquareText04\" branding=\"None\">" +
                                "<text id=\"1\">" +
                                    this.notificationTextBox.Text +
                           "</text></binding>" +
                       "</visual></tile>";
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(xml);
                TileNotification tileNotification = new TileNotification(doc);
                TileUpdater tileUpdater = TileUpdateManager.CreateTileUpdaterForApplication();
                tileUpdater.Update(tileNotification);
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
