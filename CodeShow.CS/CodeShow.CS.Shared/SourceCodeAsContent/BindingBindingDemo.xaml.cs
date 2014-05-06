using Windows.UI.Xaml.Controls;

namespace CodeShow.CS.Shared
{
    public class BindingItem
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public BindingItem ()
        {
            this.Title = "Bound Title";
            this.Description = "Bound Description";
        }
    }
    public sealed partial class BindingBindingDemo : UserControl
    {
        public BindingItem MyBindingItem
        {
            get
            {
                return new BindingItem();
            }
        }
        public BindingBindingDemo()
        {
            this.InitializeComponent();
        }
    }
}
