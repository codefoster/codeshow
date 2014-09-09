using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Windows.ApplicationModel.DataTransfer;
using Windows.UI;
using Windows.UI.Xaml;

namespace CodeShow.CS.Shared
{
    public class GridItem
    {
        public GridItem ()
        {
            this.XamlFileName = null;
            this.CsFileName = null;
            this.NavigationUrl = null;
        }

        public string Title { get; set; }
        public string Description { get; set; }
        public Type ControlType { get; set; }
        public Uri NavigationUrl { get; set; }

        // This adds the ability to specify other
        // files as the source code to show.
        public string XamlFileName { get; set; }
        public string CsFileName { get; set; }

    }
    public class DemoItemsData
    {
        private ObservableCollection<GridItem> mainGridItems = new ObservableCollection<GridItem>();
        public ObservableCollection<GridItem> DemoItems
        {
            get;
            set;
        }

        public async Task<string> ReadFileTextAsync(string filePath)
        {
            var folder = Windows.ApplicationModel.Package.Current.InstalledLocation;
            var file = await folder.GetFileAsync(filePath);
            var fileText = await Windows.Storage.FileIO.ReadTextAsync(file);
            return fileText;
        }

        public async Task<List<string>> GetSearchTerms()
        {
            string searchableText = null;
            const string pathToSourceCode = @"SourceCodeAsContent\";
            foreach (GridItem item in this.mainGridItems)
            {
                var fileText = await this.ReadFileTextAsync(pathToSourceCode + item.ControlType.Name + ".xaml");
                searchableText += CodeShowPage.ExtractMinCode(fileText);
                fileText = await this.ReadFileTextAsync(pathToSourceCode + item.ControlType.Name + ".xaml.cs");
                searchableText += CodeShowPage.ExtractMinCode(fileText);
            }

            const string  regularExpression = @"[^a-zA-Z]";
            searchableText = Regex.Replace(searchableText, regularExpression, " ");
            searchableText = Regex.Replace(searchableText, @"\s+", " ");
            //searchableText = searchableText.ToLower();

            string[] words = searchableText.Split(' ');

            // Now lets trim the set to just objects that we might care about.
            
            List<string> winRtObjectNames = new List<string>();
            Type rootType = typeof(TypeInfo);
            TypeInfo rootTypeInfo = typeof(TypeInfo).GetTypeInfo();
            Assembly assembly = rootType.GetTypeInfo().Assembly;
            foreach (TypeInfo type in assembly.DefinedTypes)
            {
                winRtObjectNames.Add(type.Name);
            }

            rootType = typeof(SyntaxHighlighter);
            rootTypeInfo = typeof(SyntaxHighlighter).GetTypeInfo();
            assembly = rootType.GetTypeInfo().Assembly;
            foreach (TypeInfo type in assembly.DefinedTypes)
            {
                winRtObjectNames.Add(type.Name);
            }

            rootType = typeof(Colors);
            rootTypeInfo = typeof(Colors).GetTypeInfo();
            assembly = rootType.GetTypeInfo().Assembly;
            foreach (TypeInfo type in assembly.DefinedTypes)
            {
                winRtObjectNames.Add(type.Name);
            }

            rootType = typeof(DependencyObject);
            rootTypeInfo = typeof(DependencyObject).GetTypeInfo();
            assembly = rootType.GetTypeInfo().Assembly;
            foreach (TypeInfo type in assembly.DefinedTypes)
            {
                winRtObjectNames.Add(type.Name);
            }

            rootType = typeof(DataRequestDeferral);
            rootTypeInfo = typeof(DependencyObject).GetTypeInfo();
            assembly = rootType.GetTypeInfo().Assembly;
            foreach (TypeInfo type in assembly.DefinedTypes)
            {
                winRtObjectNames.Add(type.Name);
            }

            winRtObjectNames = winRtObjectNames.Distinct().ToList();
            IEnumerable<string> wordList = new List<string>(words);
            IEnumerable<string> winrt = winRtObjectNames as IEnumerable<string>;
            IEnumerable<string> objectList = winrt.Intersect(wordList);

            SyntaxHighlighter.ObjectNames = new List<string>(objectList);

            return new List<string>(wordList);
        }

