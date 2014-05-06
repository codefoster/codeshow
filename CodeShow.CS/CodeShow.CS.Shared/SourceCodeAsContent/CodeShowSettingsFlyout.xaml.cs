using System.ComponentModel;
using Windows.Foundation.Collections;
using Windows.Storage;
using Windows.UI.ApplicationSettings;
using Windows.UI.Popups;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace CodeShow.CS
{
    // BeginCutPaste

    public class CodeShowSettings : INotifyPropertyChanged
    {
        bool? demoSetting = null;
        private IPropertySet roamingValues =
            ApplicationData.Current.RoamingSettings.Values;

        public bool DemoSetting
        {
            get 
            {
                bool? enabled =
                    (bool?)roamingValues[SettingsFlyoutHelper.DemoSettingStorageString];
                
                if (enabled.HasValue)
                {
                    return enabled.Value;
                }

                return false; 
            }
            set
            {
                demoSetting = value;
                roamingValues[SettingsFlyoutHelper.DemoSettingStorageString] = value;
                RaisePropertyChanged(SettingsFlyoutHelper.DemoSettingStorageString);
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected void RaisePropertyChanged(string name)
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(name));
            }
        }
    }

    /// <summary>
    /// Class for registering the settings. This is created in the app.xaml.cs file.
    /// Normoally the registration code would go there but to keep all of the code
    /// in one place this class as created.
    /// </summary>
    public class SettingsFlyoutHelper
    {
        public static string DemoSettingStorageString = "DemoSettingStorageString";
        private static CodeShowSettings settings = new CodeShowSettings();
        public static CodeShowSettings Settings
        {
            get { return SettingsFlyoutHelper.settings; }
        }

        public void Register()
        {
            SettingsPane.GetForCurrentView().CommandsRequested += 
                OnSettingsPaneCommandRequested;
        }

        private void OnSettingsPaneCommandRequested(
            SettingsPane sender,
            SettingsPaneCommandsRequestedEventArgs args)
        {
            // Add the commands one by one to the settings panel
            args.Request.ApplicationCommands.Add(
                new SettingsCommand("commandID",
                "Demo Settings", NavigateToSettingsPane));
        }

        private void NavigateToSettingsPane(IUICommand command)
        {
            CodeShowSettingsFlyout flyout = new CodeShowSettingsFlyout();
            flyout.Show();
        }
    }

    public sealed partial class CodeShowSettingsFlyout : SettingsFlyout
    {
        public CodeShowSettingsFlyout()
        {
            this.InitializeComponent();
            this.EnableDemoToggle.IsOn = 
                SettingsFlyoutHelper.Settings.DemoSetting;
        }

        private void EnableDemoToggle_Toggled(object sender, 
            RoutedEventArgs e)
        {
            SettingsFlyoutHelper.Settings.DemoSetting = 
                this.EnableDemoToggle.IsOn;
        }
    }

    // EndCutPaste
}
