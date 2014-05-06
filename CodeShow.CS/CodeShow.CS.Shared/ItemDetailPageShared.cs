using CodeShow.CS.Common;
using CodeShow.CS.Shared;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Windows.Storage;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Input;

namespace CodeShow.CS
{
    public sealed partial class CodeShowPage : Page
    {
        private GridItem currentItem;
        private UserControl currentControl;
        private CodeShowControl codeShowControl = new CodeShowControl();
        private List<StorageFile> storageItems;
        private const string pathToSourceCode = @"SourceCodeAsContent\";
        private const string beginMinCode = "BeginCutPaste";
        private const string endMinCode = "EndCutPaste";
        private const string seeTheCode = "see the code";
        private const string seeTheDemo = "see the demo";
        private async void navigationHelper_LoadState(object sender, LoadStateEventArgs e)
        {
            this.currentItem = e.NavigationParameter as GridItem;
            this.pageTitle.Text = this.currentItem.Title;
            this.sampleLink.NavigateUri = this.currentItem.NavigationUrl;

            // Special case the app page for search.
            if (this.currentItem.ControlType.Name == "App")
            {
                this.currentControl = new SearchDemo();
            }
            else
            {
                this.currentControl = (UserControl)Activator.CreateInstance(this.currentItem.ControlType);
            }

            this.detailGrid.Children.Add(this.currentControl);
            this.CodeViewButton.Content = CodeShowPage.seeTheCode;

            this.storageItems = new List<StorageFile>();
            string xamlText = await this.GetFileText(CodeShowPage.pathToSourceCode + this.currentItem.ControlType.Name + ".xaml", true);
            string csText = await this.GetFileText(CodeShowPage.pathToSourceCode + this.currentItem.ControlType.Name + ".xaml.cs", true);

            if (!String.IsNullOrEmpty(this.currentItem.CsFileName))
            {
                if (!String.IsNullOrWhiteSpace(csText))
                {
                    csText += "\r\nAdditional code from " + this.currentItem.CsFileName + "\r\n\r\n";
                }

                csText += await this.GetFileText(CodeShowPage.pathToSourceCode + this.currentItem.CsFileName, true);
            }

            if (!String.IsNullOrEmpty(this.currentItem.XamlFileName))
            {
                if (!String.IsNullOrWhiteSpace(xamlText))
                {
                    xamlText += "\r\nAdditional code from " + this.currentItem.XamlFileName + "\r\n\r\n";
                }

                xamlText += await this.GetFileText(CodeShowPage.pathToSourceCode + this.currentItem.XamlFileName, true);
            }

            this.codeShowControl.ShowXamlText = xamlText;
            this.codeShowControl.ShowCsText = csText;
        }

        private async Task<string> GetFileText(string path, bool addToStorageItems = false)
        {
            var folder = Windows.ApplicationModel.Package.Current.InstalledLocation;
            var file = await folder.GetFileAsync(path);

            if (addToStorageItems)
            {
                this.storageItems.Add(file);
            }

            var readThis = await Windows.Storage.FileIO.ReadTextAsync(file);
            readThis = CodeShowPage.ExtractMinCode(readThis);
            return readThis;
        }

        public static string ExtractMinCode(string fullText)
        {
            string minCode = fullText;
            int indexStart = fullText.IndexOf(CodeShowPage.beginMinCode);
            if (indexStart != -1)
            {
                indexStart = fullText.IndexOf("\n", indexStart) + 1;
                int indexEnd = fullText.IndexOf(CodeShowPage.endMinCode);
                if (indexEnd != -1)
                {
                    indexEnd -= 5;
                    minCode = fullText.Substring(indexStart, indexEnd - indexStart);
                }
            }

            return minCode;
        }

        private void Button_Tapped(object sender, TappedRoutedEventArgs e)
        {
            if (this.CodeViewButton.Content.ToString().Contains("demo"))
            {
                this.CodeViewButton.Content = CodeShowPage.seeTheCode;
                this.detailGrid.Children.RemoveAt(0);
                this.codeShowControl.SetControl(this.currentControl, false);
                this.detailGrid.Children.Add(this.currentControl);
            }
            else
            {
                this.CodeViewButton.Content = CodeShowPage.seeTheDemo;
                this.detailGrid.Children.RemoveAt(0);
                this.detailGrid.Children.Add(this.codeShowControl);
                this.codeShowControl.SetControl(this.currentControl, true);
            }
        }
    }
}