        public async void SetSearchFilter(string searchString)
        {
            searchString = searchString.ToLower();
            ObservableCollection<GridItem> searchResultRemoveList = new ObservableCollection<GridItem>();
            const string pathToSourceCode = @"SourceCodeAsContent\";
            foreach (GridItem item in this.mainGridItems)
            {
                var fileText = await this.ReadFileTextAsync(pathToSourceCode + item.ControlType.Name + ".xaml");
                fileText = CodeShowPage.ExtractMinCode(fileText);
                fileText = fileText.ToLower();
                if (!fileText.Contains(searchString))
                {
                    fileText = await this.ReadFileTextAsync(pathToSourceCode + item.ControlType.Name + ".xaml.cs");
                    fileText = CodeShowPage.ExtractMinCode(fileText); ;
                    fileText = CodeShowPage.ExtractMinCode(fileText);
                    fileText = fileText.ToLower();
                    if (!fileText.Contains(searchString))
                    {
                        searchResultRemoveList.Add(item);
                    }
                }
            }

            foreach (GridItem itemToBeRemoved in searchResultRemoveList)
            {
                this.DemoItems.Remove(itemToBeRemoved);
            }
        }

        public void ClearSearchFilter()
        {
            this.DemoItems = this.mainGridItems;
        }
        public DemoItemsData()
        {
            GridItem animationItem = new GridItem();
            animationItem.Title = "Animation";
            animationItem.Description = "Demonstrates how to use a Storyboard to animate an object.";
            animationItem.ControlType = typeof(AnimationStoryboardDemo);
            animationItem.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Animations-f758de70");
            this.mainGridItems.Add(animationItem);

            GridItem gridRowsAndColumns = new GridItem();
            gridRowsAndColumns.Title = "Grid Layout";
            gridRowsAndColumns.Description = "Demonstrates how to use rows and columns for object layout.";
            gridRowsAndColumns.ControlType = typeof(GridLayoutDemo);
            gridRowsAndColumns.NavigationUrl = new Uri("http://msdn.microsoft.com/en-us/library/windows/apps/dn495654.aspx");
            this.mainGridItems.Add(gridRowsAndColumns);

            GridItem displayOrientation = new GridItem();
            displayOrientation.Title = "Orientation";
            displayOrientation.Description = "Demonstrates how to change layout when display is rotated.";
            displayOrientation.ControlType = typeof(DisplayOrientationDemo);
            displayOrientation.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Display-Orientation-Sample-19a58e93");
            this.mainGridItems.Add(displayOrientation);

            GridItem textDemo = new GridItem();
            textDemo.Title = "Simple Text";
            textDemo.Description = "Demonstrates the TextBlock and RichTextBlock.";
            textDemo.ControlType = typeof(TextDemo);
            textDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/XAML-text-display-sample-2593ba0a");
            this.mainGridItems.Add(textDemo);

            GridItem scalingTextDemo = new GridItem();
            scalingTextDemo.Title = "Scaling Text";
            scalingTextDemo.Description = "Demonstrates scaling a TextBlock.";
            scalingTextDemo.ControlType = typeof(ScalingTextDemo);
            scalingTextDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Scaling-sample-cf072f4f");
            this.mainGridItems.Add(scalingTextDemo);

            GridItem staticResourceDemo = new GridItem();
            staticResourceDemo.Title = "StaticResource";
            staticResourceDemo.Description = "Demonstrates creating a StaticResource.";
            staticResourceDemo.ControlType = typeof(StaticResourceDemo);
            staticResourceDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Application-resources-and-cd0c6eaa");
            this.mainGridItems.Add(staticResourceDemo);

            GridItem itemsControlDemo = new GridItem();
            itemsControlDemo.Title = "ItemsControl";
            itemsControlDemo.Description = "Demonstrates binding a list to an ItemsControl.";
            itemsControlDemo.ControlType = typeof(ItemsControlDemo);
            itemsControlDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/GroupedGridView-77c59e8e");
            this.mainGridItems.Add(itemsControlDemo);

            GridItem propertyBindingDemo = new GridItem();
            propertyBindingDemo.Title = "Property Binding";
            propertyBindingDemo.Description = "Demonstrates binding one property to another.";
            propertyBindingDemo.ControlType = typeof(PropertyBindingDemo);
            propertyBindingDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Data-Binding-7b1d67b5");
            this.mainGridItems.Add(propertyBindingDemo);

            GridItem classBindingDemo = new GridItem();
            classBindingDemo.Title = "Class Binding";
            classBindingDemo.Description = "Demonstrates binding class to FrameworkElement and its children.";
            classBindingDemo.ControlType = typeof(ClassBindingDemo);
            classBindingDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Data-Binding-7b1d67b5");
            this.mainGridItems.Add(classBindingDemo);

            GridItem bindingBindingDemo = new GridItem();
            bindingBindingDemo.Title = "Binding Binding";
            bindingBindingDemo.Description = "Demonstrates binding a class by using a binding. Thus \"Binding Binding\"";
            bindingBindingDemo.ControlType = typeof(BindingBindingDemo);
            bindingBindingDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Data-Binding-7b1d67b5");
            this.mainGridItems.Add(bindingBindingDemo);

            GridItem asyncDemo = new GridItem();
            asyncDemo.Title = "Async Pattern";
            asyncDemo.Description = "Download XML from a url of your choice.";
            asyncDemo.ControlType = typeof(AsyncDemo);
            asyncDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Async-Sample-async-Keyword-58db2218");
            this.mainGridItems.Add(asyncDemo);

            GridItem groupedItemsDemo = new GridItem();
            groupedItemsDemo.Title = "Grouped Items";
            groupedItemsDemo.Description = "Download XML from a url of your choice.";
            groupedItemsDemo.ControlType = typeof(GroupedItemsDemo);
            groupedItemsDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/GroupedGridView-77c59e8e");
            this.mainGridItems.Add(groupedItemsDemo);

#if WINDOWS_APP
            GridItem searchDemo = new GridItem();
            searchDemo.Title = "App Search";
            searchDemo.Description = "Add your app as a search result provider.";
            searchDemo.ControlType = typeof(App);
            searchDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Search-app-contract-sample-118a92f5");
            this.mainGridItems.Add(searchDemo);

            GridItem shareWindowsDemo = new GridItem();
            shareWindowsDemo.Title = "App Share";
            shareWindowsDemo.Description = "Add your app as a share provider.";
            shareWindowsDemo.ControlType = typeof(ShareWindowsDemo);
            shareWindowsDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Sharing-Content-Source-App-d9bffd84");
            shareWindowsDemo.CsFileName = "CodeShowPageWindows.Xaml.cs";
            this.mainGridItems.Add(shareWindowsDemo);

            GridItem settingsFlyoutDemo = new GridItem();
            settingsFlyoutDemo.Title = "Settings Flyout";
            settingsFlyoutDemo.Description = "How to use the settings pane for app properties.";
            settingsFlyoutDemo.ControlType = typeof(SettingsFlyoutDemo);
            settingsFlyoutDemo.XamlFileName = "CodeShowSettingsFlyout.Xaml";
            settingsFlyoutDemo.CsFileName = "CodeShowSettingsFlyout.Xaml.cs";
            settingsFlyoutDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Settings-Flyout-eceaafea");
            this.mainGridItems.Add(settingsFlyoutDemo);
#endif
            GridItem toastDemo = new GridItem();
            toastDemo.Title = "Toast";
            toastDemo.Description = "Pop a toast notification.";
            toastDemo.ControlType = typeof(ToastDemo);
            toastDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/toast-notifications-sample-52eeba29");
            this.mainGridItems.Add(toastDemo);

            GridItem notificationDemo = new GridItem();
            notificationDemo.Title = "Notifications";
            notificationDemo.Description = "Send a local notification.";
            notificationDemo.ControlType = typeof(NotificationDemo);
            notificationDemo.NavigationUrl = new Uri("http://msdn.microsoft.com/en-us/library/windows/apps/Hh779721.aspx");
            this.mainGridItems.Add(notificationDemo);

            GridItem createSecondaryTileDemo = new GridItem();
            createSecondaryTileDemo.Title = "Create Tile";
            createSecondaryTileDemo.Description = "Create a secondary tile.";
            createSecondaryTileDemo.ControlType = typeof(CreateSecondaryTileDemo);
            createSecondaryTileDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Secondary-Tiles-Sample-edf2a178");
            this.mainGridItems.Add(createSecondaryTileDemo);

            GridItem mapLocationDemo = new GridItem();
            mapLocationDemo.Title = "Map Location";
            mapLocationDemo.Description = "Add current location to a Bing map.";
            mapLocationDemo.ControlType = typeof(MapLocationDemo);
            mapLocationDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/bing/Bing-Maps-SDK-for-Metro-31b378eb");
#if WINDOWS_PHONE_APP
            mapLocationDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/wpapps/Simple-Map-control-sample-fc94908f");
#endif
            this.mainGridItems.Add(mapLocationDemo);

            GridItem viewBoxDemo = new GridItem();
            viewBoxDemo.Title = "ViewBox";
            viewBoxDemo.Description = "Use a ViewBox to create text that automatically scales.";
            viewBoxDemo.ControlType = typeof(ViewBoxDemo);
            viewBoxDemo.NavigationUrl = new Uri("http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.viewbox.aspx");
            this.mainGridItems.Add(viewBoxDemo);

            GridItem enableBackgroundTaskDemo = new GridItem();
            enableBackgroundTaskDemo.Title = "Background Tasks";
            enableBackgroundTaskDemo.Description = "Enable and disable background tasks.";
            enableBackgroundTaskDemo.ControlType = typeof(EnableBackgroundTaskDemo);
            enableBackgroundTaskDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/wpapps/Background-Task-Sample-9209ade9");
            enableBackgroundTaskDemo.CsFileName = "TaskDemo.cs";
            this.mainGridItems.Add(enableBackgroundTaskDemo);

            GridItem bindingConverterDemo = new GridItem();
            bindingConverterDemo.Title = "Binding Converter";
            bindingConverterDemo.Description = "Converts and formats data that is being bound to a property.";
            bindingConverterDemo.ControlType = typeof(BindingConverterDemo);
            bindingConverterDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/Data-Binding-7b1d67b5");
            this.mainGridItems.Add(bindingConverterDemo);

            GridItem webViewControlSizingDemo = new GridItem();
            webViewControlSizingDemo.Title = "WebView Sizing";
            webViewControlSizingDemo.Description = "Sizes a WebView to fit its contents.";
            webViewControlSizingDemo.ControlType = typeof(WebViewControlSizingDemo);
            webViewControlSizingDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/windowsapps/HTML-WebView-control-sample-56e773fa");
#if WINDOWS_PHONE_APP
            webViewControlSizingDemo.NavigationUrl = new Uri("http://code.msdn.microsoft.com/wpapps/XAML-WebView-control-sample-58ad63f7");
#endif
            this.mainGridItems.Add(webViewControlSizingDemo);


            GridItem staticBindingDemo = new GridItem();
            staticBindingDemo.Title = "Static Binding";
            staticBindingDemo.Description = "Demonstrates static binding to class.";
            staticBindingDemo.ControlType = typeof(StaticBindingDemo);
            staticBindingDemo.NavigationUrl = new Uri("http://msdn.microsoft.com/en-us/library/ms746695(v=vs.110).aspx");
            this.mainGridItems.Add(staticBindingDemo);

            List<GridItem> temp = new List<GridItem>(this.mainGridItems);
            temp.Sort(delegate(GridItem one, GridItem two)
            {
                return one.Title.CompareTo(two.Title);
            });

            this.mainGridItems = new ObservableCollection<GridItem>(temp);

            this.DemoItems = this.mainGridItems;
        }
    }
}
