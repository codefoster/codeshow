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

    WinJS.Namespace.define("Ocho.Array", {
        
    });
    
    WinJS.Namespace.define("Ocho.AppBar", {
        defineAppBarButtons: function (appbar, buttons, options) {
            //TODO: pass appbar in as an option
            //TODO: pass the buttons in as an options too
            //TODO: if the appbar is not passed in, then look for a div with the id of 'appbar' and use it, if that's not found then create one
            //TODO: default some of these properties (like extraClass and tooltip)
            
            if (!options) {
                options = {};
                options.clearFirst = true;
            }

            if (options.clearFirst) {
                var eb = q("button", appbar, { forceArray: true });
                if (eb) eb.forEach(function (button) { appbar.removeChild(button); });
            }

            if (buttons.length > 0) {
                var b, ab;
                buttons.forEach(function (i) {
                    if (!i.options) i.options = {};

                    b = document.createElement("button");
                    b.onclick = i.click;
                    if (i.options.onSelectionOf) {
                        i.options.onSelectionOf.winControl.onselectionchanged = function (args) {
                            b.style.display = i.options.onSelectionOf.winControl.selection.count() > 0 ? "block" : "none";
                        };
                        i.options.onSelectionOf.winControl.onselectionchanged();
                    }
                    ab = new WinJS.UI.AppBarCommand(b, {
                        id: i.id,
                        label: i.label,
                        icon: i.icon,
                        section: i.section,
                        extraClass: i.extraClass ? i.extraClass : null,
                        tooltip: i.tooltip ? i.tooltip : null
                    });
                    appbar.appendChild(b);
                });
            }
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