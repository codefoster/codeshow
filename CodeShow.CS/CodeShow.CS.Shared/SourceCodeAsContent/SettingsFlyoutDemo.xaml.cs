using System;
using System.ComponentModel;
using Windows.Storage;
using Windows.UI.Xaml.Controls;

namespace CodeShow.CS
{
    public sealed partial class SettingsFlyoutDemo : UserControl
    {
        public SettingsFlyoutDemo()
        {
            this.InitializeComponent();

            this.SetData(SettingsFlyoutHelper.DemoSettingStorageString);
            SettingsFlyoutHelper.Settings.PropertyChanged += this.SettingsChangedHandler;
        }

        void SettingsChangedHandler(object sender, PropertyChangedEventArgs args)
        {
            this.SetData(args.PropertyName);
        }

        void SetData(string storageString)
        {
            Nullable<bool> demoEnabled = (Nullable<bool>)ApplicationData.Current.RoamingSettings.Values[storageString];
            if (demoEnabled == true)
            {
                this.showToggleState.Text = "Demo setting is enabled.";
            }
            else
            {
                this.showToggleState.Text = "Demo setting is disabled.";
            }
        }
    }
}
