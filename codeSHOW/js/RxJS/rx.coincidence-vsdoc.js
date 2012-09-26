/**
 * Copyright (c) Microsoft Corporation.  All rights reserved.
 * This code is licensed by Microsoft Corporation under the terms
 * of the MICROSOFT REACTIVE EXTENSIONS FOR JAVASCRIPT AND .NET LIBRARIES License.
 * See http://go.microsoft.com/fwlink/?LinkID=220762.
 */

(function (global) {
    var root = global.Rx
    ,   Observable = root.Observable
    ,   observableProto = Observable.prototype;

observableProto.join = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
    /// <summary>
    /// Correlates the elements of two sequences based on overlapping durations.
    /// </summary>
    /// <param name="right">The right observable sequence to join elements for.</param>
    /// <param name="leftDurationSelector">A function to select the duration (expressed as an observable sequence) of each element of the left observable sequence, used to determine overlap.</param>
    /// <param name="rightDurationSelector">A function to select the duration (expressed as an observable sequence) of each element of the right observable sequence, used to determine overlap.</param>
    /// <param name="resultSelector">A function invoked to compute a result element for any two overlapping elements of the left and right observable sequences. The parameters passed to the function correspond with the elements from the left and right source sequences for which overlap occurs.</param>
    /// <returns>An observable sequence that contains result elements computed from source elements that have an overlapping duration.</returns>
    return new Observable();
};
observableProto.groupJoin = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
    /// <summary>
    /// Correlates the elements of two sequences based on overlapping durations, and groups the results.
    /// </summary>
    /// <param name="right">The right observable sequence to join elements for.</param>
    /// <param name="leftDurationSelector">A function to select the duration (expressed as an observable sequence) of each element of the left observable sequence, used to determine overlap.</param>
    /// <param name="rightDurationSelector">A function to select the duration (expressed as an observable sequence) of each element of the right observable sequence, used to determine overlap.</param>
    /// <param name="resultSelector">A function invoked to compute a result element for any element of the left sequence with overlapping elements from the right observable sequence. The first parameter passed to the function is an element of the left sequence. The second parameter passed to the function is an observable sequence with elements from the right sequence that overlap with the left sequence's element.</param>
    /// <returns>An observable sequence that contains result elements computed from source elements that have an overlapping duration.</returns>
    return new Observable();
};
observableProto.buffer = function (bufferOpeningsOrClosingSelector, bufferClosingSelector) {
    /// <summary>
    /// Projects each element of an observable sequence into zero or more buffers.
    /// </summary>
    /// <param name="bufferOpeningsOrClosingSelector">Observable sequence whose elements denote the creation of new windows, or, a function invoked to define the boundaries of the produced windows (a new window is started when the previous one is closed, resulting in non-overlapping windows).</param>
    /// <param name="bufferClosingSelector">[Optional] A function invoked to define the closing of each produced window. If a closing selector function is specified for the first parameter, this parameter is ignored.</param>
    /// <returns>An observable sequence of windows.</returns>
    return new Observable();
};
observableProto.window = function (windowOpeningsOrClosingSelector, windowClosingSelector) {
    /// <summary>
    /// Projects each element of an observable sequence into zero or more windows.
    /// </summary>
    /// <param name="windowOpeningsOrClosingSelector">Observable sequence whose elements denote the creation of new windows, or, a function invoked to define the boundaries of the produced windows (a new window is started when the previous one is closed, resulting in non-overlapping windows).</param>
    /// <param name="windowClosingSelector">[Optional] A function invoked to define the closing of each produced window. If a closing selector function is specified for the first parameter, this parameter is ignored.</param>
    /// <returns>An observable sequence of windows.</returns>
    return new Observable();
};
})(this);
