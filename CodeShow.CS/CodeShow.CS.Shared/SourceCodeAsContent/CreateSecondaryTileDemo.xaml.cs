using System;
using Windows.UI.StartScreen;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Input;

namespace CodeShow.CS.Shared
{
    public sealed partial class CreateSecondaryTileDemo : UserControl
    {
        public CreateSecondaryTileDemo()
        {
            this.InitializeComponent();
        }

        // BeginCutPaste
        private async void Button_Tapped(object sender, TappedRoutedEventArgs e)
        { 
            Uri square150x150Logo = new Uri("ms-appx:///Assets/Logo.png");
            Uri square30x30Logo = new Uri("ms-appx:///Assets/SmallLogo.png");
            SecondaryTile secondaryTile = new SecondaryTile("MyTileId",
                                                            this.tileName.Text,
                                                            "LaunchedFromMyTile",
                                                            square150x150Logo,
                                                            TileSize.Square150x150);

            secondaryTile.VisualElements.Square30x30Logo = square30x30Logo;
            secondaryTile.VisualElements.ShowNameOnSquare150x150Logo = true;
            secondaryTile.VisualElements.ForegroundText = ForegroundText.Dark;
            await secondaryTile.RequestCreateAsync();
        }

        // EndCutPaste
    }
}
