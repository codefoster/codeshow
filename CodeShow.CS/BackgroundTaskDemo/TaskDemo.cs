using System;
using Windows.ApplicationModel.Background;
using Windows.Data.Xml.Dom;
using Windows.UI.Notifications;

namespace BackgroundTaskDemo
{
    public sealed class TaskDemo : IBackgroundTask
    {
        public void Run(IBackgroundTaskInstance taskInstance)
        {
            //TODO get a two line notification and add date time to second line.
            string xml =
                "<toast><visual>" +
                    "<binding template=\"ToastText02\">" +
                        "<text id=\"1\">" +
                        taskInstance.Task.Name  +
                    "</text>" +
                    "<text id=\"2\">" +
                        "Fired at : " + DateTime.Now.ToString() +
                    "</text></binding>" +
                "</visual></toast>";
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(xml);
            ToastNotification toast = new ToastNotification(doc);
            ToastNotifier notifier = ToastNotificationManager.CreateToastNotifier();
            notifier.Show(toast);
        }
    }
}
