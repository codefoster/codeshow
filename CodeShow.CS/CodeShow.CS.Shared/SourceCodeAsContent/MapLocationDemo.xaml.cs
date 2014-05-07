#if WINDOWS_APP
using Bing.Maps;
#endif

#if WINDOWS_PHONE_APP
using Windows.UI.Xaml.Controls.Maps;
#endif

using System;
using Windows.Foundation;
using Windows.Storage.Streams;
using Windows.UI;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Shapes;
using Windows.Devices.Geolocation;

namespace CodeShow.CS.Shared
{
    public sealed partial class MapLocationDemo : UserControl
    {
        public MapLocationDemo()
        {
            this.InitializeComponent();
            this.Loaded += this.OnLoaded;
        }

        private async void OnLoaded(object sender, RoutedEventArgs e)
        {
            Geolocator locator = new Geolocator();
            Geoposition pos = await locator.GetGeopositionAsync();

#if WINDOWS_PHONE_APP
            MapControl yourLocationMap = new MapControl();
            yourLocationMap.ZoomLevel = 16;
            yourLocationMap.Center = pos.Coordinate.Point;
            yourLocationMap.LandmarksVisible = true;

            /*
             * Un-comment this code to add an Icon
            MapIcon myIcon = new MapIcon();
            myIcon.Location = pos.Coordinate.Point;
            myIcon.NormalizedAnchorPoint = new Point(0.70, 0.5);
            myIcon.Title = "You are here";
            myIcon.Image = 
                RandomAccessStreamReference.CreateFromUri(
                     new Uri("ms-appx:///Assets/badge24.png"));
            yourLocationMap.MapElements.Add(myIcon);
             */

            Ellipse ellipse = new Ellipse();
            ellipse.Tapped += this.PushpinTapped;
            ellipse.Height = 36;
            ellipse.Width = 36;
            ellipse.StrokeThickness = 18;
            ellipse.Resources["Color"] = "Black";
            ellipse.Stroke = new SolidColorBrush(Colors.Black);
            yourLocationMap.Children.Add(ellipse);
            MapControl.SetLocation(ellipse, pos.Coordinate.Point);
            MapControl.SetNormalizedAnchorPoint(ellipse, new Point(1.0, 0.5));
             
            MapControl.SetLocation(yourLocationMap, pos.Coordinate.Point);
            this.mapBorder.Child = yourLocationMap;
#endif

#if WINDOWS_APP
            Map yourLocationMap = new Map();
            yourLocationMap.Credentials = 
                "Akh_f3lS3qEcqtwsJNaTCL_pTm1uaVTy4Nl4-9Ixeelyo9qo2DWn8adW4xcA_VIl";
            yourLocationMap.ZoomLevel = 16;
            Location loc =
                new Location(
                    pos.Coordinate.Point.Position.Latitude,
                    pos.Coordinate.Point.Position.Longitude);
            yourLocationMap.Center = loc;

            Pushpin pin = new Pushpin();
            pin.Tapped += this.PushpinTapped;
            pin.Resources["Color"] = "Black";
            pin.Background = new SolidColorBrush(Colors.Black);

            ToolTip tt = new ToolTip();
            tt.Content = "Ouch, please move your mouse.";
            ToolTipService.SetToolTip(pin, tt);

            Double lat = Convert.ToDouble(pos.Coordinate.Point.Position.Latitude);
            Double lng = Convert.ToDouble(pos.Coordinate.Point.Position.Longitude);
            Location lo = new Location(lat, lng);
            MapLayer.SetPosition(pin, lo);
            yourLocationMap.Children.Add(pin);

            this.mapBorder.Child = yourLocationMap;
#endif
        }

        private void PushpinTapped(object sender, TappedRoutedEventArgs e)
        {

            FrameworkElement fwe = sender as FrameworkElement;
            SolidColorBrush newBrush;
            if (fwe.Resources["Color"].ToString() == "Black")
            {
                fwe.Resources["Color"] = "Red";
                newBrush = new SolidColorBrush(Colors.Red);
            }
            else
            {
                fwe.Resources["Color"] = "Black";
                newBrush = new SolidColorBrush(Colors.Black);
            }

#if WINDOWS_APP
            Pushpin pin = fwe as Pushpin;
            pin.Background = newBrush;
#else
            Ellipse ellipse = fwe as Ellipse;
            ellipse.Stroke = newBrush;
#endif
        }
    }
}
