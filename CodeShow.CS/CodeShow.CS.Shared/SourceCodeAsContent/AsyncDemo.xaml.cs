using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Windows.Data.Xml.Dom;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Input;

namespace CodeShow.CS.Shared
{
    public sealed partial class AsyncDemo : UserControl
    {
        public AsyncDemo()
        {
            this.InitializeComponent();
            this.urlTextBox.Text = "http://www.reddit.com/.rss";
        }

        public async Task<XmlDocument> GetXmlDocumentFromUrl(string url)
        {
            XmlDocument dom = null;
            try
            {
                Uri dataUri = new Uri(url);
                HttpClient client = new HttpClient();
                client.Timeout = TimeSpan.FromSeconds(20);
                HttpResponseMessage response = await client.GetAsync(dataUri);
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    dom = new XmlDocument();
                    StreamReader reader = new StreamReader(await response.Content.ReadAsStreamAsync());
                    string xml = reader.ReadToEnd();
                    dom.LoadXml(xml);
                }
            }
            catch (Exception exception)
            {
                this.xmlDisplay.Text = "Failed getting info from: " + url + "  Error msg: " + exception.Message;
            }

            return dom;
        }

        private async void Button_Tapped(object sender, TappedRoutedEventArgs e)
        {
            XmlDocument doc = await this.GetXmlDocumentFromUrl(this.urlTextBox.Text);
            if (doc != null)
            {
                this.xmlDisplay.Text = doc.GetXml();
            }
        }
    }
}
