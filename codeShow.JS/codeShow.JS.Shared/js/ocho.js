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
 - create a function that will run this and make it take effect
   like - Ocho.applyExtensions(["array_all", "array_remove", string_format])
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
            //defaults
            context = context || document;
            options = options || {};
            options.forceArray = options.forceArray || false;

            var result;
            var match = query.match(/^#([^\s,\.,#,\[]+)$/); //if #elementId then use getElementById
            if (match) {
                if (!context.getElementById) context = document;
                return context.getElementById(match[1]);
            } else {
                result = context.querySelectorAll(query);
                if (result.length > 1 || options.forceArray) return Array.prototype.slice.call(result);
                else if (result.length == 1) return (options.forceArray ? [result[0]] : result[0]);
                else return null;
            }
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
            for (var i = 0; i < arguments.length; i++)
                for (var key in arguments[i])
                    if (arguments[i].hasOwnProperty(key))
                        result[key] = arguments[i][key];
            return result;
        },

        isTypeOf: function (obj, type) {
            // inspired by http://mrrena.blogspot.com/2012/05/javascript-better-typeof-accurately.html
            // call returns "[object ????]"
            // slice returns the ???? of the previous line (8th postion, take off closing brace)
            // type values: Object, Null, Undefined, String, Number, Boolean, Date, Array, RegExp, Function...  
            return (Object.prototype.toString.call(obj).slice(8, -1) === type);
        },
        
        hex2rgb: function (col) {
            var r, g, b;
            if (col.charAt(0) == '#') col = col.substr(1);
            r = col.charAt(0) + col.charAt(1);
            g = col.charAt(2) + col.charAt(3);
            b = col.charAt(4) + col.charAt(5);
            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        },

        wait: function (seconds) {
            return new WinJS.Promise(function (complete) {
                setInterval(function () { complete(); }, seconds * 1000);
            });
        }
    });

    WinJS.Namespace.define("Ocho.Array", {
        contains: function (elem, options) {
            options = options || {};
            options.behavior = options.behavior || "exactMatch"; //exactMatch, startsWith, endsWith, contains
            options.caseSensitive = options.caseSensitive || false;
            var term;
            for (var i = 0, length = this.length; i < length; i++) {
                term = this[i];
                if (!options.caseSensitive) { term = term.toUpperCase(); elem = elem.toUpperCase() }
                switch (options.behavior) {
                    case "exactMatch": if(term === elem) return true; break;
                    case "startsWith": if(term.startsWith(elem)) return true; break;
                    case "endsWith": if(term.endsWith(elem)) return true; break;
                    case "contains": if(term.contains(elem)) return true; break;
                }
            }
            return false;
        },
        
        //TODO: see if 'unique' is a more common name for this one
        distinct: function (keyFct) {
            var result = [];
            if (!keyFct) keyFct = function (d) { return d; };
            for (var i = 1; i < this.length; i++) {
                var that = this;
                if (!result.some(function (item) { return keyFct(item) === keyFct(that[i]); }))
                    result.push(that[i]);
            }
            return result;
        },
        
        //TODO: consider naming this one removeById
        remove: function (id) {
            for (var i = 0; i < this.length; i++)
                if (this[i].id === id) return this.splice(i, 1);
        },
        
        //TODO: implement
        //return 'count' random array values
        random: function (count) {
            var that = this;
            count = count || 1; //default count to 1
            this.sort(function () { return 0.5 - Math.random() });
            return this.slice(0, count);
        },

        //TODO: implement
        //return all items the two lists have in common
        //take optional parameter to specify how to compare the items
        union: function (b) {
            b = b || []; //default
            throw "not yet implemented";
        },
        
        //TODO: implement
        //scrambles the order of the elements in the array
        shuffle: function() {
            throw "not yet implemented";
        },
        
        toArray: function () {
            //method 1 (I think this is safer)
            if (!(Array.isArray(this) || this.length)) throw "The object cannot be converted to an array";
            var result = new Array();
            for (var i = 0; i < this.length; i++)
                result.push(this[i]);
            return result;
            
            //method 2 (keeping it around in case it has some advantages)
            //return Array.prototype.slice.call(this);
        },
        
        first: function(fct) {
            fct || (fct = function (item) { return item; });
            var result = this.filter(fct);
            if(result.length > 0) return result[0];
        },

        take: function (count) {
            if (!count || count < 1) throw "count must be a value of 1 or more";
            return this.slice(0,count);
        },
        
        repeat: function (item, repetitions) {
            if ((repetitions == null) || isNaN(repetitions)) repetitions = 1;
            var result = [];
            for (var i = 0; i < repetitions; i++) result.push(item);
            return result;
        },
        removeById: function (id) {
            for (var i = 0; i < this.length; i++)
                if (this[i].id === id) return this.splice(i, 1);
        },
        selectMany: function(fct) {
            var result = [];
            this.forEach(function(item) {
                fct(item).forEach(function (i) { result.push(i); });
            });
            return result;
        }
    });

    WinJS.Namespace.define("Ocho.String", {
        startsWith: function (str) { return (this.match("^" + str) == str); },
        endsWith: function (str) { return (this.match(str + "$") == str); },
        contains: function (str, options) {
            options = options || {};
            if(options.caseSensitive === undefined) options.caseSensitive = true;
            if (!options.caseSensitive)
                return this.toUpperCase().search(str.toUpperCase()) >= 0;
            else
                return (this.search(str) >= 0);
        },
        trim: function () { return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")); },
        pad: function () { throw "not yet implemented"; }
    });

    var q = Ocho.Utilities.query; //make this available to the rest of the library

    // Application bar
    function make() {
        var result;
        var existingAppBar = appbar;
        if (existingAppBar)
            result = existingAppBar;
        else {
            var divAppBar = document.createElement("div");
            divAppBar.id = "appbar";
            q("body").appendChild(divAppBar);
            var appBar = new WinJS.UI.AppBar(q("body #appbar"));
            result = q("body #appbar");
        }
        return result;
    }

    WinJS.Namespace.define("Ocho.AppBar", {
        set: function (options) {
            
            //TODO: put sample method call here

            options = options || {};
            options.clearFirst = options.clearFirst || true;
            options.buttons = options.buttons || [];

            // create an appbar if the caller didn't reference one
            var appbar = (options.appbar ? options.appbar : make());

            if (options.addClass) {
                appbar.classList.add(options.addClass);
            }

            //clearFirst will clear the appbar and recreate (defaults to true)
            if (options.clearFirst) {
                var eb = q("button", appbar, { forceArray: true });
                if (eb) eb.forEach(function (button) { appbar.removeChild(button); });
            }

            //programmatically add buttons to the appbar
            var ab;
            options.buttons.forEach(function (i, index) {
                i = i || {};
                i.id = i.id || "button" + index;
                i.label = i.label || "button" + index;
                i.section = i.section || "global";
                i.extraClass = i.extraClass || '';
                i.tooltip = i.tooltip || i.label;
                i.icon = i.icon || 'cancel';
                i.hidden = i.hidden || false;

                var b = document.createElement("button");
                if (i.click)
                    b.onclick = i.click;
                else if (i.flyout) {
                    b.onclick = function () {
                        //flyout.element.winControl.show(b);
                        //flyout.script.call();
                        //TODO: finish implementing this... accept a flyout in the form of...
                        //  flyout: { element: q("#whatever"), script: function() { //what to do to set up the flyout }}
                    };
                }

                //onSelectionOf can be passed in with the dom element of a listview (or any other control with a numeric
                //'selection' property and the button will only be visible when that control has a selection
                if (i.onSelectionOf) {
                    i.onSelectionOf.winControl.addEventListener("selectionchanged", function (args) {
                        if (i.onSelectionOf.winControl.selection.count() > 0) {
                            b.style.display = "block";
                            appbar.winControl.sticky = true;
                            appbar.winControl.show();
                        }
                        else
                            b.style.display = "none";
                            //TODO: this may need to hide the app bar too... need to store whether it was the cause for it showing
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
                    tooltip: i.tooltip,
                    hidden: i.hidden
                });
                appbar.appendChild(b);
            });
            
            //disable the appbar if it has no buttons
            appbar.disabled = (options.buttons.length == 0);
        },
    });

    WinJS.Namespace.define("Ocho.WAMS", {
        //delete all records from a WAMS table with a certain id (can also specify an array of ids)
        deleteById: function (table, ids) {
            if (!ids.length) id = [ids];
            ids.forEach(function (id) {
                table
                    .where({ id: id })
                    .read().then(function (results) {
                        results.forEach(function (record) { table.del(record); });
                    });
            });
        }

    });
    WinJS.Namespace.define("Ocho.List", {
        deleteSelected: function (selection, list) {
            var indicesList = selection.getIndices().sort(function (a, b) { return a - b });
            for (var j = indicesList.length - 1; j >= 0; j--) list.splice(indicesList[j], 1);
        }
    });

    WinJS.Namespace.define("Ocho.Navigation", {
        go: function (page, context) {
            WinJS.Navigation.navigate("/pages/" + page + "/" + page + ".html", context);
        },
        launch: function (uri) {
            Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(uri));
        }
    });

    WinJS.Namespace.define("Ocho.Logging", {
        //This function is used to provide logging or to write output in a particular DOM element

        clearLog: function () {
            if (document.querySelector("div#log"))
                document.querySelector("div#log").innerHTML = "";
        },

        log: function (msg, elemName) {

            msg = msg != undefined ? msg : "";

            //TODO: if a div#log does not exist then create one and put it at the end of the body //done by Sonal Date: 5/9/14
            //TODO: allow a selector to specify what element(s) will be logged to but default to div#log //done by Sonal 
            //TODO: consider replacing with WinJS built-in logging

            if (elemName != undefined) {
                elemName = "#" + elemName;
                document.querySelector(elemName).innerHTML += msg + "<br/>";
            } else {
                //var targetElement = document.getElementsByTagName('body')[0];
                if (document.querySelector("div#log")) {
                    document.querySelector("div#log").innerHTML += msg + "<br/>";
                } else {
                    var targetElement = document.querySelectorAll("div.fragment");
                    var lastChildElement = targetElement[1].lastChild;

                    while (lastChildElement && lastChildElement.nodeType !== 1) {
                        lastChildElement = lastChildElement.previousSibling;
                        //console.log(lastChildElement);
                    }

                    var log = document.createElement('div');
                    log.id = "log";

                    if (lastChildElement) {
                        lastChildElement.appendChild(log);
                        document.querySelector("div#log").innerHTML += msg + "<br/>";
                    }
                }
            }
        },
    });

    WinJS.Namespace.define("Ocho.Misc", {
        //TODO: consider making this an extension method on the ListView control
        //BUG: the pushscroll does not work well on the left side of the screen. i suspect because the last pixel does not belong to the "window" object and so is not being captured
        addPushScroll: function (listview) {
            var timer = null;
            window.onmousemove = function (ev) {
                if (listview.lastScreenX) {
                    if (ev.screenX >= listview.lastScreenX && ev.screenX >= ev.view.innerWidth - 3)
                        listview.winControl.scrollPosition += 30;
                    else if (ev.screenX <= listview.lastScreenX && ev.screenX < 3)
                        listview.winControl.scrollPosition -= 30;
                }
                listview.lastScreenX = ev.screenX;

            };
        },
        getEnumValue: function(value, e) {
            for (var p in e) 
                if (e[p] === value) return p;
        }
    });

    WinJS.Namespace.define("Ocho.Popups", {
        alert: function (message, title) {
            title = title || "";
            Windows.UI.Popups.MessageDialog(message, title).showAsync();
        },

        confirm: function (message, title) {
            return new WinJS.Promise(function (c) {
                title = title || "";
                var msgDialog = Windows.UI.Popups.MessageDialog(message, title);
                msgDialog.commands.append(new Windows.UI.Popups.UICommand("OK", c, 1));
                msgDialog.commands.append(new Windows.UI.Popups.UICommand("Cancel", c, 0));
                msgDialog.showAsync();
            });
        }
    });

})();