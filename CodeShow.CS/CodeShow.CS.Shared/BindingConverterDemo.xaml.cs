using System;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Data;

namespace CodeShow.CS.Shared
{
    public sealed partial class BindingConverterDemo : UserControl
    {
        public DateTime CurrentDateTime { get; set; }
        public BindingConverterDemo()
        {
            this.InitializeComponent();
            this.CurrentDateTime = DateTime.Now;
            this.monthTextBlock.DataContext = this;
        }
    }

    public class DateToStringConverter : IValueConverter
    {
        public object Convert(object value, Type targetType,
            object parameter, string language)
        {
            return ((DateTime)value).ToString("dd-MMM-yyyy");
        }

        // ConvertBack is not implemented for a OneWay binding.
        public object ConvertBack(object value, Type targetType,
            object parameter, string language)
        {
            throw new NotImplementedException();
        }
    }
}
