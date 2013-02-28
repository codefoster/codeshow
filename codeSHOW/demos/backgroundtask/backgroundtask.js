(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/backgroundtask/backgroundtask.html", {
        ready: function (element, options) {
            initTask();
        }
    });

    var back = Windows.ApplicationModel.Background;

    function isTaskRunning(name) {
        var iter = back.BackgroundTaskRegistration.allTasks.first();
        var hascur = iter.hasCurrent;
        while (hascur) {
            var cur = iter.current.value;
            if (cur.name == name) {
                return true;
            }
            hascur = iter.moveNext();
        }
        return false;
    }

    function registerTask(taskName, taskFileName, trigger) {
        if (isTaskRunning(taskName)) {
            return;
        }
        var builder = new back.BackgroundTaskBuilder();
        builder.name = taskName;
        builder.taskEntryPoint = taskFileName;
        builder.setTrigger(trigger);
        var backgroundTaskRegistration = builder.register();
    }

    function initTask() {
        registerTask("LockAppNotify", "demos\\backgroundtask\\zonetask.js", 
            new back.SystemTrigger(back.SystemTriggerType.timeZoneChange, false));

    }
})();
