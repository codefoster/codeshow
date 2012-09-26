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

Observable.ifThen = function (condition, thenSource, elseSourceOrScheduler) {
    /// <summary>
    /// Determines whether an observable collection contains values.
    /// &#10;
    /// &#10;1 - res = Rx.Observable.ifThen(condition, obs1);
    /// &#10;1 - res = Rx.Observable.ifThen(condition, obs1, obs2);
    /// &#10;1 - res = Rx.Observable.ifThen(condition, obs1, scheduler);    
    /// </summary>
    /// <param name="condition">The condition which determines if the thenSource or elseSource will be run.</param>
    /// <param name="thenSource">The observable sequence that will be run if the condition function returns true.</param>
    /// <param name="elseSource">
    ///     [Optional] The observable sequence that will be run if the condition function returns false. If this is not provided, it defaults to Rx.Observabe.Empty with the specified scheduler.
    /// </param>     
    /// <returns>An observable sequence which is either the thenSource or elseSource.</returns>
    return new Observable();
};

Observable.whileDo = function (condition, source) {
    /// <summary>
    /// Repeats source as long as condition holds emulating a while loop.
    /// </summary>
    /// <param name="condition">The condition which determines if the source will be repeated.</param>
    /// <param name="source">The observable sequence that will be run if the condition function returns true.</param>
    /// <returns>An observable sequence which is repeated as long as the condition holds.</returns>  
    return new Observable();
};

observableProto.doWhile = function (condition) {
    /// <summary>
    /// Repeats source as long as condition holds emulating a do while loop.
    /// </summary>
    /// <param name="condition">The condition which determines if the source will be repeated.</param>
    /// <param name="source">The observable sequence that will be run if the condition function returns true.</param>
    /// <returns>An observable sequence which is repeated as long as the condition holds.</returns>    
    return this;
};

Observable.switchCase = function (selector, sources, defaultSourceOrScheduler) {
    /// <summary>
    /// Uses selector to determine which source in sources to use.
    /// &#10;
    /// &#10;1 - res = Rx.Observable.switchCase(selector, { '1': obs1, '2': obs2 });
    /// &#10;1 - res = Rx.Observable.switchCase(selector, { '1': obs1, '2': obs2 }, obs0);
    /// &#10;1 - res = Rx.Observable.switchCase(selector, { '1': obs1, '2': obs2 }, scheduler);  
    /// </summary>
    /// <param name="selector">The function which extracts the value for to test in a case statement.</param>
    /// <param name="sources">A object which has keys which correspond to the case statement labels.</param>
    /// <param name="elseSource">
    ///     [Optional] The observable sequence that will be run if the sources are not matched. If this is not provided, it defaults to Rx.Observabe.Empty with the specified scheduler.
    /// </param>     
    /// <returns>An observable sequence which is determined by a case statement.</returns>    
    return new Observable();
};

Observable.forIn = function (sources, resultSelector) {
    /// <summary>
    /// Concatenates the observable sequences obtained by running the specified result selector for each element in source.
    /// </summary>
    /// <param name="sources">An array of values to turn into an observable sequence.</param>
    /// <param name="resultSelector">A function to apply to each item in the sources array to turn it into an observable sequence.</param>
    /// <returns>An observable sequence from the concatenated observable sequences.</returns>      
    return new Observable();
}
Observable.prototype.expand = function (selector, scheduler) {
    /// <summary>
    /// Expands an observable sequence by recursively invoking selector.
    /// </summary>
    /// <param name="selector">Selector function to invoke for each produced element, resulting in another sequence to which the selector will be invoked recursively again.</param>
    /// <param name="scheduler">[Optional] Scheduler on which to perform the expansion. If not provided, this defaults to the current thread scheduler.</param>
    /// <returns>An observable sequence containing all the elements produced by the recursive expansion.</returns>
    return this;
};
Observable.forkJoin = function () {
    /// <summary>
    /// Runs all observable sequences in parallel and collect their last elements.
    /// &#10;
    /// &#10;1 - res = Rx.Observable.forkJoin([obs1, obs2]);
    /// &#10;1 - res = Rx.Observable.forkJoin(obs1, obs2, ...);  
    /// </summary>
    /// <returns>An observable sequence with an array collecting the last elements of all the input sequences.</returns>
    return new Observable();
};

Observable.prototype.forkJoin = function (second, resultSelector) {
    /// <summary>
    /// Runs two observable sequences in parallel and combines their last elemenets.
    /// </summary>
    /// <param name="second">Second observable sequence.</param>
    /// <param name="resultSelector">Result selector function to invoke with the last elements of both sequences.</param>
    /// <returns>An observable sequence with the result of calling the selector function with the last elements of both input sequences.</returns>
    return this;
};
observableProto.letBind = function (func) {
    /// <summary>
    /// Bind the source to the parameter without sharing subscription side-effects.
    /// </summary>
    return this;
};
})(this);
