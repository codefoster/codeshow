// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var subscriptions;

    function initializeGeospatial() {      
        // Binding stuff
        var data = WinJS.Binding.as({
            latitude: 0,
            longitude: 0,
            accuracy: 0,
            hasMoved: false
        });
        var dataElement = document.querySelector('#dataSection');
        WinJS.Binding.processAll(dataElement, data);

        var geolocator = new Windows.Devices.Geolocation.Geolocator();
        var observable = Rx.Observable.fromEvent(geolocator, 'positionchanged');

        //positionChanged.subscribe(function (e) {
        //    document.getElementById('latitude').innerHTML = pos.coordinate.latitude;
        //    document.getElementById('longitude').innerHTML = pos.coordinate.longitude;
        //});

        //var observable = Rx.Observable.fromGeolocator().publish().refCount();

        // Display the data
        var subscription1 = observable.subscribe(function(e) {
            var coord = e.position.coordinate;
            data.latitude = coord.latitude;
            data.longitude = coord.longitude;
            data.accuracy = coord.accuracy;
        });

        // Check if there has been movement!
        var subscription2 = observable.bufferWithCount(2, 1).subscribe(function(es) {
            var first = es[0].position.coordinate, second = es[1].position.coordinate;

            data.hasMoved = false;
 
            if (first.latitude !== second.latitude) data.hasMoved = true;
            if (first.longitude !== second.longitude) data.hasMoved = true;
            if (first.accuracy !== second.accuracy) data.hasMoved = true;
        });
        
        subscriptions.add(subscription1);
        subscriptions.add(subscription2);
    }

    function initializeAccelerometer() {
        var data = WinJS.Binding.as({ status: 'Reading...', x: 0, y: 0, z: 0 });
        var dataElement = document.querySelector('#accelerationSection');
        WinJS.Binding.processAll(dataElement, data);

        var observable = Rx.Observable.fromAccelerometer();
        
        // Buffer with 5 second window to calculate the average
        var subscription1 = observable
            .bufferWithTime(5000 /* 5 s */, 1000 /* 1s */)
            .where(function (es) { return es.length > 0; })
            .subscribe(function (es) {

                // Calculate averages
                var len = es.length, averagex = 0, averagey = 0, averagez = 0, reading;
                for (var i = 0; i < len; i++) {
                    reading = es[i].reading;
                    averagex += reading.accelerationX;
                    averagey += reading.accelerationY;
                    averagez += reading.accelerationZ;
                }

                data.x = averagex / len;
                data.y = averagey / len;
                data.z = averagez / len;
            }, function (err) {
                data.status = err;
            });
        
    }

    function initialize() {
        subscriptions = new Rx.CompositeDisposable();
        initializeGeospatial();
        initializeAccelerometer();
    }
    
    function teardown () {
        if (subscriptions) subscriptions.dispose();
    }

    WinJS.UI.Pages.define("/demos/sensors/sensors.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            initialize();
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            // TODO: Respond to changes in viewState.
        },

        unload: function () {
            teardown();
        }
    });
})();
