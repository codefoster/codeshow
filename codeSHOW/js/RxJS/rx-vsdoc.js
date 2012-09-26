/**
 * Copyright (c) Microsoft Corporation.  All rights reserved.
 * This code is licensed by Microsoft Corporation under the terms
 * of the MICROSOFT REACTIVE EXTENSIONS FOR JAVASCRIPT AND .NET LIBRARIES License.
 * See http://go.microsoft.com/fwlink/?LinkID=220762.
 */

(function (global) {
    var root = global.Rx = { };
    root.VERSION = '2.0.20327';

var CompositeDisposable = root.CompositeDisposable = (function () {
    function CompositeDisposable() {
        /// <summary>
        /// Creates a new instance of the CompositeDisposable class containing a set of disposables (specified as arguments to the constructor call) that will be disposed together.
        /// &#10;
        /// &#10;E.g. group = new CompositeDisposable(disposable1, disposable2, disposable3);
        /// </summary>
        /// <param name="arguments">Disposables to add to the newly created CompositeDisposable object.</param>

        this.isDisposed = false;
        this.length = 0;
    }
    CompositeDisposable.prototype.add = function (item) {
        /// <summary>
        /// Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
        /// </summary>
        /// <param name="item">Disposable to add.</param>
    };
    CompositeDisposable.prototype.remove = function (item) {
        /// <summary>
        /// Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
        /// </summary>
        /// <param name="item">Disposable to remove.</param>
        /// <returns type="Boolean">true if found; false otherwise.</returns>
        return false;
    };
    CompositeDisposable.prototype.dispose = function () {
        /// <summary>
        /// Disposes all disposables in the group and removes them from the group.
        /// </summary>
    };
    CompositeDisposable.prototype.clear = function () {
        /// <summary>
        /// Removes and disposes all disposables from the CompositeDisposable, but does not dispose the CompositeDisposable.
        /// </summary>
    };
    CompositeDisposable.prototype.contains = function (item) {
        /// <summary>
        /// Determines whether the CompositeDisposable contains a specific disposable.
        /// </summary>
        /// <param name="item">Disposable to search for.</param>
        /// <returns type="Boolean">true if the disposable was found; otherwise, false.</returns>
        return false;
    };
    CompositeDisposable.prototype.toArray = function () {
        /// <summary>
        /// Returns an array containing all disposables stored in the CompositeDisposable.
        /// </summary>
        /// <returns type="Array">Array containing all disposables stored in the CompositeDisposable.</returns>
        return new Array();
    };
    return CompositeDisposable;
})();
var Disposable = root.Disposable = (function () {
    function Disposable(action) {
        /// <summary>
        /// Creates a disposable object that invokes the specified function when disposed.
        /// </summary>
        /// <param name="action">Function to run during a call to dispose.</param>
        /// <returns type="Disposable">Disposable object that runs the given function upon disposal.</returns>
    }

    Disposable.prototype.dispose = function () {
        /// <summary>
        /// Disposes the disposable resource.
        /// </summary>
    };

    return Disposable;
})();

Disposable.create = function (action) {
    /// <summary>
    /// Creates a disposable object that invokes the specified function when disposed.
    /// </summary>
    /// <param name="action">Function to run during a call to dispose.</param>
    /// <returns>Disposable object that runs the given function upon disposal.</returns>
    return new Disposable(action);
};
Disposable.empty = {
    dispose: function () {
        /// <summary>
        /// Does nothing.
        /// </summary>
    }
};
var SingleAssignmentDisposable = root.SingleAssignmentDisposable = (function () {
    function SingleAssignmentDisposable() {
        /// <summary>
        /// Creates a new instance of the SingleAssignmentDisposable class, allowing only a single assignment of its disposable object. If it has already been assigned, attempts to set the underlying object will throw an error.
        /// </summary>

        this.isDisposed = false;
    }
    SingleAssignmentDisposable.prototype.disposable = function (value) {
        /// <summary>
        /// Gets or sets the underlying disposable.
        /// &#10;
        /// &#10;1 - oldDisposable = singleAssignmentDisposable.disposable();
        /// &#10;2 - singleAssignmentDisposable.disposable(newDisposable);
        /// </summary>
        /// <param name="value">[Optional] Disposable to be assigned to the SingleAssignmentDisposable resource. If the SingleAssignmentDisposable has already been assigned an error will be thrown.</param>
    };
    SingleAssignmentDisposable.prototype.dispose = function () {
        /// <summary>
        /// Disposes the underlying disposable.
        /// </summary>
    };
    return SingleAssignmentDisposable;
})();
var SerialDisposable = root.SerialDisposable = (function () {
    function SerialDisposable() {
        /// <summary>
        /// Creates a new instance of the SerialDisposable class whose underlying disposable can be swapped for another disposable which causes the previous underlying disposable to be disposed.
        /// </summary>
    }
    SerialDisposable.prototype.disposable = function (value) {
        /// <summary>
        /// Gets or sets the underlying disposable.
        /// &#10;
        /// &#10;1 - oldDisposable = serialDisposable.disposable();
        /// &#10;2 - serialDisposable.disposable(newDisposable);
        /// </summary>
        /// <param name="value">[Optional] Disposable to be assigned to the SerialDisposable resource. If the SerialDisposable has already been disposed, assignment to this property causes immediate disposal of the given disposable object. Assigning this property disposes the previous disposable object.</param>
    };
    SerialDisposable.prototype.dispose = function () {
        /// <summary>
        /// Disposes the underlying disposable as well as all future replacements.
        /// </summary>
    };
    return SerialDisposable;
})();
var InnerDisposable = (function () {
    function InnerDisposable(disposable) { }
    InnerDisposable.prototype.dispose = function () {
        /// <summary>
        /// Disposes the dependent disposable, reducing the reference count of the parent RefCountDisposable.
        /// </summary>
    };
    return InnerDisposable;
})();

RefCountDisposable = root.RefCountDisposable = (function () {
    function RefCountDisposable(disposable) {
        /// <summary>
        /// Creates a new instance of the RefCountDisposable class with the specified disposable which will get disposed only if all dependent disposables (obtained through getDisposable) have been disposed.
        /// </summary>
        /// <param name="disposable">Underlying disposable.</param>

        this.isDisposed = false;
    }
    RefCountDisposable.prototype.dispose = function () {
        /// <summary>
        /// Disposes the underlying disposable only when all dependent disposables have been disposed.
        /// </summary>
    };
    RefCountDisposable.prototype.getDisposable = function () {
        /// <summary>
        /// Returns a dependent disposable that when disposed decreases the refcount on the underlying disposable.
        /// </summary>
        /// <returns>A dependent disposable contributing to the reference count that manages the underlying disposable's lifetime.</returns>
        return new InnerDisposable(this);
    };
    return RefCountDisposable;
})();
var ScheduledDisposable = (function () {
    function ScheduledDisposable(scheduler, disposable) {
        /// <summary>
        /// Represents an object that schedules units of work on a provided scheduler.
        /// </summary>        
        this.scheduler = scheduler, this.disposable = disposable, this.isDisposed = false;
    }
    ScheduledDisposable.prototype.dispose = function () {
        /// <summary>
        /// Disposes the wrapped disposable on the provided scheduler.
        /// </summary>
    };
    return ScheduledDisposable;
})();

var ScheduledItem;
ScheduledItem = (function () {
    function ScheduledItem(scheduler, state, action, dueTime, comparer) {
        /// <summary>
        /// Represents a work item that has been scheduled.
        /// </summary>
    }
    ScheduledItem.prototype.invoke = function () {
        /// <summary>
        /// Invokes the work item.
        /// </summary>
    };
    return ScheduledItem;
})();
var cancel = {
    dispose: function () {
        /// <summary>
        /// Cancels the scheduled action, provided it hasn't executed yet.
        /// </summary>
    }
};

var Scheduler = root.Scheduler = (function () {
    function Scheduler() {
        /// <summary>
        /// Provides access to scheduler functionality, used to parameterize concurrency for Rx operations.
        /// </summary>
    }

    Scheduler.prototype.schedule = function (action) {
        /// <summary>
        /// Schedules the specified action immediately.
        /// &#10;
        /// &#10;E.g. var cancel = Rx.Scheduler.CurrentThread.schedule(function () { alert('Hello!'); });
        /// </summary>
        /// <param name="action">Action to be scheduled.</param>
        /// <returns>A disposable object that can be used to cancel the scheduled action.</returns>
        return cancel;
    };
    Scheduler.prototype.scheduleWithState = function (state, action) {
        /// <summary>
        /// Schedules the specified action immediately, supplying it the given state object.
        /// &#10;
        /// &#10;E.g. var cancel = Rx.Scheduler.CurrentThread.schedule("Bart", function (name) { alert('Hello ' + name + '!'); });
        /// </summary>
        /// <param name="state">State to pass to the action.</param>
        /// <param name="action">Action to be scheduled. The first parameter passed to the action corresponds to the given state object.</param>
        /// <returns>A disposable object that can be used to cancel the scheduled action.</returns>
        return cancel;
    };
    Scheduler.prototype.scheduleWithRelative = function (dueTime, action) {
        /// <summary>
        /// Schedules the specified action at the given relative due time.
        /// &#10;
        /// &#10;E.g. var cancel = Rx.Scheduler.Timeout.schedule(1000 /* 1s */, function () { alert('Hello!'); });
        /// </summary>
        /// <param name="dueTime">Relative time (specified in milliseconds) at which to schedule the given action.</param>
        /// <param name="action">Action to be scheduled.</param>
        /// <returns>A disposable object that can be used to cancel the scheduled action.</returns>
        return cancel;
    };
    Scheduler.prototype.scheduleWithRelativeAndState = function (state, dueTime, action) {
        /// <summary>
        /// Schedules the specified action at the given relative due time, supplying it the given state object.
        /// &#10;
        /// &#10;E.g. var cancel = Rx.Scheduler.Timeout.schedule("Bart", 1000 /* 1s */, function () { alert('Hello ' + name + '!'); });
        /// </summary>
        /// <param name="state">State to pass to the action.</param>
        /// <param name="dueTime">Relative time (specified in milliseconds) at which to schedule the given action.</param>
        /// <param name="action">Action to be scheduled. The first parameter passed to the action corresponds to the given state object.</param>
        /// <returns>A disposable object that can be used to cancel the scheduled action.</returns>
        return cancel;
    };
    Scheduler.prototype.scheduleWithAbsolute = function (dueTime, action) {
        /// <summary>
        /// Schedules the specified action at the given absolute due time.
        /// &#10;
        /// &#10;E.g. var cancel = Rx.Scheduler.Timeout.schedule(new Date(2012, 2, 11), function () { alert('Hello!'); });
        /// </summary>
        /// <param name="dueTime">Absolute time (specified as a Date object) at which to schedule the given action.</param>
        /// <param name="action">Action to be scheduled.</param>
        /// <returns>A disposable object that can be used to cancel the scheduled action.</returns>
        return cancel;
    };
    Scheduler.prototype.scheduleWithAbsoluteAndState = function (state, dueTime, action) {
        /// <summary>
        /// Schedules the specified action at the given absolute due time, supplying it the given state object.
        /// &#10;
        /// &#10;E.g. var cancel = Rx.Scheduler.Timeout.schedule("Bart", new Date(2012, 2, 11), function () { alert('Hello ' + name + '!'); });
        /// </summary>
        /// <param name="state">State to pass to the action.</param>
        /// <param name="dueTime">Absolute time (specified as a Date object) at which to schedule the given action.</param>
        /// <param name="action">Action to be scheduled. The first parameter passed to the action corresponds to the given state object.</param>
        /// <returns>A disposable object that can be used to cancel the scheduled action.</returns>
        return cancel;
    };
    Scheduler.prototype.scheduleRecursive = function (action) {
        /// <summary>
        /// Schedules the specified action recursively.
        /// &#10;
        /// &#10;E.g. var cancel = Rx.Scheduler.CurrentThread.schedule(function (self) { alert('Hello!'); self(); });
        /// </summary>
        /// <param name="action">Action to be scheduled. The first parameter passed to the action is a function that can be invoked to make a recursive call.</param>
        /// <returns>A disposable object that can be used to cancel the recursive scheduled action.</returns>
        return cancel;
    };
    Scheduler.prototype.scheduleRecursiveWithState = function (state, action) {
        /// <summary>
        /// Schedules the specified action recursively, supplying it the given initial state object.
        /// &#10;
        /// &#10;E.g. var cancel = Rx.Scheduler.CurrentThread.schedule(0, function (i, self) { alert('Hello ' + i + '!'); self(i + 1); });
        /// </summary>
        /// <param name="state">Initial state to pass to the action.</param>
        /// <param name="action">Action to be scheduled. The first parameter passed to the action corresponds to the given state object. The second parameter passed to the action is a function that can be invoked to make a recursive call.</param>
        /// <returns>A disposable object that can be used to cancel the recursive scheduled action.</returns>
        return cancel;
    };
    Scheduler.prototype.scheduleRecursiveWithRelative = function (dueTime, action) {
        /// <summary>
        /// Schedules the specified action recursively using relative due times.
        /// &#10;
        /// &#10;E.g. var cancel = Rx.Scheduler.Timeout.schedule(1000 /* 1s */, function (self) { alert('Hello!'); self(1000 /* 1s */); });
        /// </summary>
        /// <param name="dueTime">Relative time (specified in milliseconds) at which to schedule the given action the first time.</param>
        /// <param name="action">Action to be scheduled. The first parameter passed to the action corresponds to the given state object.</param>
        /// <returns>A disposable object that can be used to cancel the recursive scheduled action.</returns>
        return cancel;
    };
    Scheduler.prototype.scheduleRecursiveWithRelativeAndState = function (state, dueTime, action) {
        /// <summary>
        /// Schedules the specified action recursively using relative due times, supplying it the given initial state object.
        /// &#10;
        /// &#10;E.g. var cancel = Rx.Scheduler.Timeout.schedule(0, 1000 /* 1s */, function (i, self) { alert('Hello ' + i + '!'); self(i + 1, 1000 /* 1s */); });
        /// </summary>
        /// <param name="state">Initial state to pass to the action.</param>
        /// <param name="dueTime">Relative time (specified in milliseconds) at which to schedule the given action the first time.</param>
        /// <param name="action">Action to be scheduled. The first parameter passed to the action corresponds to the given state object. The second parameter passed to the action is a function that can be invoked to make a recursive call.</param>
        /// <returns>A disposable object that can be used to cancel the recursive scheduled action.</returns>
        return cancel;
    };
    Scheduler.prototype.scheduleRecursiveWithAbsolute = function (dueTime, action) {
        /// <summary>
        /// Schedules the specified action recursively using absolute due times.
        /// &#10;
        /// &#10;E.g. var cancel = Rx.Scheduler.Timeout.schedule(new DateTime(2011, 2, 11), function (self) { alert('Hello!'); self(new Date(new Date().getFullYear() + 1, 2, 11)); });
        /// </summary>
        /// <param name="dueTime">Absolute time (specified as a Date object) at which to schedule the given action the first time.</param>
        /// <param name="action">Action to be scheduled. The first parameter passed to the action corresponds to the given state object.</param>
        /// <returns>A disposable object that can be used to cancel the recursive scheduled action.</returns>
        return cancel;
    };
    Scheduler.prototype.scheduleRecursiveWithAbsoluteAndState = function (state, dueTime, action) {
        /// <summary>
        /// Schedules the specified action recursively using absolute due times, supplying it the given initial state object.
        /// &#10;
        /// &#10;E.g. var cancel = Rx.Scheduler.Timeout.schedule("Bart", new DateTime(2011, 2, 11), function (name, self) { alert('Hello ' + name + '!'); self(name, new Date(new Date().getFullYear() + 1, 2, 11)); });
        /// </summary>
        /// <param name="state">Initial state to pass to the action.</param>
        /// <param name="dueTime">Absolute time (specified as a Date object) at which to schedule the given action the first time.</param>
        /// <param name="action">Action to be scheduled. The first parameter passed to the action corresponds to the given state object. The second parameter passed to the action is a function that can be invoked to make a recursive call.</param>
        /// <returns>A disposable object that can be used to cancel the recursive scheduled action.</returns>
        return cancel;
    };

    Scheduler.now = function () {
        /// <summary>
        /// Gets the current time.
        /// </summary>
        /// <returns>Current time.</returns>
        return new Date().getTime();
    }

    Scheduler.normalize = function (timeSpan) {
        /// <summary>
        /// Normalizes the given relative time span, i.e. negative time is rounded up to 0.
        /// </summary>
        /// <returns>Normalized relative time span.</returns>
        return 0;
    };

    return Scheduler;
})();
var ImmediateScheduler = (function () {
    inherits(ImmediateScheduler, Scheduler);
    function ImmediateScheduler() {
        /// <summary>
        /// Scheduler that runs actions synchronously on the current thread. When using time-based operations, script execution may block, which is often undesirable.
        /// In such scenarios, use Rx.Schedule.Timeout instead.
        /// </summary>
    }
    return ImmediateScheduler;
})(),
immediateScheduler = Scheduler.Immediate = new ImmediateScheduler();
var CurrentThreadScheduler = (function () {
    inherits(CurrentThreadScheduler, Scheduler);
    function CurrentThreadScheduler() {
        /// <summary>
        /// Scheduler that runs actions on the current thread using a trampoline. When using time-based operations, script execution may block, which is often undesirable.
        /// In such scenarios, use Rx.Schedule.Timeout instead.
        /// </summary>
    }
    CurrentThreadScheduler.prototype.scheduleRequired = function () {
        return CurrentThreadScheduler.queue === null;
    };
    CurrentThreadScheduler.prototype.ensureTrampoline = function (action) {
        if (this.scheduleRequired()) {
            return this.schedule(action);
        } else {
            return action();
        }
    };
    CurrentThreadScheduler.queue = null;

    return CurrentThreadScheduler;
})(),
currentThreadScheduler = Scheduler.CurrentThread = new CurrentThreadScheduler();
var VirtualTimeScheduler = root.VirtualTimeScheduler = (function () {
    inherits(VirtualTimeScheduler, Scheduler);
    function VirtualTimeScheduler(initialClock, comparer) {
        /// <summary>
        /// Creates a new virtual time scheduler.
        /// </summary>
        /// <param name="initialClock">Initial value for the clock.</param>
        /// <param name="comparer">Comparer to determine causality of events based on absolute time.</param>
    }
    VirtualTimeScheduler.prototype.scheduleRelative = function (state, dueTime, action) {
        /// <summary>
        /// Schedules an action to be executed at dueTime.
        /// </summary>
        /// <param name="state">State passed to the action to be executed.</param>
        /// <param name="action">Action to be executed.</param>
        /// <param name="dueTime">Relative time (specified in milliseconds) after which to execute the action.</param>
        /// <returns>The disposable object used to cancel the scheduled action (best effort).</returns>
        return cancel;
    };
    VirtualTimeScheduler.prototype.start = function () {
        /// <summary>
        /// Starts the virtual time scheduler.
        /// </summary>
    };
    VirtualTimeScheduler.prototype.stop = function () {
        /// <summary>
        /// Stops the virtual time scheduler.
        /// </summary>
    };
    VirtualTimeScheduler.prototype.advanceTo = function (time) {
        /// <summary>
        /// Advances the scheduler's clock to the specified time, running all work till that point.
        /// </summary>
        /// <param name="time">Absolute time (specified as a Date object) to advance the scheduler's clock to.</param>
    };
    VirtualTimeScheduler.prototype.advanceBy = function (time) {
        /// <summary>
        /// Advances the scheduler's clock by the specified relative time, running all work scheduled for that timespan.
        /// </summary>
        /// <param name="time">Relative time (specified in milliseconds) to advance the scheduler's clock by.</param>
    };
    VirtualTimeScheduler.prototype.getNext = function () {
        /// <summary>
        /// Gets the next scheduled item to be executed.
        /// </summary>
        /// <returns>The next scheduled item.</returns>
        return new ScheduledItem();
    };
    VirtualTimeScheduler.prototype.scheduleAbsolute = function (state, dueTime, action) {
        /// <summary>
        /// Schedules an action to be executed at dueTime.
        /// </summary>
        /// <param name="state">State passed to the action to be executed.</param>
        /// <param name="action">Action to be executed.</param>
        /// <param name="dueTime">Absolute time (specified as a Date object) at which to execute the action.</param>
        /// <returns>The disposable object used to cancel the scheduled action (best effort).</returns>
        return cancel;
    };
    return VirtualTimeScheduler;
})();
var TimeoutScheduler = (function () {
    inherits(TimeoutScheduler, Scheduler);
    function TimeoutScheduler() {
        /// <summary>
        /// Scheduler that runs actions using the setTimeout JavaScript function.
        /// </summary>
    }
    return TimeoutScheduler;
})(),
timeoutScheduler = Scheduler.Timeout = new TimeoutScheduler();

var Observer = root.Observer = function () {
    /// <summary>
    /// Provides observer functionality, used as the callback mechanism for observable sequences.
    /// </summary>
};
var AbstractObserver = (function () {
    function AbstractObserver() {
    }
    AbstractObserver.prototype.onNext = function (value) {
        /// <summary>
        /// Notifies the observer by supplying a new sequence element.
        /// </summary>
        /// <param name="value">New sequence element.</param>
    };
    AbstractObserver.prototype.onError = function (exception) {
        /// <summary>
        /// Notifies the observer about an error that occurred in the sequence.
        /// </summary>
        /// <param name="exception">The error object.</param>
    };
    AbstractObserver.prototype.onCompleted = function () {
        /// <summary>
        /// Notifies the observer of the termination of the sequence.
        /// </summary>
    };
    AbstractObserver.prototype.dispose = function () {
        /// <summary>
        /// Disposes the resources associated with the current observer.
        /// </summary>
    };
    return AbstractObserver;
})();
var Notification = root.Notification = (function () {
    function Notification() {
        /// <summary>
        /// Provides a set of static methods for constructing notifications.
        /// </summary>
    }
    Notification.prototype.accept = function (observerOrOnNext, onError, onCompleted) {
        /// <summary>
        /// Invokes the function corresponding to the notification and returns the produced result.
        /// </summary>
        /// <param name="observerOrOnNext">The observer whose methods to invoke based on the notification kind or the function to invoke for an OnNext notification.</param>
        /// <param name="onError">[Optional] The function to invoke for an OnError notification.</param>
        /// <param name="onCompleted">[Optional] The function to invoke for an OnCompleted notification.</param>
        /// <returns>The result of calling the function or observer for the corresponding notification kind.</returns>
        return null;
    };
    Notification.prototype.toObservable = function (scheduler) {
        /// <summary>
        /// Returns an observable sequence that exposes the notification's behavior.
        /// </summary>
        /// <param name="scheduler">Scheduler to send the notification on. If not specified, the immediate scheduler is used.</param>
        /// <returns>Observable sequence exposing the notification's behavior.</returns>
        return new Observable();
    };
    Notification.prototype.hasValue = false;
    Notification.prototype.equals = function (other) {
        /// <summary>
        /// Indicates whether this instance and a specified object are equal.
        /// </summary>
        /// <returns>true if both objects are the same; false otherwise.</returns>
        return false;
    };
    return Notification;
})();
Notification.createOnNext = function (next) {
    /// <summary>
    /// Creates an object that represents an OnNext notification to an observer.
    /// </summary>
    /// <param name="value">The value contained in the notification.</param>
    /// <returns>The OnNext notification containing the value.</returns>
    return new Notification();
};
Notification.createOnError = function (error) {
    /// <summary>
    /// Creates an object that represents an OnError notification to an observer.
    /// </summary>
    /// <param name="error">The exception contained in the notification.</param>
    /// <returns>The OnError notification containing the exception.</returns>
    return new Notification();
};
Notification.createOnCompleted = function () {
    /// <summary>
    /// Creates an object that represents an OnCompleted notification to an observer.
    /// </summary>
    /// <returns>The OnCompleted notification.</returns>
    return new Notification();
};
var observerCreate = Observer.create = function (onNext, onError, onCompleted) {
    /// <summary>
    /// Creates an observer from the specified OnNext, OnError, and OnCompleted actions.
    /// </summary>
    /// <param name="onNext">Observer's OnNext action implementation.</param>
    /// <param name="onError">[Optional] Observer's OnError action implementation. If not specified, the error is rethrown.</param>
    /// <param name="onCompleted">[Optional] Observer's OnCompleted action implementation. If not specified, the completion message is ignored.</param>
    /// <returns>The observer object implemented using the given actions.</returns>
    return new AbstractObserver();
};
Observer.prototype.toNotifier = function () {
    /// <summary>
    /// Creates a notification callback from an observer.
    /// </summary>
    /// <returns>The action that forwards its input notification to the underlying observer.</returns>
    return function (n) {
        return null;
    };
};
Observer.prototype.asObserver = function () {
    /// <summary>
    /// Hides the identity of an observer.
    /// </summary>
    /// <returns>An observer that hides the identity of the specified observer.</returns>-
    return this;
};

var Observable = root.Observable = (function () {
    function Observable() {
        /// <summary>
        /// Provides a set of query operators that can be used on observable sequences.
        /// </summary>
    }

    Observable.prototype.subscribe = function (observerOrOnNext, onError, onCompleted) {
        /// <summary>
        /// Subscribes to the observable sequence by specifying an observer or a set of callback functions.
        /// </summary>
        /// <param name="observerOrOnNext">Observer object to receive notifications on, or an onNext handler function.</param>
        /// <param name="onError">[Optional] An onError handler function. This parameter shouldn't be supplied when the first parameter is an Observer. If not specified, the default behavior is to keep the error unhandled.</param>
        /// <param name="onCompleted">[Optional] An onCompleted handler function.</param>
        /// <return type="Disposable">Disposable object used to unsubscribe from the observable sequence.</return>
        return new Disposable();
    };
    return Observable;
})(),
observableProto = Observable.prototype;
var ConnectableObservable = root.ConnectableObservable = (function () {
    inherits(ConnectableObservable, Observable);
    function ConnectableObservable(source, subject) {
        /// <summary>
        /// Creates an observable that can be connected and disconnected from its source.
        /// </summary>
        /// <param name="source">Underlying observable source sequence that can be connected and disconnected from the wrapper.</param>
        /// <param name="subject">Subject exposed by the connectable observable, receiving data from the underlying source sequence upon connection.</param>
    }
    ConnectableObservable.prototype.connect = function () {
        /// <summary>
        /// Connects the observable to its source.
        /// </summary>
        /// <returns>Disposable used to disconnect the observable sequence from its source.</returns>
        return new Disposable();
    };
    ConnectableObservable.prototype.refCount = function () {
        /// <summary>
        /// Returns an observable sequence that stays connected to the source as long as there is at least one subscription to the observable sequence.
        /// </summary>
        /// <returns>An observable sequence that stays connected to the source as long as there is at least one subscription to the observable sequence.</returns>
        return new Observable();
    };
    return ConnectableObservable;
})();
var Subject = root.Subject = (function () {
    inherits(Subject, Observable);
    extendObject(Subject, Observer);
    function Subject() {
        /// <summary>
        /// Creates a subject.
        /// </summary>
    }
    Subject.prototype.onCompleted = function () {
        /// <summary>
        /// Notifies all subscribed observers of the end of the sequence.
        /// </summary>
    };
    Subject.prototype.onError = function (exception) {
        /// <summary>
        /// Notifies all subscribed observers with the exception.
        /// </summary>
        /// <param name="error">The exception to send to all subscribed observers.</param>
    };
    Subject.prototype.onNext = function (value) {
        /// <summary>
        /// Notifies all subscribed observers with the value.
        /// </summary>
        /// <param name="value">The value to send to all subscribed observers.</param>
    };
    Subject.prototype.dispose = function () {
        /// <summary>
        /// Unsubscribe all observers and release resources.
        /// </summary>
    };

    Subject.create = function (observer, observable) {
        /// <summary>
        /// Creates a subject from the specified observer and observable.
        /// </summary>
        /// <param name="observer">The observer used to publish messages to the subject.</param>
        /// <param name="observable">The observable used to subscribe to messages sent from the subject.</param>
        /// <returns>Subject implemented using the given observer and observable.</returns>
        return new AnonymousSubject(observer, observable);
    };

    return Subject;
})();
var AsyncSubject = root.AsyncSubject = (function () {
    inherits(AsyncSubject, Observable);
    extendObject(AsyncSubject, Observer);
    function AsyncSubject() {
        /// <summary>
        /// Creates a subject that can only receive one value and that value is cached for all future observations.
        /// </summary>
    }
    AsyncSubject.prototype.onCompleted = function () {
        /// <summary>
        /// Notifies all subscribed observers of the end of the sequence, also causing the last received value to be sent out (if any).
        /// </summary>
    };
    AsyncSubject.prototype.onError = function (exception) {
        /// <summary>
        /// Notifies all subscribed observers with the exception.
        /// </summary>
        /// <param name="error">The exception to send to all subscribed observers.</param>
    };
    AsyncSubject.prototype.onNext = function (value) {
        /// <summary>
        /// Sends a value to the subject. The last value received before successful termination will be sent to all subscribed observers.
        /// </summary>
        /// <param name="value">The value to store in the subject.</param>
    };
    AsyncSubject.prototype.dispose = function () {
        /// <summary>
        /// Unsubscribe all observers and release resources.
        /// </summary>
    };
    return AsyncSubject;
})();
var BehaviorSubject = root.BehaviorSubject = (function () {
    inherits(BehaviorSubject, Observable);
    extendObject(BehaviorSubject, Observer);
    function BehaviorSubject(value) {
        /// <summary>
        /// Creates a subject that caches its last value and starts with the specified value.
        /// </summary>
        /// <param name="value">Initial value sent to observers when no other value has been received by the subject yet.</param>
    }
    BehaviorSubject.prototype.onCompleted = function () {
        /// <summary>
        /// Notifies all subscribed observers of the end of the sequence.
        /// </summary>
    };
    BehaviorSubject.prototype.onError = function (error) {
        /// <summary>
        /// Notifies all subscribed observers with the exception.
        /// </summary>
        /// <param name="error">The exception to send to all subscribed observers.</param>
    };
    BehaviorSubject.prototype.onNext = function (value) {
        /// <summary>
        /// Notifies all subscribed observers with the value.
        /// </summary>
        /// <param name="value">The value to send to all subscribed observers.</param>
    };
    BehaviorSubject.prototype.dispose = function () {
        /// <summary>
        /// Unsubscribe all observers and release resources.
        /// </summary>
    };
    return BehaviorSubject;
})();
BehaviorSubject.prototype.toNotifier = Observer.prototype.toNotifier;
BehaviorSubject.prototype.asObserver = Observer.prototype.AsObserver;
var ReplaySubject = root.ReplaySubject = (function () {
    inherits(ReplaySubject, Observable);
    extendObject(ReplaySubject, Observable);

    function ReplaySubject(bufferSize, window, scheduler) {
        /// <summary>
        /// Creates a new replay subject with the specified buffer size, window and scheduler.
        /// </summary>
        /// <param name="bufferSize">[Optional] Maximum element count of the replay buffer. If not specified, the buffer size is infinite.</param>
        /// <param name="window">[Optional] Maximum time length of the replay buffer. If not specified, the window length is infinite.</param>
        /// <param name="scheduler">[Optional] Scheduler where connected observers will be invoked on. If not specified, the current thread scheduler is used.</param>
    }

    ReplaySubject.prototype.onNext = function (value) {
        /// <summary>
        /// Notifies all subscribed observers with the value.
        /// </summary>
        /// <param name="value">The value to send to all subscribed observers.</param>
    };
    ReplaySubject.prototype.onError = function (error) {
        /// <summary>
        /// Notifies all subscribed observers with the exception.
        /// </summary>
        /// <param name="error">The exception to send to all subscribed observers.</param>
    };
    ReplaySubject.prototype.onCompleted = function () {
        /// <summary>
        /// Notifies all subscribed observers of the end of the sequence.
        /// </summary>
    };
    ReplaySubject.prototype.dispose = function () {
        /// <summary>
        /// Unsubscribe all observers and release resources.
        /// </summary>
    };
    return ReplaySubject;
})();
var AnonymousSubject = (function () {
    inherits(AnonymousSubject, Observable);
    extendObject(AnonymousSubject, Observer);
    function AnonymousSubject(observer, observable) {
    }
    return AnonymousSubject;
})();

Observable.start = function (original, instance, args, scheduler) {
    /// <summary>
    /// Invokes a function on the given instance and with the given arguments on the specified scheduler, producing the result through an observable sequence.
    /// </summary>
    /// <param name="original">Function to run asynchronously.</param>
    /// <param name="instance">Object instance to invoke the function on.</param>
    /// <param name="args">[Optional] Arguments to pass to the function. If not specified, an empty argument array is used.</param>
    /// <param name="scheduler">[Optional] Scheduler to run the function on. If not specified, the timeout scheduler is used.</param>
    /// <return type="Observable">Observable sequence that will produce the result of calling the function, or an error object if an error occurred.</return>
    return new Observable();
};
Observable.toAsync = function (original, scheduler) {
    /// <summary>
    /// Converts a function to an asynchronous function that returns an observable sequence with the function's result.
    /// </summary>
    /// <param name="original">Function to run asynchronously.</param>
    /// <param name="scheduler">[Optional] Scheduler to run the function on. If not specified, the timeout scheduler is used.</param>
    /// <return>Function returning an observable sequence that will produce the result of calling the original function, or an error object if an error occurred.</return>
    return function () {
        /// <summary>
        /// Invokes the underlying function with the given arguments, returning an observable sequence with the function's result.
        /// </summary>
        /// <param name="arguments">Arguments to pass to the underlying function.</param>
        /// <return type="Observable">Observable sequence that will produce the result of calling the function, or an error object if an error occurred.</return>
        return new AsyncSubject();
    };
};
observableProto.multicast = function (subjectOrSubjectSelector, selector) {
    /// <summary>
    /// Returns an observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function or specified subject.
    /// </summary>
    /// <param name="subjectOrSubjectSelector">The subject to push source elements into or the factory function to create an intermediate subject through which the source sequence’s elements will be multicast to the selector function.</param>
    /// <param name="selector">[Optional] The selector function which can use the multicasted source sequence subject to the policies enforced by the created subject. This must be specified only when <paramref name="subjectOrSubjectSelector"/> is a function.</param>
    /// <returns>An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function or specified subject.</returns>
    return typeof subjectOrSubjectSelector === 'function' ? this : new ConnectableObservable();
};
observableProto.publish = function (selector) {
    /// <summary>
    /// Returns a connectable observable sequence that shares a single subscription to the underlying sequence.
    /// &#10;
    /// &#10;1 - res = xs.publish(function (xs_) { return xs_.zip(xs_, function (x, y) { return x + y; }); });
    /// &#10;2 - xs_ = xs.publish(); res = xs_.zip(xs_, function (x, y) { return x + y; }); }); xs_.connect();
    /// </summary>
    /// <param name="selector">[Optional] The selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. If not specified, the binding operator returns a ConnectableObservable object.</param>
    /// <returns>A connectable observable sequence that shares a single subscription to the underlying sequence.</returns>
    return !selector ?
        this.multicast(new Subject()) :
        this.multicast(function () {
            return new Subject();
        }, selector);
};
observableProto.publishLast = function (selector) {
    /// <summary>
    /// Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence containing only the last notification.
    /// &#10;
    /// &#10;1 - res = xs.publishLast(function (xs_) { return xs_.zip(xs_, function (x, y) { return x + y; }); });
    /// &#10;2 - xs_ = xs.publishLast(); res = xs_.zip(xs_, function (x, y) { return x + y; }); }); xs_.connect();
    /// </summary>
    /// <param name="selector">The selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence.</param>
    /// <returns>An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.</returns>
    return !selector ?
        this.multicast(new AsyncSubject()) :
        this.multicast(function () {
            return new AsyncSubject();
        }, selector);
};
observableProto.replay = function (selector, bufferSize, window, scheduler) {
    /// <summary>
    /// Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence containing only the last notification.
    /// &#10;
    /// &#10;1 - res = xs.replay(function (xs_) { return xs_.zip(xs_, function (x, y) { return x + y; }); });
    /// &#10;2 - xs_ = xs.replay(); res = xs_.zip(xs_, function (x, y) { return x + y; }); }); xs_.connect();
    /// </summary>
    /// <param name="selector">The selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence.</param>
    /// <param name="bufferSize">[Optional] Maximum element count of the replay buffer. If not specified, the buffer size is infinite.</param>
    /// <param name="window">[Optional] Maximum time length of the replay buffer. If not specified, the window length is infinite.</param>
    /// <param name="scheduler">[Optional] Scheduler where connected observers will be invoked on. If not specified, the current thread scheduler is used.</param>
    /// <returns>An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.</returns>
    return !selector || selector === null ?
        this.multicast(new ReplaySubject(bufferSize, window, scheduler)) :
        this.multicast(function () {
            return new ReplaySubject(bufferSize, window, scheduler);
        }, selector);
};
observableProto.publishValue = function (initialValueOrSelector, initialValue) {
    /// <summary>
    /// Returns a connectable observable sequence that shares a single subscription to the underlying sequence and starts with initialValue.
    /// &#10;
    /// &#10;1 - res = xs.publishValue(function (xs_) { return xs_.zip(xs_, function (x, y) { return x + y; }); }, 42);
    /// &#10;2 - xs_ = xs.publishValue(42); res = xs_.zip(xs_, function (x, y) { return x + y; }); }); xs_.connect();
    /// </summary>
    /// <param name="initialValueOrSelector">The selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence - or - initial value received by observers upon subscription causing the binding operator returns a ConnectableObservable object.</param>
    /// <param name="initialValue">[Optional] Initial value received by observers upon subscription; only to be set when the first parameter is a selector function.</param>
    /// <returns>A connectable observable sequence that shares a single subscription to the underlying sequence.</returns>
    return typeof initialValueOrSelector === 'function' ?
        this.multicast(function () {
            return new BehaviorSubject(initialValue);
        }, initialValueOrSelector) :
        this.multicast(new BehaviorSubject(initialValueOrSelector));
};
Observable.never = function () {
    /// <summary>
    /// Returns a non-terminating observable sequence.
    /// </summary>
    /// <returns>A non-terminating observable sequence.</returns>
    return new Observable();
};
Observable.empty = function (scheduler) {
    /// <summary>
    /// Returns an empty observable sequence with the specified scheduler.
    /// </summary>
    /// <param name="scheduler">[Optional] The scheduler to send the termination call. If not specified, the immediate scheduler is used.</param>
    /// <returns>The observable sequence with no elements.</returns>
    return new Observable();
};
Observable.returnValue = function (value, scheduler) {
    /// <summary>
    /// Returns an observable sequence that contains a single value with a specified value and optional scheduler.
    /// </summary>
    /// <param name="value">The single element in the resulting observable sequence.</param>
    /// <param name="scheduler">[Optional] The scheduler to send the single element on. If not specified, the immediate scheduler is used.</param>
    /// <returns>Observable sequence containing the single specified element.</returns>
    return new Observable();
};
Observable.throwException = function (exception, scheduler) {
    /// <summary>
    /// Returns an observable sequence that terminates with an exception.
    /// </summary>
    /// <param name="exception">Exception object used for the sequence's termination.</param>
    /// <param name="scheduler">[Optional] The scheduler to send the exceptional termination call on. If not specified, the immediate scheduler is used.</param>
    /// <returns>The observable sequence that terminates exceptionally with the specified exception object.</returns>
    return new Observable();
};
Observable.generate = function (initialState, condition, iterate, resultSelector, scheduler) {
    /// <summary>
    /// Generates an observable sequence by iterating a state from an initial state until the condition fails.
    /// </summary>
    /// <param name="initialState">The initial state.</param>
    /// <param name="condition">The condition to terminate generation.</param>
    /// <param name="iterate">The iteration step function.</param>
    /// <param name="resultSelector">The selector function for results produced in the sequence.</param>
    /// <param name="scheduler">[Optional] The scheduler on which to run the generator loop. If not specified, the current thread scheduler is used.</param>
    /// <returns>The generated sequence.</returns>
    return new Observable();
};
Observable.defer = function (observableFactory) {
    /// <summary>
    /// Returns an observable sequence that invokes the observable factory whenever a new observer subscribes, allowing defered creation of the sequence. This is useful to allow an observer to easily obtain an updated or refreshed version of the sequence.
    /// </summary>
    /// <param name="observableFactory">The observable factory function to invoke for each observer that subscribes to the resulting sequence.</param>
    /// <returns>The observable sequence whose observers trigger an invocation of the given observable factory function.</returns>
    return new Observable();
};
Observable.using = function (resourceFactory, observableFactory) {
    /// <summary>
    /// Constructs an observable sequence that depends on a resource object, whose lifetime is tied to the resulting observable sequence's lifetime.
    /// </summary>
    /// <param name="resourceFactory">Factory function to obtain a resource object.</param>
    /// <param name="observableFactory">Factory function to obtain an observable sequence that depends on the obtained resource.</param>
    /// <returns>Observable sequence whose lifetime controls the lifetime of the dependent resource object.</returns>
    return new Observable();
};
Observable.fromArray = function (array, scheduler) {
    /// <summary>
    /// Converts an array to an observable sequence.
    /// </summary>
    /// <param name="source">Array to convert to an observable sequence.</param>
    /// <param name="scheduler">[Optional] The scheduler on which to run the loop iterating over the array. If not specified, the current thread scheduler is used.</param>
    /// <returns>The observable sequence whose elements are pulled from the given array.</returns>
    return new Observable();
};
Observable.createWithDisposable = function (subscribe) {
    /// <summary>
    /// Creates an observable sequence from a specified subscribe method implementation.
    /// </summary>
    /// <param name="subscribe">The implementation of the resulting observable sequence's subscribe method, returning a Disposable object used to unsubscribe.</param>
    /// <returns>The observable sequence with the specified implementation for the subscribe method.</returns>
    return new Observable();
};
Observable.create = function (subscribe) {
    /// <summary>
    /// Creates an observable sequence from a specified subscribe method implementation.
    /// </summary>
    /// <param name="subscribe">The implementation of the resulting observable sequence's subscribe method, returning a function used to unsubscribe.</param>
    /// <returns>The observable sequence with the specified implementation for the subscribe method.</returns>
    return new Observable();
};
Observable.range = function (start, count, scheduler) {
    /// <summary>
    /// Generates an observable sequence of integral numbers within a specified range.
    /// </summary>
    /// <param name="start">The value of the first integer in the sequence.</param>
    /// <param name="count">The number of sequential integers to generate.</param>
    /// <param name="scheduler">[Optional] The scheduler to run the generator loop on. If not specified, the current thread scheduler is used.</param>
    /// <returns>An observable sequence that contains a range of sequential integral numbers.</returns>
    return new Observable();
};
observableProto.repeat = function (repeatCount) {
    /// <summary>
    /// Repeats the observable sequence.
    /// </summary>
    /// <param name="count">[Optional] The number of times to repeat the sequence. If not specified, the sequence is repeated indefinitely.</param>
    /// <returns>The observable sequence producing the elements of the given sequence repeatedly.</returns>
    return this;
};
observableProto.retry = function (retryCount) {
    /// <summary>
    /// Repeats the source observable sequence until it successfully terminates.
    /// </summary>
    /// <param name="retryCount">[Optional] Number of times to repeat the sequence. If not specified, the sequence is repeated indefinitely as long as errors occur.</param>
    /// <returns>The observable sequence producing the elements of the given sequence repeatedly as long as errors occur.</returns>
    return this;
};
Observable.repeat = function (value, repeatCount, scheduler) {
    /// <summary>
    /// Generates an observable sequence that repeats the given element the specified number of times.
    /// </summary>
    /// <param name="value">The element to repeat.</param>
    /// <param name="repeatCount">The number of times to repeat the element.</param>
    /// <param name="scheduler">[Optional] The scheduler to run the producer loop on. If not specified, the current thread scheduler is used.</param>
    /// <returns>An observable sequence that repeats the given element the specified number of times.</returns>
    return new Observable();
};
observableProto.select = function (selector) {
    /// <summary>
    /// Projects each element of an observable sequence into a new form by incorporating the element’s index with the specified source and selector.
    /// </summary>
    /// <param name="selector">A transform function to apply to each source element; the second parameter of the function represents the index of the source element.</param>
    /// <returns>An observable sequence into a new form.</returns>
    return this;
};
observableProto.where = function (predicate) {
    /// <summary>
    /// Filters the elements of an observable sequence based on a predicate.
    /// </summary>
    /// <param name="predicate">A function to test each source element for a condition; the second parameter of the function represents the index of the source element.</param>
    /// <returns>An observable sequence that contains elements from the input sequence that satisfy the condition.</returns>
    return this;
};
observableProto.groupByUntil = function (keySelector, elementSelector, durationSelector, keySerializer) {
    /// <summary>
    /// Groups the elements of an observable sequence according to a specified key selector function and comparer and selects the resulting elements by using a specified function. A duration selector function is used to control the lifetime of groups.
    /// </summary>
    /// <param name="keySelector">A function to extract the key for each element.</param>
    /// <param name="elementSelector">[Optional] A function to map each source element to an element in an observable group. If not specified, this defaults to the identity function.</param>
    /// <param name="durationSelector">A function to signal the expiration of a group.</param>
    /// <param name="keySerializer">[Optional] A function to serialize the key to a string for comparison purposes. If not specified, this defaults to the .toString() method implementation.</param>
    /// <returns>A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.</returns>
    return this;
};
observableProto.groupBy = function (keySelector, elementSelector, keySerializer) {
    /// <summary>
    /// Groups the elements of an observable sequence according to a specified key selector function and comparer and selects the resulting elements by using a specified function
    /// </summary>
    /// <param name="keySelector">A function to extract the key for each element.</param>
    /// <param name="elementSelector">[Optional] A function to map each source element to an element in an observable group. If not specified, this defaults to the identity function.</param>
    /// <param name="keySerializer">[Optional] A function to serialize the key to a string for comparison purposes. If not specified, this defaults to the .toString() method implementation.</param>
    /// <returns>A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.</returns>
    return this;
};
observableProto.take = function (count, scheduler) {
    /// <summary>
    /// Returns a specified number of contiguous values from the start of an observable sequence.
    /// </summary>
    /// <param name="count">The number of elements to return.</param>
    /// <param name="scheduler">[Optional] Scheduler used to produce an onCompleted message in case the count parameter is set to 0.</param>
    /// <returns>An observable sequence that contains the specified number of elements from the start of the input sequence.</returns>
    return this;
};
observableProto.skip = function (count) {
    /// <summary>
    /// Bypasses a specified number of values in an observable sequence and then returns the remaining values.
    /// </summary>
    /// <param name="count">The number of elements to skip before returning the remaining elements.</param>
    /// <returns>An observable sequence that contains the elements that occur after the specified index in the input sequence.</returns>
    return this;
};
observableProto.takeWhile = function (predicate) {
    /// <summary>
    /// Returns values from an observable sequence as long as a specified condition is true, and then skips the remaining values.
    /// </summary>
    /// <param name="source">A sequence to return elements from.</param>
    /// <param name="predicate">A function to test each element for a condition; the second parameter of the function represents the index of the source element.</param>
    /// <returns>An observable sequence that contains the elements from the input sequence that occur before the element at which the test no longer passes.</returns>
    return this;
};
observableProto.skipWhile = function (predicate) {
    /// <summary>
    /// Bypasses values in an observable sequence as long as a specified condition is true and then returns the remaining values.
    /// </summary>
    /// <param name="predicate">A function to test each element for a condition; the second parameter of the function represents the index of the source element.</param>
    /// <returns>An observable sequence that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.</returns>
    return this;
};
observableProto.selectMany = function (selector, resultSelector) {
    /// <summary>
    /// Projects each element of an observable sequence to an observable sequence and flattens the resulting observable sequences into one observable sequence.
    /// &#10;
    /// &#10;1 - xs.SelectMany(/* collection selector */ function (x) { return ys(x); }, /* result selector */ function (x, y) { return x + y; })
    /// &#10;2 - xs.SelectMany(/* collection selector */ function (x) { return ys(x); })
    /// &#10;3 - xs.SelectMany(/* inner sequence */ zs)
    /// </summary>
    /// <param name="selector">A transform function to apply to each element.</param>
    /// <param name="resultSelector">[Optional] A transform function to apply to each element of the intermediate sequence.</param>
    /// <returns>An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.</returns>
    return this;
};
observableProto.toArray = function () {
    /// <summary>
    /// Creates an array from an observable sequence.
    /// </summary>
    /// <returns>An observable sequence containing a single element with an array containing all the elements of the source sequence.</returns>
    return this;
};
observableProto.materialize = function () {
    /// <summary>
    /// Materializes the implicit notifications of an observable sequence as explicit notification values.
    /// </summary>
    /// <returns>An observable sequence containing the materialized notification values from the source sequence.</returns>
    return this;
};
observableProto.dematerialize = function () {
    /// <summary>
    /// Dematerializes the explicit notification values of an observable sequence as implicit notifications.
    /// </summary>
    /// <returns>An observable sequence exhibiting the behavior corresponding to the source sequence's notification values.</returns>
    return this;
};
observableProto.asObservable = function () {
    /// <summary>
    /// Hides the identity of an observable sequence.
    /// </summary>
    /// <returns>An observable sequence that hides the identity of the source sequence.</returns>
    return this;
};
observableProto.windowWithCount = function (count, skip) {
    /// <summary>
    /// Projects each element of an observable sequence into zero or more windows which are produced based on element count information.
    /// </summary>
    /// <param name="count">Length of each window.</param>
    /// <param name="skip">[Optional] Number of elements to skip between creation of consecutive windows. If not specified, the skip count corresponds to the count parameter value, resulting in non-overlapping adjacent windows.</param>
    /// <returns>An observable sequence of windows.</returns>
    return this;
};
observableProto.bufferWithCount = function (count, skip) {
    /// <summary>
    /// Projects each element of an observable sequence into zero or more buffers which are produced based on element count information.
    /// </summary>
    /// <param name="count">Length of each buffer.</param>
    /// <param name="skip">[Optional] Number of elements to skip between creation of consecutive buffers. If not specified, the skip count corresponds to the count parameter value, resulting in non-overlapping adjacent buffers.</param>
    /// <returns>An observable sequence of buffers.</returns>
    return this;
};
observableProto.startWith = function () {
    /// <summary>
    /// Prepends a sequence of values to an observable sequence.
    /// &#10;
    /// &#10;E.g. res = xs.startWith(1, 2, 3);
    /// </summary>
    /// <param name="arguments">Values to prepend to the specified sequence.</param>
    /// <returns>The source sequence prepended with the specified values.</returns>
    return this;
};
observableProto.scan = function (seed, accumulator) {
    /// <summary>
    /// Applies an accumulator function over an observable sequence and returns each intermediate result with the specified source, optional seed and accumulator.
    /// &#10;
    /// &#10;1 - scanned = xs.scan(accumulator);
    /// &#10;2 - scanned = xs.scan(0, accumulator);
    /// </summary>    
    /// <param name="seed">[Optional] The initial accumulator value.</param>
    /// <param name="accumulator">An accumulator function to be invoked on each element.</param>
    /// <returns>An observable sequence containing the accumulated values.</returns>
    return this;
};
observableProto.distinctUntilChanged = function (keySelector, comparer) {
    /// <summary>
    /// Returns an observable sequence that contains only distinct contiguous elements according to the keySelector and the comparer.
    /// </summary>
    /// <param name="keySelector">[Optional] A function to compute the comparison key for each element. If not specified, this defaults to the identity function.</param>
    /// <param name="comparer">[Optional] The equality comparer for computed key values. If not specified, this defaults to object comparison using ===.</param>
    /// <returns>An observable sequence only containing the distinct contiguous elements, based on a computed key value, from the source sequence.</returns>
    return this;
};
observableProto.finallyAction = function (finallyAction) {
    /// <summary>
    /// Invokes a specified action after source observable sequence terminates normally or by an exception.
    /// </summary>
    /// <param name="finallyAction">Action to invoke after the source observable sequence terminates.</param>
    /// <returns>Source sequence with the action-invoking termination behavior applied.</returns>
    return this;
};
observableProto.doAction = function (observerOrOnNext, onError, onCompleted) {
    /// <summary>
    /// Invokes an action for each element in the observable sequence, and invokes an action upon graceful or exceptional termination of the observable sequence.
    /// </summary>
    /// <param name="observerOrOnNext">The observer whose methods to invoke as part of the source sequence's observation or the action to invoke for each element in the observable sequence.</param>
    /// <param name="onError">[Optional] The action to invoke upon exceptional termination of the observable sequence.</param>
    /// <param name="onCompleted">[Optional] The action to invoke upon graceful termination of the observable sequence.</param>
    /// <returns>The source sequence with the side-effecting behavior applied.</returns>
    return this;
};
observableProto.skipLast = function (count) {
    /// <summary>
    /// Bypasses a specified number of elements at the end of an observable sequence.
    /// </summary>
    /// <param name="count">Bypasses a specified number of elements at the end of an observable sequence.</param>
    /// <returns>An observable sequence containing the source sequence elements except for the bypassed ones at the end.</returns>
    return this;
};
observableProto.takeLast = function (count) {
    /// <summary>
    /// Returns a specified number of contiguous elements from the end of an observable sequence.
    /// </summary>
    /// <param name="count">Number of elements to take from the end of the source sequence.</param>
    /// <returns>An observable sequence containing the specified number of elements from the of the source sequence.</returns>
    return this;
};
observableProto.ignoreElements = function () {
    /// <summary>
    /// Ignores all values in an observable sequence leaving only the termination messages.
    /// </summary>
    /// <returns>An empty observable sequence that signals termination, successful or exceptional of the source sequence.</returns>
    return this;
};
observableProto.elementAt = function (index) {
    /// <summary>
    /// Returns the element at a specified index in a sequence.
    /// </summary>
    /// <param name="index">The zero-based index of the element to retrieve.</param>
    /// <returns>An observable sequence that produces the element at the specified position in the source sequence.</returns>
    return this;
};
observableProto.elementAtOrDefault = function (index, defaultValue) {
    /// <summary>Returns the element at a specified index in a sequence or a default value if the index is out of range.</summary>
    /// <param name="index">The zero-based index of the element to retrieve.</param>
    /// <param name="defaultValue">[Optional] The default value if the index is out of range. If not specified, the default value used is null.</param>
    /// <returns>An observable sequence that produces the element at the specified position in the source sequence or a default value if the index is outside the bounds of the source sequence.</returns>
    return this;
};
observableProto.defaultIfEmpty = function (defaultValue) {
    /// <summary>
    /// Returns the elements of the specified sequence or the type parameter's default value in a singleton sequence if the sequence is empty.
    /// </summary>
    /// <param name="defaultValue">[Optional] The value to return if the sequence is empty. If not specified, the default value used is null.</param>
    /// <returns>An observable sequence that contains the specified default value if the source is empty; otherwise, the elements of the source itself.</returns>
    return this;
};
observableProto.distinct = function (keySelector, keySerializer) {
    /// <summary>
    /// Returns an observable sequence that contains only distinct elements according to the keySelector.
    /// </summary>
    /// <param name="keySelector">[Optional] A function to compute the comparison key for each element. If not specified, this defaults to the identity function.</param>
    /// <param name="keySerializer">[Optional] A function to compute the key used for comparison. If not specified, this defaults to the .toString() method implementation.</param>
    /// <returns>An observable sequence only containing the distinct elements, based on a computed key value, from the source sequence.</returns>
    return this;
};
observableProto.mergeObservable = function () {
    /// <summary>
    /// Merges an observable sequence of observable sequences into an observable sequence.
    /// </summary>
    /// <returns>The observable sequence that merges the elements of the inner sequences.</returns>
    return this;
};
observableProto.merge = function (maxConcurrentOrOther) {
    /// <summary>
    /// Merges an observable sequence of observable sequences into an observable sequence, limiting the number of concurrent subscriptions to inner sequences.
    /// Or merges two observable sequences into a single observable sequence.
    /// &#10;
    /// &#10;1 - merged = sources.merge(1);
    /// &#10;2 - merged = source.merge(otherSource);  
    /// </summary>
    /// <param name="maxConcurrent">[Optional] Maximum number of inner observable sequences being subscribed to concurrently.</param>
    /// <param name="other">[Optional] Second observable sequence.</param>    
    /// <returns>The observable sequence that merges the elements of the inner sequences.</returns>
    return this;
};
observableProto.switchLatest = function () {
    /// <summary>
    /// Transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
    /// </summary>
    /// <returns>The observable sequence that at any point in time produces the elements of the most recent inner observable sequence that has been received.</returns>
    return this;
};
Observable.merge = function (scheduler) {
    /// <summary>
    /// Merges all the observable sequences into a single observable sequence.
    /// &#10;
    /// &#10;1 - merged = Rx.Observable.merge(/* argument list */ xs, ys, zs);
    /// &#10;2 - merged = Rx.Observable.merge(/* array */ [xs, ys, zs]);
    /// &#10;3 - merged = Rx.Observable.merge(scheduler, /* argument list */ xs, ys, zs);
    /// &#10;4 - merged = Rx.Observable.merge(scheduler, /* array */ [xs, ys, zs]);    
    /// </summary>
    /// <param name="scheduler">[Optional] Scheduler to run the enumeration of the sequence of sources on. If not specified, the immediate scheduler is used.</param>
    /// <param name="arguments">Observable sequences to merge.</param>
    /// <returns>The observable sequence that merges the elements of the observable sequences.</returns>
    return new Observable();
};
observableProto.concat = function () {
    /// <summary>
    /// Concatenates all the observable sequences.
    /// &#10;
    /// &#10;1 - concatenated = xs.concat(/* argument list */ ys, zs);
    /// &#10;2 - concatenated = xs.concat(/* array */ [ys, zs]);
    /// </summary>
    /// <param name="arguments">Observable sequences to concatenate.</param>
    /// <returns>An observable sequence that contains the elements of each given sequence, in sequential order.</returns>
    return this;
};
observableProto.concatObservable = function () {
    /// <summary>
    /// Concatenates an observable sequence of observable sequences.
    /// </summary>
    /// <returns>An observable sequence that contains the elements of each observed inner sequence, in sequential order.</returns>
    return this;
};
Observable.concat = function () {
    /// <summary>
    /// Concatenates all the observable sequences.
    /// &#10;
    /// &#10;1 - concatenated = Rx.Observable.concat(/* argument list */ xs, ys, zs);
    /// &#10;2 - concatenated = Rx.Observable.concat(/* array */ [xs, ys, zs]);
    /// </summary>
    /// <param name="arguments">Observable sequences to concatenate.</param>
    /// <returns>An observable sequence that contains the elements of each given sequence, in sequential order.</returns>
    return new Observable();
};
observableProto.catchException = function (handlerOrSecond) {
    /// <summary>
    /// Continues an observable sequence that is terminated by an exception with the next observable sequence.
    /// &#10;
    /// &#10;1 - xs.catchException(ys)
    /// &#10;2 - xs.catchException(function (ex) { return ys(ex); })
    /// </summary>
    /// <param name="handlerOrSecond">Exception handler function that returns an observable sequence given the error that occurred in the first sequence, or a second observable sequence used to produce results when an error occurred in the first sequence.</param>
    /// <returns>An observable sequence containing the first sequence's elements, followed by the elements of the handler sequence in case an exception occurred.</returns>
    return this;
};
Observable.catchException = function () {
    /// <summary>
    /// Continues an observable sequence that is terminated by an exception with the next observable sequence.
    /// &#10;
    /// &#10;1 - res = Rx.Observable.catchException(/* argument list */ xs, ys, zs);
    /// &#10;2 - res = Rx.Observable.catchException(/* array */ [xs, ys, zs]);
    /// </summary>
    /// <param name="arguments">Observable sequences to catch exceptions for.</param>
    /// <returns>An observable sequence containing elements from consecutive source sequences until a source sequence terminates successfully.</returns>
    return new Observable();
};
observableProto.onErrorResumeNext = function (second) {
    /// <summary>
    /// Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
    /// </summary>
    /// <param name="second">Second observable sequence used to produce results after the first sequence terminates.</param>
    /// <returns>An observable sequence that concatenates the first and second sequence, even if the first sequence terminates exceptionally.</returns>
    return this;
};
Observable.onErrorResumeNext = function () {
    /// <summary>
    /// Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
    /// &#10;
    /// &#10;1 - res = Rx.Observable.onErrorResumeNext(/* argument list */ xs, ys, zs);
    /// &#10;1 - res = Rx.Observable.onErrorResumeNext(/* array */ [xs, ys, zs]);
    /// </summary>
    /// <param name="arguments">Observable sequences to concatenate.</param>
    /// <returns>An observable sequence that concatenates the source sequences, even if a sequence terminates exceptionally.</returns>
    return new Observable();
};
observableProto.zip = function (/* args ... , resultSelector */) {
    /// <summary>
    /// Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences have produced an element at a corresponding index.
    /// </summary>
    /// <param name="resultSelector">Function to invoke for each series of elements at corresponding indexes in the sources.</param>
    /// <returns>An observable sequence containing the result of combining elements of the sources using the specified result selector function.</returns>
    return this;
};
observableProto.combineLatest = function (/* args ... , resultSelector */) {
    /// <summary>
    /// Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences produces an element.
    /// </summary>
    /// <param name="resultSelector">Function to invoke whenever any of the sources produces an element.</param>
    /// <returns>An observable sequence containing the result of combining elements of the sources using the specified result selector function.</returns>
    return this;
};
observableProto.takeUntil = function (other) {
    /// <summary>
    /// Returns the values from the source observable sequence until the other observable sequence produces a value.
    /// </summary>
    /// <param name="other">Observable sequence that terminates propagation of elements of the source sequence.</param>
    /// <returns>An observable sequence containing the elements of the source sequence up to the point the other sequence interrupted further propagation.</returns>
    return this;
};
observableProto.skipUntil = function (other) {
    /// <summary>
    /// Returns the values from the source observable sequence only after the other observable sequence produces a value.
    /// </summary>
    /// <param name="other">The observable sequence that triggers propagation of elements of the source sequence.</param>
    /// <returns>An observable sequence containing the elements of the source sequence starting from the point the other sequence triggered propagation.</returns>
    return this;
};
Observable.amb = function () {
    /// <summary>
    /// Propagates the observable sequence that reacts first.
    /// &#10;
    /// &#10;E.g. winner = Rx.Observable.amb(xs, ys, zs);
    /// </summary>
    /// <param name="arguments">Observable sources competing to react first.</param>
    /// <returns>An observable sequence that surfaces any of the given sequences, whichever reacted first.</returns>
    return new Observable();
};
observableProto.amb = function (rightSource) {
    /// <summary>
    /// Propagates the observable sequence that reacts first.
    /// </summary>
    /// <param name="second">Second observable sequence.</param>
    /// <returns>An observable sequence that surfaces either of the given sequences, whichever reacted first.</returns>
    return this;
};
observableProto.observerOn = function (scheduler) {
    /// <summary>
    /// Asynchronously notify observers on the specified scheduler.
    /// </summary>
    /// <param name="scheduler">Scheduler to notify observers on.</param>
    /// <returns>The source sequence whose observations happen on the specified scheduler.</returns>    
    return this;
};

observableProto.subscribeOn = function (scheduler) {
    /// <summary>
    /// Asynchronously subscribes and unsubscribes observers on the specified scheduler.
    /// </summary>
    /// <param name="scheduler">Scheduler to perform subscription and unsubscription actions on.</param>
    /// <returns>The source sequence whose subscriptions and unsubscriptions happen on the specified scheduler.</returns>    
    return this;
};
})(this);
