/**
 * Copyright (c) Microsoft Corporation.  All rights reserved.
 * This code is licensed by Microsoft Corporation under the terms
 * of the MICROSOFT REACTIVE EXTENSIONS FOR JAVASCRIPT AND .NET LIBRARIES License.
 * See http://go.microsoft.com/fwlink/?LinkID=220762.
 */

(function (global) {
    var root = global.Rx, Observable = root.Observable, observableProto = Observable.prototype;

Observable.interval = function (period, scheduler) {
    /// <summary>
    /// Returns an observable sequence that produces a value after each period.
    /// </summary>
    /// <param name="period">Period for producing the values in the resulting sequence (specified as an integer denoting milliseconds).</param>
    /// <param name="scheduler">[Optional] Scheduler to run the timer on. If not specified, the timeout scheduler is used.</param>
    /// <returns>An observable sequence that produces a value after each period.</returns>
    return new Observable();
};
Observable.timer = function (dueTime, periodOrScheduler, scheduler) {
    /// <summary>
    /// Returns an observable sequence that produces a value after dueTime has elapsed and then after each period.
    /// </summary>
    /// <param name="dueTime">Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) at which to produce the first value.</param>
    /// <param name="periodOrScheduler">[Optional] Period to produce subsequent values (specified as an integer denoting milliseconds), or the scheduler to run the timer on. If not specified, the resulting timer is not recurring.</param>
    /// <param name="scheduler">[Optional] Scheduler to run the timer on. If not specified, the timeout scheduler is used.</param>
    /// <returns>An observable sequence that produces a value after due time has elapsed and then each period.</returns>
    return new Observable();
};
observableProto.delay = function (dueTime, scheduler) {
    /// <summary>
    /// Time shifts the observable sequence by dueTime. The relative time intervals between the values are preserved.
    /// </summary>
    /// <param name="dueTime">Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) by which to shift the observable sequence.</param>
    /// <param name="scheduler">[Optional] Scheduler to run the delay timers on. If not specified, the timeout scheduler is used.</param>
    /// <returns>Time-shifted sequence.</returns>
    return this;
};
observableProto.throttle = function (dueTime, scheduler) {
    /// <summary>
    /// Ignores values from an observable sequence which are followed by another value before dueTime.
    /// </summary>
    /// <param name="dueTime">Duration of the throttle period for each value (specified as an integer denoting milliseconds).</param>
    /// <param name="scheduler">[Optional] Scheduler to run the throttle timers on. If not specified, the timeout scheduler is used.</param>
    /// <returns>The throttled sequence.</returns>
    return this;
};
observableProto.windowWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
    /// <summary>
    /// Projects each element of an observable sequence into zero or more windows which are produced based on timing information.
    /// &#10;
    /// &#10;1 - res = xs.windowWithTime(1000 /*, scheduler */); // non-overlapping segments of 1 second
    /// &#10;2 - res = xs.windowWithTime(1000, 500 /*, scheduler */); // segments of 1 second with time shift 0.5 seconds
    /// </summary>
    /// <param name="timeSpan">Length of each window (specified as an integer denoting milliseconds).</param>
    /// <param name="timeShiftOrScheduler">[Optional] Interval between creation of consecutive windows (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent windows.</param>
    /// <param name="scheduler">[Optional] Scheduler to run windowing timers on. If not specified, the timeout scheduler is used.</param>
    /// <returns>An observable sequence of windows.</returns>
    return this;
};
observableProto.windowWithTimeOrCount = function (timeSpan, count, scheduler) {
    /// <summary>
    /// Projects each element of an observable sequence into a window that is completed when either it's full or a given amount of time has elapsed.
    /// </summary>
    /// <param name="timeSpan">Maximum time length of a window.</param>
    /// <param name="count">Maximum element count of a window.</param>
    /// <param name="scheduler">[Optional] Scheduler to run windowing timers on. If not specified, the timeout scheduler is used.</param>
    /// <returns>An observable sequence of windows.</returns>
    return this;
};
observableProto.bufferWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
    /// <summary>
    /// Projects each element of an observable sequence into zero or more buffers which are produced based on timing information.
    /// &#10;
    /// &#10;1 - res = xs.bufferWithTime(1000 /*, scheduler */); // non-overlapping segments of 1 second
    /// &#10;2 - res = xs.bufferWithTime(1000, 500 /*, scheduler */); // segments of 1 second with time shift 0.5 seconds
    /// </summary>
    /// <param name="timeSpan">Length of each buffer (specified as an integer denoting milliseconds).</param>
    /// <param name="timeShiftOrScheduler">[Optional] Interval between creation of consecutive buffers (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent buffers.</param>
    /// <param name="scheduler">[Optional] Scheduler to run buffer timers on. If not specified, the timeout scheduler is used.</param>
    /// <returns>An observable sequence of buffers.</returns>
    return this;
};
observableProto.bufferWithTimeOrCount = function (timeSpan, count, scheduler) {
    /// <summary>
    /// Projects each element of an observable sequence into a buffer that is completed when either it's full or a given amount of time has elapsed.
    /// </summary>
    /// <param name="timeSpan">Maximum time length of a buffer.</param>
    /// <param name="count">Maximum element count of a buffer.</param>
    /// <param name="scheduler">[Optional] Scheduler to run bufferin timers on. If not specified, the timeout scheduler is used.</param>
    /// <returns>An observable sequence of buffers.</returns>
    return this;
};
observableProto.timeInterval = function (scheduler) {
    /// <summary>
    /// Records the time interval between consecutive values in an observable sequence.
    /// </summary>
    /// <param name="scheduler">[Optional] Scheduler used to compute time intervals. If not specified, the timeout scheduler is used.</param>
    /// <returns>An observable sequence with time interval information on values.</returns>
    return this;
};
observableProto.timestamp = function (scheduler) {
    /// <summary>
    /// Records the timestamp for each value in an observable sequence.
    /// </summary>
    /// <param name="scheduler">[Optional] Scheduler used to compute timestamps. If not specified, the timeout scheduler is used.</param>
    /// <returns>An observable sequence with timestamp information on values.</returns>
    return this;
};
observableProto.sample = function (intervalOrSampler, scheduler) {
    /// <summary>
    /// Samples the observable sequence at each interval.
    /// </summary>
    /// <param name="source">Source sequence to sample.</param>
    /// <param name="interval">Interval at which to sample (specified as an integer denoting milliseconds).</param>
    /// <param name="scheduler">[Optional] Scheduler to run the sampling timer on. If not specified, the timeout scheduler is used.</param>
    /// <returns>Sampled observable sequence.</returns>
    return this;
};
observableProto.timeout = function (dueTime, other, scheduler) {
    /// <summary>
    /// Returns the source observable sequence or the other observable sequence if dueTime elapses.
    /// </summary>
    /// <param name="dueTime">Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) when a timeout occurs.</param>
    /// <param name="other">[Optional] Sequence to return in case of a timeout. If not specified, a timeout error throwing sequence will be used.</param>
    /// <param name="scheduler">[Optional] Scheduler to run the timeout timers on. If not specified, the timeout scheduler is used.</param>
    /// <returns>The source sequence switching to the other sequence in case of a timeout.</returns>
    return this;
};
Observable.generateWithAbsoluteTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
    /// <summary>
    /// Generates an observable sequence by iterating a state from an initial state until the condition fails.
    /// </summary>
    /// <param name="initialState">Initial state.</param>
    /// <param name="condition">Condition to terminate generation (upon returning false).</param>
    /// <param name="iterate">Iteration step function.</param>
    /// <param name="resultSelector">Selector function for results produced in the sequence.</param>
    /// <param name="timeSelector">Time selector function to control the speed of values being produced each iteration, returning Date values.</param>
    /// <param name="scheduler">[Optional] Scheduler on which to run the generator loop. If not specified, the timeout scheduler is used.</param>
    /// <returns>The generated sequence.</returns>
    return new Observable();
};
Observable.generateWithRelativeTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
    /// <summary>
    /// Generates an observable sequence by iterating a state from an initial state until the condition fails.
    /// </summary>
    /// <param name="initialState">Initial state.</param>
    /// <param name="condition">Condition to terminate generation (upon returning false).</param>
    /// <param name="iterate">Iteration step function.</param>
    /// <param name="resultSelector">Selector function for results produced in the sequence.</param>
    /// <param name="timeSelector">Time selector function to control the speed of values being produced each iteration, returning integer values denoting milliseconds.</param>
    /// <param name="scheduler">[Optional] Scheduler on which to run the generator loop. If not specified, the timeout scheduler is used.</param>
    /// <returns>The generated sequence.</returns>
    return new Observable();
};
Observable.delaySubscription = function (dueTime, scheduler) {
    /// <summary>
    /// Time shifts the observable sequence by delaying the subscription.
    /// </summary>
    /// <param name="dueTime">Absolute or relative time to perform the subscription at.</param>
    /// <param name="scheduler">[Optional] Scheduler to run the subscription delay timer on. If not specified, the timeout scheduler is used.</param>
    /// <returns>Time-shifted sequence.</returns>
    return this;
};
Observable.delayWithSelector = function (subscriptionDelay, delayDurationSelector) {
    /// <summary>
    /// Time shifts the observable sequence based on a subscription delay and a delay selector function for each element.
    /// </summary>
    /// <param name="subscriptionDelay">[Optional] Sequence indicating the delay for the subscription to the source. Set to null or undefined if not specified.</param>
    /// <param name="delayDurationSelector">Selector function to retrieve a sequence indicating the delay for each given element.</param>
    /// <returns>Time-shifted sequence.</returns>
    return this;
};
Observable.throttleWithSelector = function (throttleDurationSelector) {
    /// <summary>
    /// Ignores values from an observable sequence which are followed by another value within a computed throttle duration.
    /// </summary>
    /// <param name="throttleDurationSelector">Selector function to retrieve a sequence indicating the throttle duration for each given element.</param>
    /// <returns>The throttled sequence.</returns>
    return this;
};
Observable.timeoutWithSelector = function() {
    /// <summary>
    /// Returns the source observable sequence, switching to the other observable sequence if a timeout is signaled.
    /// </summary>
    /// <param name="firstTimeout">[Optional] Observable sequence that represents the timeout for the first element. If not provided, this defaults to Observable.never().</param>
    /// <param name="timeoutDurationSelector">Selector to retrieve an observable sequence that represents the timeout between the current element and the next element.</param>
    /// <param name="other">[Optional] Sequence to return in case of a timeout. If not provided, this is set to Observable.throwException(). </param>
    /// <returns>The source sequence switching to the other sequence in case of a timeout.</returns>
};
})(this);
