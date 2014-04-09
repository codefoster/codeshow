(function () {
    "use strict";

    var log = Ocho.Logging.log;
    
    WinJS.UI.Pages.define("/demos/classes/classes.html", {
        ready: function (element, options) {
            var Animal = WinJS.Class.define( 
                function() {
                    this._privateField = 0;
                },
                {
                    name: "",
                    legCount: 4,
                    breath: function () { return "breathing"; }
                }
            );

            var Dog = WinJS.Class.derive(Animal,
                function () {},
                {
                    bark: function () { return "woof"; }
                }
            );

            var animal = new Animal();
            var dog = new Dog();
            log(dog.breath());
            log(dog.bark());
        }
    });
})();
