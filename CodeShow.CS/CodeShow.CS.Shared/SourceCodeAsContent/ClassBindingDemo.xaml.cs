using Windows.UI.Xaml.Controls;

namespace CodeShow.CS.Shared
{
    public sealed partial class ClassBindingDemo : UserControl
    {
        // BeginCutPaste
        public string TextBlockText { get; set; }
        public ClassBindingDemo()
        {
            this.InitializeComponent();
            this.TextBlockText = "Bound Text";
            this.parentGrid.DataContext = this;
        }
        // EndCutPaste
    }
}
