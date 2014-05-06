using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml;

namespace CodeShow.CS.Shared
{
    public sealed partial class StaticResourceDemo : UserControl
    {
        public StaticResourceDemo()
        {
            this.InitializeComponent();
        }

        // BeginCutPaste
        private void Button_Tapped(
            object sender, 
            Windows.UI.Xaml.Input.TappedRoutedEventArgs e)
        {
            Style myButtonStyle = 
                (Style)this.StaticResourceControl.Resources["MyButtonStyle"];
            foreach (Setter setter in myButtonStyle.Setters)
            {
                // All the values created in XAML got stored in this object
                // Use the debugger to examine them.
                string value = setter.Value.ToString();
            }
        }

        // EndCutPaste
    }
}
