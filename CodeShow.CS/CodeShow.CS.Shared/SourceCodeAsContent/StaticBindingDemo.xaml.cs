using System.ComponentModel;
using Windows.UI.Xaml.Controls;

namespace CodeShow.CS.Shared
{
    public sealed class BindingProperties : INotifyPropertyChanged
    {
        private string textBlockText = "Text Block Text";
        public string TextBlockText
        {
            get
            {
                return this.textBlockText;
            }
            set
            {
                this.textBlockText = value;
                OnPropertyChanged("TextBlockText");
            }
        }

        public BindingProperties()
        {
            this.TextBlockText = "Binding Text";
        }

        public event PropertyChangedEventHandler PropertyChanged;
        private void OnPropertyChanged(string info)
        {
            PropertyChangedEventHandler handler = PropertyChanged;
            if (handler != null)
            {
                handler(this, new PropertyChangedEventArgs(info));
            }
        }
    }
    public sealed partial class StaticBindingDemo : UserControl
    {
        public StaticBindingDemo()
        {
            this.InitializeComponent();
        }

        private void Button_Tapped(object sender, Windows.UI.Xaml.Input.TappedRoutedEventArgs e)
        {
            Button button = sender as Button;
            BindingProperties bp = (BindingProperties)button.DataContext;
            if (bp.TextBlockText == "Text Block Text")
            {
                bp.TextBlockText = "Toggled Text";
            }
            else
            {
                bp.TextBlockText = "Text Block Text";
            }

        }
    }
}
