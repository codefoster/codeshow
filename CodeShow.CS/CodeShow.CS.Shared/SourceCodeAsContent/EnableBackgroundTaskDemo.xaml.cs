using System;
using Windows.ApplicationModel.Background;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace CodeShow.CS
{
    public sealed partial class EnableBackgroundTaskDemo : UserControl
    {
        private const string TaskEntryPoint = "BackgroundTaskDemo.TaskDemo";
        private const string TimeZoneTaskName = "BackgroundTimeZoneTask";
        private const string TimerTaskName = "BackgroundTimerTask";

        public EnableBackgroundTaskDemo()
        {
            this.InitializeComponent();

            foreach (var cur in BackgroundTaskRegistration.AllTasks)
            {
                switch (cur.Value.Name)
                {
                    case EnableBackgroundTaskDemo.TimeZoneTaskName:
                        this.OkToEnableTask(this.timeZoneButton);
                        break;
                    case EnableBackgroundTaskDemo.TimerTaskName:
                        this.OkToEnableTask(this.timerButton);
                        break;
                }
            }
        }

        private async void EnableTimeZone_Tapped(object sender, RoutedEventArgs e)
        {
            if (this.OkToEnableTask(this.timeZoneButton))
            {
#if WINDOWS_PHONE_APP
                await BackgroundExecutionManager.RequestAccessAsync();
#endif
                BackgroundTaskBuilder builder = new BackgroundTaskBuilder();
                builder.SetTrigger(
                    new SystemTrigger(SystemTriggerType.TimeZoneChange, false));
                builder.TaskEntryPoint = EnableBackgroundTaskDemo.TaskEntryPoint;
                builder.Name = EnableBackgroundTaskDemo.TimeZoneTaskName;
                builder.Register();
            }
            else
            {
                this.DisableTask(EnableBackgroundTaskDemo.TimeZoneTaskName);
            }
        }

        private async void EnableTimer_Tapped(object sender, RoutedEventArgs e)
        {
            if (this.OkToEnableTask(this.timerButton))
            {
                await BackgroundExecutionManager.RequestAccessAsync();
                BackgroundTaskBuilder builder = new BackgroundTaskBuilder();
                builder.SetTrigger(new TimeTrigger(15, false));
                builder.TaskEntryPoint = EnableBackgroundTaskDemo.TaskEntryPoint;
                builder.Name = EnableBackgroundTaskDemo.TimerTaskName;
                builder.Register();
            }
            else
            {
                this.DisableTask(EnableBackgroundTaskDemo.TimerTaskName);
            }
        }

        private bool OkToEnableTask(Button button)
        {
            if (button.Content.ToString().Contains("Enable"))
            {
                button.Content = 
                    button.Content.ToString().Replace("Enable", "Disable");
                return true;
            }
            else
            {
                button.Content = 
                    button.Content.ToString().Replace("Disable", "Enable");
                return false;
            }
        }

        private void DisableTask(string name)
        {
            foreach (var cur in BackgroundTaskRegistration.AllTasks)
            {
                if (cur.Value.Name == name)
                {
                    cur.Value.Unregister(true);
                }
            }
        }
    }
}
