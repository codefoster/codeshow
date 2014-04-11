/**
* Copyright (c) Microsoft Corporation.  All rights reserved.
* This code is licensed by Microsoft Corporation under the terms
* of the MICROSOFT REACTIVE EXTENSIONS FOR JAVASCRIPT AND .NET LIBRARIES License.
* See http://go.microsoft.com/fwlink/?LinkID=220762.
*/

(function (global) {
    var root = global.Rx, Observable = root.Observable, observableProto = Observable.prototype;

var ReactiveTest = root.ReactiveTest = {
    created: 100,
    subscribed: 200,
    disposed: 1000,
    onNext: function (ticks, value) {
        /// <summary>
        /// Factory method for a recorded onNext notification at a given time with a given value.
        /// </summary>
        /// <param name="ticks">Recorded virtual time the onNext notification occurs.</param>
        /// <param name="value">Recorded value stored in the onNext notification.</param>
        /// <returns>Recorded onNext notification.</returns>
        return new Recorded();
    },
    onError: function (ticks, exception) {
        /// <summary>
        /// Factory method for a recorded onError notification at a given time with a given error.
        /// </summary>
        /// <param name="ticks">Recorded virtual time the onError notification occurs.</param>
        /// <param name="exception">Recorded exception stored in the onError notification.</param>
        /// <returns>Recorded onError notification.</returns>
        return new Recorded();
    },
    onCompleted: function (ticks) {
        /// <summary>
        /// Factory method for a recorded onCompleted notification at a given time.
        /// </summary>
        /// <param name="ticks">Recorded virtual time the onCompleted notification occurs.</param>
        /// <returns>Recorded onCompleted notification.</returns>
        return new Recorded();
    },
    subscribe: function (start, end) {
        /// <summary>
        /// Factory method for a recorded subscription.
        /// </summary>
        /// <param name="start">Virtual time indicating when the subscription was created.</param>
        /// <param name="end">[Optional] Virtual time indicating when the subscription was disposed. If not specified, Number.MAX_VALUE is used.</param>
        /// <returns>Subscription object.</returns>
        return new Subscription();
    }
};
var Recorded = root.Recorded = (function () {
    function Recorded(time, value, comparer) {
        /// <summary>
        /// Creates a new object recording the production of the specified value at the given virtual time.
        /// </summary>
        /// <param name="time">Virtual time the value was produced on.</param>
        /// <param name="value">Value that was produced.</param>
        /// <param name="comparer">Comparer function used to compare values. If not specified, this defaults to object comparison using ===.</param>
    }
    Recorded.prototype.equals = function (other) {
        /// <summary>
        /// Checks whether the given object is equal to the current instance.
        /// </summary>
        /// <param name="obj">Object to check for equality.</param>
        /// <returns>true if both objects are equal; false otherwise.</returns>
        return false;
    };
    Recorded.prototype.toString = function () {
        /// <summary>
        /// Gets a friendly string representation of the current instance.
        /// </summary>
        /// <returns>String representation.</returns>
        return "";
    };
    return Recorded;
})();
var Subscription = root.Subscription = (function () {
    function Subscription(start, end) {
        /// <summary>
        /// Creates a new subscription object.
        /// </summary>
        /// <param name="subscribe">Virtual time at which the subscription occurred.</param>
        /// <param name="end">[Optional] Virtual time indicating when the subscription was disposed. If not specified, Number.MAX_VALUE is used.</param>
    }
    Subscription.prototype.equals = function (other) {
        /// <summary>
        /// Checks whether the given subscription is equal to the current instance.
        /// </summary>
        /// <param name="other">Subscription object to check for equality.</param>
        /// <returns>true if both objects are equal; false otherwise.</returns>
        return false;
    };
    Subscription.prototype.toString = function () {
        /// <summary>
        /// Gets a friendly string representation of the current instance.
        /// </summary>
        /// <returns>String representation.</returns>
		return "";
    };
    return Subscription;
})();
var MockObserver = root.MockObserver = (function () {
    inherits(MockObserver, root.Observer);
    function MockObserver(scheduler) {
    }
    MockObserver.prototype.onNext = function (value) {
        /// <summary>
        /// Notifies the test observer by supplying a new sequence element, and adding it as a Notification onNext object to the messages field.
        /// </summary>
        /// <param name="value">New sequence element.</param>
    };
    MockObserver.prototype.onError = function (exception) {
        /// <summary>
        /// Notifies the observer about an error that occurred in the sequence, and adding it as a Notification onError object to the messages field.
        /// </summary>
        /// <param name="exception">The error object.</param>
    };
    MockObserver.prototype.onCompleted = function () {
        /// <summary>
        /// Notifies the observer of the termination of the sequence, and adding it as a Notification onCompleted object to the messages field.
        /// </summary>
    };
    return MockObserver;
})();
var HotObservable = (function () {
    inherits(HotObservable, Observable);
    function HotObservable(scheduler, messages) {
        var message, notification, i, observable = this;
        this.scheduler = scheduler;
        this.messages = messages;
        this.subscriptions = [];
        this.observers = [];
        for (i = 0; i < this.messages.length; i++) {
            message = this.messages[i];
            notification = message.value;
            (function (innerNotification) {
                scheduler.scheduleAbsolute(null, message.time, function () {
                    for (var j = 0; j < observable.observers.length; j++) {
                        innerNotification.accept(observable.observers[j]);
                    }
                    return disposableEmpty;
                });
            })(notification);
        }
    }
    HotObservable.prototype._subscribe = function (observer) {
        var index, observable = this;
        this.observers.push(observer);
        this.subscriptions.push(new Subscription(this.scheduler.clock));
        index = this.subscriptions.length - 1;
        return disposableCreate(function () {
            removeItem.call(observable.observers, observer);
            return observable.subscriptions[index] = new Subscription(observable.subscriptions[index].subscribe, observable.scheduler.clock);
        });
    };
    return HotObservable;
})();
var ColdObservable = (function () {
    inherits(ColdObservable, Observable);
    function ColdObservable(scheduler, messages) {
        ColdObservable.base.constructor.call(this);
        this.scheduler = scheduler;
        this.messages = messages;
        this.subscriptions = [];
    }
    ColdObservable.prototype._subscribe = function (observer) {
        var d, index, message, notification, observable = this, i;
        this.subscriptions.push(new Subscription(this.scheduler.clock));
        index = this.subscriptions.length - 1;
        d = new CompositeDisposable();
        for (i = 0; i < this.messages.length; i++) {
            message = this.messages[i];
            notification = message.value;
            (function (innerNotification) {
                d.add(observable.scheduler.scheduleRelative(null, message.time, function () {
                    innerNotification.accept(observer);
                    return disposableEmpty;
                }));
            })(notification);
        }
        return disposableCreate(function () {
            observable.subscriptions[index] = new Subscription(observable.subscriptions[index].subscribe, observable.scheduler.clock);
            d.dispose();
        });
    };
    return ColdObservable;
})();
var TestScheduler = root.TestScheduler = (function () {
    inherits(TestScheduler, VirtualTimeScheduler);
    function TestScheduler() {
        /// <summary>
        /// Creates a new test scheduler that uses virtual time to simulate real time.
        /// </summary>
    }
    TestScheduler.prototype.scheduleAbsolute = function (state, dueTime, action) {
        /// <summary>
        /// Schedules an action to be executed at dueTime.
        /// </summary>
        /// <param name="state">State passed to the action to be executed.</param>
        /// <param name="action">Action to be executed.</param>
        /// <param name="dueTime">Absolute time (specified as a Date object) at which to execute the action.</param>
        /// <returns>The disposable object used to cancel the scheduled action (best effort).</returns>
        return new Disposable();
    };
    TestScheduler.prototype.add = function (absolute, relative) {
        /// <summary>
        /// Adds a relative time to an absolute time value.
        /// </summary>
        /// <param name="absolute">Absolute time (specified as a Date object) value.</param>
        /// <param name="relative">Relative time (specified in milliseconds) value to add.</param>
        /// <returns>The resulting absolute time sum value.</returns>
        return absolute + relative;
    };
    TestScheduler.prototype.toDateTimeOffset = function (absolute) {
        /// <summary>
        /// Converts the absolute time value to the number of milliseconds since January 1, 1970.
        /// </summary>
        /// <param name="absolute">Absolute time value to convert.</param>
        /// <returns>The number of milliseconds since January 1, 1970.</returns>
        return 0;
    };
    TestScheduler.prototype.toRelative = function (timeSpan) {
        /// <summary>
        /// Converts the time span value (specified in milliseconds) to a relative time value.
        /// </summary>
        /// <param name="timeSpan">Time span value (specified in milliseconds) to convert.</param>
        /// <returns>The corresponding relative time value.</returns>
        return timeSpan;
    };
    TestScheduler.prototype.startWithTiming = function (create, created, subscribed, disposed) {
        /// <summary>
        /// Starts the test scheduler.
        /// </summary>
        /// <param name="create">Factory method to create an observable sequence.</param>
        /// <param name="created">Virtual time at which to invoke the factory to create an observable sequence.</param>
        /// <param name="subscribed">Virtual time at which to subscribe to the created observable sequence.</param>
        /// <param name="disposed">Virtual time at which to dispose the subscription.</param>
        /// <returns>Testable observer with recordings of notifications that occurred.</returns>
        return this.createObserver();
    };
    TestScheduler.prototype.startWithDispose = function (create, disposed) {
        /// <summary>
        /// Starts the test scheduler.
        /// </summary>
        /// <param name="create">Factory method to create an observable sequence.</param>
        /// <param name="disposed">Virtual time at which to dispose the subscription.</param>
        /// <returns>Testable observer with recordings of notifications that occurred.</returns>
        return this.startWithTiming(create, ReactiveTest.created, ReactiveTest.subscribed, disposed);
    };
    TestScheduler.prototype.startWithCreate = function (create) {
        /// <summary>
        /// Starts the test scheduler.
        /// </summary>
        /// <param name="create">Factory method to create an observable sequence.</param>
        /// <returns>Testable observer with recordings of notifications that occurred.</returns>
        return this.startWithTiming(create, ReactiveTest.created, ReactiveTest.subscribed, ReactiveTest.disposed);
    };
    TestScheduler.prototype.createHotObservable = function () {
        /// <summary>
        /// Creates a hot observable.
        /// </summary>
        /// <param name="messages">Notifications to surface through the created sequence, specified as an Array or a series of arguments.</param>
        /// <returns>Hot observable exhibiting the specified message behavior.</returns>
        return new HotObservable();
    };
    TestScheduler.prototype.createColdObservable = function () {
        /// <summary>
        /// Creates a cold observable.
        /// </summary>
        /// <param name="messages">Notifications to surface through the created sequence, specified as an Array or a series of arguments.</param>
        /// <returns>Cold observable exhibiting the specified message behavior.</returns>
        return new ColdObservable();
    };
    TestScheduler.prototype.createObserver = function () {
        /// <summary>
        /// Creates a testable observer.
        /// </summary>
        /// <returns>New testable observer object.</returns>
        return new MockObserver(this);
    };
    TestScheduler.prototype.scheduleWithTime = function (action, time) {
        /// <summary>
        /// Schedules an action to be executed at the specified time.
        /// </summary>
        /// <param name="action">Action to be executed.</param>
        /// <param name="dueTime">Relative virtual time at which to execute the action.</param>
        /// <returns>The disposable object used to cancel the scheduled action (best effort).</returns>
        return new Disposable();
    };
    return TestScheduler;
})();
})(this);
