using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace CodeShowCsXaml
{
    public sealed partial class AnimationStoryboardDemo : UserControl
    {
        public AnimationStoryboardDemo()
        {
            this.InitializeComponent();
            VisualStateManager.GoToState(this, "Running", false);
        }
    }
}
