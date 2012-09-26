/**
 * Copyright (c) Microsoft Corporation.  All rights reserved.
 * This code is licensed by Microsoft Corporation under the terms
 * of the MICROSOFT REACTIVE EXTENSIONS FOR JAVASCRIPT AND .NET LIBRARIES License.
 * See http://go.microsoft.com/fwlink/?LinkID=220762.
 */

(function (global) {
    var root = global.Rx
    , Observable = root.Observable
    , observableProto = Observable.prototype;

Pattern = (function () {
    function Pattern() {
    }
    Pattern.prototype.and = function (other) {
        /// <summary>
        /// Creates a pattern that matches the current plan matches and when the specified observable sequences has an available value.
        /// </summary>
        /// <param name="other">Observable sequence to match in addition to the current pattern.</param>
        /// <returns>Pattern object that matches when all observable sequences in the pattern have an available value.</returns>
        return this;
    };
    Pattern.prototype.then = function (selector) {
        /// <summary>
        /// Matches when all observable sequences in the pattern (specified using a chain of and operators) have an available value and projects the values.
        /// </summary>
        /// <param name="selector">Selector that will be invoked with available values from the source sequences, in the same order of the sequences in the pattern.</param>
        /// <returns>Plan that produces the projected values, to be fed (with other plans) to the when operator.</returns>
        return null;
    };
    return Pattern;
})();

observableProto.and = function (right) {
    /// <summary>
    /// Creates a pattern that matches when both observable sequences have an available value.
    /// </summary>
    /// <param name="right">Observable sequence to match with the current sequence.</param>
    /// <returns>Pattern object that matches when both observable sequences have an available value.</returns>
    return new Pattern();
};
observableProto.then = function (selector) {
    /// <summary>
    /// Matches when the observable sequence has an available value and projects the value.
    /// </summary>
    /// <param name="selector">Selector that will be invoked for values in the source sequence.</param>
    /// <returns>Plan that produces the projected values, to be fed (with other plans) to the when operator.</returns>
    return new Pattern().then(selector);
};
Observable.when = function (plans) {
    /// <summary>
    /// Joins together the results from several patterns.
    /// </summary>
    /// <param name="plans">A series of plans (specified as an Array of as a series of arguments) created by use of the Then operator on patterns.</param>
    /// <returns>Observable sequence with the results form matching several patterns.</returns>
    var _plans = arguments.length === 1 && arguments[0] instanceof Array ?
        arguments[0] :
        slice.call(arguments);
    return new Observable();
};
})(this);
