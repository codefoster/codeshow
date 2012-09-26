/**
 * Copyright (c) Microsoft Corporation.  All rights reserved.
 * This code is licensed by Microsoft Corporation under the terms
 * of the MICROSOFT REACTIVE EXTENSIONS FOR JAVASCRIPT AND .NET LIBRARIES License.
 * See http://go.microsoft.com/fwlink/?LinkID=220762.
 */

(function (global) {
    var root = global.Rx, Observable = root.Observable, observableProto = Observable.prototype;

observableProto.aggregate = function (seed, accumulator) {
    /// <summary>
    /// Applies an accumulator function over an observable sequence. The specified seed value is used as the initial accumulator value.
    /// &#10;
    /// &#10;1 - scanned = xs.aggregate(accumulator);
    /// &#10;2 - scanned = xs.aggregate(0, accumulator);
    /// </summary>  
    /// <param name="seed">[Optional] The initial accumulator value.</param>
    /// <param name="accumulator">An accumulator function to be invoked on each element.</param>
    /// <returns>An observable sequence containing a single element with the final accumulator value.</returns>
    return this;
};
observableProto.any = function (predicate) {
    /// <summary>
    /// Determines whether any element of an observable sequence satisfies a condition.
    /// </summary>
    /// <param name="predicate">[Optional] A function to test each element for a condition. If not specified, the operator tests for the sequence being non-empty.</param>
    /// <returns>An observable sequence containing a single Boolean value determining whether any elements in the source sequence pass the test in the specified predicate, or (when no predicate is specified) whether the sequence is non-empty.</returns>
    return this;
};
observableProto.all = function (predicate) {
    /// <summary>
    /// Determines whether all elements of an observable sequence satisfy a condition.
    /// </summary>
    /// <param name="predicate">A function to test each element for a condition.</param>
    /// <returns>An observable sequence containing a single Boolean value determining whether all elements in the source sequence pass the test in the specified predicate.</returns>
    return this;
};
observableProto.contains = function (value, comparer) {
    /// <summary>
    /// Determines whether an observable sequence contains a specified element.
    /// </summary>
    /// <param name="value">The value to locate in the sequence.</param>
    /// <param name="comparer">[Optional] An equality comparer to compare elements. If not specified, this defaults to object comparison using ===.</param>
    /// <returns>An observable sequence containing a single Boolean value determining whether the source sequence contains an element that has the specified value.</returns>
    return this;
};
observableProto.count = function () {
    /// <summary>
    /// Returns an observable sequence containing an integer value that represents the total number of elements in an observable sequence.
    /// </summary>
    /// <returns>An observable sequence containing a single element with the number of elements in the input sequence.</returns>
    return this;
};
observableProto.isEmpty = function () {
    /// <summary>
    /// Determines whether an observable sequence is empty.
    /// </summary>
    /// <returns>An observable sequence containing a single element determining whether the source sequence is empty.</returns>    
    return this;
};
observableProto.sum = function () {
    /// <summary>
    /// Computes the sum of a sequence of numeric values.
    /// </summary>
    /// <returns>An observable sequence containing a single element with the sum of the values in the sequence.</returns>
    return this;
};
observableProto.minBy = function (keySelector, comparer) {
    /// <summary>
    /// Returns the elements in an observable sequence with the minimum key value.
    /// </summary>
    /// <param name="keySelector">Key selector function.</param>
    /// <param name="comparer">[Optional] Comparer used to compare key values. If not specified, this defaults to comparison of two objects by subtraction using -.</param>
    /// <returns>An observable sequence containing a list of zero or more elements that have a minimum key value.</returns>
    return this;
};
observableProto.min = function (comparer) {
    /// <summary>
    /// Returns the minimum element in an observable sequence.
    /// </summary>
    /// <param name="comparer">[Optional] Comparer used to compare elements. If not specified, this defaults to comparison of two objects by subtraction using -.</param>
    /// <returns>An observable sequence containing a single element with the minimum element in the sequence.</returns>
    return this;
};
observableProto.maxBy = function (keySelector, comparer) {
    /// <summary>
    /// Returns the elements in an observable sequence with the maximum key value.
    /// </summary>
    /// <param name="keySelector">Key selector function.</param>
    /// <param name="comparer">[Optional] Comparer used to compare key values. If not specified, this defaults to comparison of two objects by subtraction using -.</param>
    /// <returns>An observable sequence containing a list of zero or more elements that have a maximum key value.</returns>
    return this;
};
observableProto.max = function (comparer) {
    /// <summary>
    /// Returns the maximum element in an observable sequence.
    /// </summary>
    /// <param name="comparer">[Optional] Comparer used to compare elements. If not specified, this defaults to comparison of two objects by subtraction using -.</param>
    /// <returns>An observable sequence containing a single element with the maximum element in the sequence.</returns>
    return this;
};
observableProto.average = function () {
    /// <summary>
    /// Computes the average of an observable sequence of numeric values.
    /// </summary>
    /// <returns>An observable sequence containing a single element with the average of the sequence of values.</returns>
    return this;
};
observableProto.sequenceEqual = function (second, comparer) {
    /// <summary>
    /// Determines whether two sequences are equal by comparing the elements pairwise.
    /// </summary>
    /// <param name="second">Second observable sequence to compare.</param>
    /// <param name="comparer">[Optional] Comparer used to compare elements of both sequences. If not specified, this defaults to object comparison using ===.</param>
    /// <returns>An observable sequence that contains a single element which indicates whether both sequences are equal.</returns>
    return this;
};
})(this);
