using Windows.Graphics.Display;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace CodeShow.CS.Shared
{
    // BeginCutPaste
    public sealed partial class DisplayOrientationDemo : UserControl 
    {
        public string BoxOneText { get; set; }
        public string BoxTwoText { get; set; }

        public DisplayOrientationDemo()
        {
            this.InitializeComponent();
            this.BoxOneText = "TextBlock One";
            this.BoxTwoText = "TextBlock Two";
            this.SideGrid.DataContext = this;
            this.GoToStoryboardState();
            DisplayInformation.GetForCurrentView().OrientationChanged += OnOrientationChanged;
        }

        private void OnOrientationChanged(DisplayInformation sender, object args)
        {
            this.GoToStoryboardState();
        }

        /// <summary>
        /// Invoked to determine the name of the visual state that corresponds to an application
        /// display orientation.
        /// </summary>
        private void GoToStoryboardState()
        {
            string displayOrientation = "Landscape";
            if (DisplayInformation.GetForCurrentView().CurrentOrientation == DisplayOrientations.Portrait ||
                DisplayInformation.GetForCurrentView().CurrentOrientation == DisplayOrientations.PortraitFlipped)
            {
                displayOrientation = "Portrait";
            }

            VisualStateManager.GoToState(this, displayOrientation, false);
        }
    }

    // EndCutPaste
}
