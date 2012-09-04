/*

ocho.js by codefoster (Jeremy Foster)
codefoster.com
@codefoster
TODO:
 - include license information
 - research what others put in library header
 - add to Nuget

 IDEAS:
 - when setting up a ListView I should be able to set the itemtemplate and header template referencing
   an html fragment instead of a template on the page. The html fragment shouldn't need the Binding.Template
   wrapping it either, just html.
*/

(function () {

    WinJS.Namespace.define("Ocho.Utilities", {
        createGuid: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        query: function (query, context, options) {
            //context should be a dom element... defaults to document
            context = context || document;
            var result = context.querySelectorAll(query);
            if (result.length > 1) return Array.prototype.slice.call(result);
            else if (result.length == 1) return (options && options.forceArray ? [result[0]] : result[0]);
            else return null;
        },

        format: function (s) {
            var args = [];
            for (var i = 1; i < arguments.length; i++) { args.push(arguments[i]); }
            return s.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        },
        
        mix: function () {
            //TODO: test this... I just modified it from http://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method
            var result = {};
            for(var i = 0; i < arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    result[key] = arguments[i][key];
            return result;
        }

    });

    WinJS.Namespace.define("Ocho.Array", {
        
    });
    
    var q = Ocho.Utilities.query; //make this available to the rest of the library

    WinJS.Namespace.define("Ocho.AppBar", {
        defineAppBarButtons: function (options) {
            options = options || {};
            options.clearFirst = options.clearFirst || true;
            options.buttons = options.buttons || [];

            // create an appbar if the caller didn't reference one
            if (!options.appbar) {
                var existingAppBar = q("#appbar");
                if (existingAppBar)
                    options.appbar = existingAppBar;
                else {
                    var divAppBar = document.createElement("div")
                    divAppBar.id = "appbar";
                    q("body").appendChild(divAppBar);
                    options.appbar = new WinJS.UI.AppBar(q("body #appbar"));
                }
            }

            //clearFirst will clear the appbar and recreate (defaults to true)
            if (options.clearFirst) {
                var eb = q("button", appbar, { forceArray: true });
                if (eb) eb.forEach(function (button) { appbar.removeChild(button); });
            }

            //programmatically add buttons to the appbar
            var ab;
            options.buttons.forEach(function (i, index) {
                i.options = i.options || {};
                i.id = i.id || "button" + index;
                i.label = i.label || "button" + index;
                i.section = i.section || "global";
                i.extraClass = i.extraClass || '';
                i.tooltip = i.tooltip || i.label;
                i.icon = i.icon || 'cancel';

                var b = document.createElement("button");
                if (i.click)
                    b.onclick = i.click;
                else if(i.flyout) {
                    b.onclick = function () {
                        //flyout.element.winControl.show(b);
                        //flyout.script.call();
                        //TODO: finish implementing this... accept a flyout in the form of...
                        //  flyout: { element: q("#whatever"), script: function() { //what to do to set up the flyout }}
                    };
                }

                //onSelectionOf can be passed in with the dom element of a listview (or any other control with a numeric
                //'selection' property and the button will only be visible when that control has a selection
                if (i.options.onSelectionOf) {
                    i.options.onSelectionOf.winControl.addEventListener("selectionchanged", function (args) {
                        if (i.options.onSelectionOf.winControl.selection.count() > 0) {
                            b.style.display = "block";
                            appbar.winControl.sticky = true;
                            appbar.winControl.show();
                        }
                        else 
                            b.style.display = "none";
                    });
                    //i.options.onSelectionOf.winControl.selectionchanged();
                }

                //TODO: consider add a visibleIf option that would encapsulate the onSelectionOf but also allow
                //any visibility logic by accepting a function that evaluates to true/false

                ab = new WinJS.UI.AppBarCommand(b, {
                    id: i.id,
                    label: i.label,
                    icon: i.icon,
                    section: i.section,
                    extraClass: i.extraClass,
                    tooltip: i.tooltip
                });
                appbar.appendChild(b);
            });
        },
    });

    WinJS.Namespace.define("Ocho.Navigation", {
        go: function (page, context) {
            WinJS.Navigation.navigate("/pages/" + page + "/" + page + ".html", context);
        },
    });

    WinJS.Namespace.define("Ocho.Logging", {
        clearLog: function() { document.querySelector("div#log").innerHTML = ""; },
        log: function (msg) {
            msg = msg != undefined ? msg : "";
            //TODO: if a div#log does not exist then create one and put it at the end of the body
            //TODO: allow a selector to specify what element(s) will be logged to but default to div#log
            document.querySelector("div#log").innerHTML += msg + "<br/>";
        },
    });
    
})();

//TODO: create a function that will run this and make it take effect
//  like - Ocho.applyExtensions(["array_all", "array_remove", string_format])

Array.prototype.distinct = function (keyFct) {
    var result = [];
    if (!keyFct) keyFct = function(d) { return d; };
    for (var i = 1; i < this.length; i++) {
        var that = this;
        if (!result.some(function (item) { return keyFct(item) === keyFct(that[i]); }))
            result.push(that[i]);
    }
    return result;
};

Array.prototype.remove = function (id) {
    for (var i = 0; i < this.length; i++)
        if (this[i].id === id) return this.splice(i, 1);
};