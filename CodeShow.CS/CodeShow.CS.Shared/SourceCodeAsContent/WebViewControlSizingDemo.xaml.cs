using System;
using Windows.UI.Xaml.Controls;

namespace CodeShow.CS
{
    public sealed partial class WebViewControlSizingDemo : UserControl
    {
         private const string html = "<body bgcolor='#76A045'><font color='#ffffff' " +
        "face='segoe ui'><h4>Highlights</h4><p>Portable power bank charges nearly " +
        "any mobile device thanks to its USB and micro USB ports, and its lanyard " +
        "secures to your bag</p><p></p>\n\n<h4>Aduro PowerUp 2000Mah Portable Backup " +
        "Battery</h4>\n\n<ul>\n<li>Portable USB power bank</li>\n<li>2000mAh " +
        "rechargeable battery</li>\n<li>For indoor and outdoor use</li>\n<li>Great " +
        "for travel or staying on the couch as long as possible</li>\n<li>Works with " +
        "most mobile USB devices</li>\n<li>Standard and micro USB " +
        "ports</li>\n<li>Lanyard with keyring</li>\n<li>Condition: " +
        "new</li>\n<li>Dimensions: 3\"x7\"x1\"</li>\n<li>Weight: " +
        "4oz.</li>\n</ul>\n\n<hr/>\n\n<p><i>To complete your Goods order, simply " +
        "purchase this Groupon and provide your name and shipping address.\n<br/><br/>" +
        "\nPlease check the Fine Print for this deal’s estimated delivery timeframe. " +
        "We work with thousands of brands to deliver the amazing selection you see on " +
        "Groupon Goods, and this shipping window ensures we have enough time to " +
        "coordinate with our suppliers to get you the products you love.\n<br/><br/>" +
        "\nFor questions pertaining to this deal, click the Ask a Question button below. " +
        "For post-purchase inquiries, please contact <a href=\"http://gr.pn/zmfvIT\">" +
        "Groupon customer support</a>.\n<br/><br/>\nView the " +
        "<a href=\"http://gr.pn/1gH6Dm7\">Groupon Goods FAQ</a> to learn more.\n</i>" +
        "</p></font></body>";
        public WebViewControlSizingDemo()
        {
            this.InitializeComponent();
            this.myWebView.DOMContentLoaded += myWebView_DOMContentLoaded;
            this.myWebView.NavigateToString(WebViewControlSizingDemo.html);
        }

        private async void myWebView_DOMContentLoaded(WebView sender, 
            WebViewDOMContentLoadedEventArgs args)
        {
            var widthString = 
                await this.myWebView.InvokeScriptAsync("eval", 
                    new[] { "document.body.scrollHeight.toString()" });
            double height = Convert.ToDouble(widthString);
            this.myWebView.Height = height;
        }
    }
}
