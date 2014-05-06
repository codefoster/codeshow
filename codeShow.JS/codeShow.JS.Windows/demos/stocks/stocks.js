(function () {
    'use strict';

    var subscription;

    // Set up the chart
    function setupChart() {

        var smoothie = new SmoothieChart({
            minValue: 0.0,
            millisPerPixel: 20,
            grid: {
                strokeStyle: '#555555',
                lineWidth: 1,
                millisPerLine: 1000,
                verticalSections: 12
            }
        });

        smoothie.streamTo(document.querySelector('#chart'), 1000);

        return smoothie;
    }

    // Calculate averages/max/min per buffer
    function calculate(t) {

        var len = t.buffer.length,
            averageVolume = 0,
            averageClose = 0,
            averageHigh = 0,
            averageLow = 0,
            maxVolume = 0,
            maxClose = 0,
            maxHigh = 0,
            maxLow = Number.MAX_VALUE;

        for (var i = 0; i < len; i++) {
            var current = t.buffer[i];
            var high = parseInt(current.high);
            var low = parseInt(current.low);
            var close = parseInt(current.close);
            var volume = parseInt(current.volume);

            if (volume > maxVolume) maxVolume = volume;
            if (close > maxClose) maxClose = close;
            if (high > maxHigh) maxHigh = high;
            if (low < maxLow) maxLow = low;

            averageVolume += volume;
            averageClose += close;
            averageHigh += high;
            averageLow += low;
        }

        // Calculate averages
        averageVolume = averageVolume / len;
        averageClose = averageClose / len;
        averageHigh = averageHigh / len;
        averageLow = averageLow / len;

        return {
            timestamp: t.buffer[len - 1].timestamp,
            symbol: t.stockStream.key,
            firstClose: t.buffer[0].close,
            lastClose: t.buffer[len - 1].close,
            firstDate: t.buffer[0].date,
            lastDate: t.buffer[len - 1].date,
            averageVolume: averageVolume,
            averageClose: averageClose,
            averageHigh: averageHigh,
            averageLow: averageLow,
            maxVolume: maxVolume,
            maxClose: maxClose,
            maxHigh: maxHigh,
            maxLow: maxLow
        };
    }

    WinJS.UI.Pages.define('/demos/stocks/stocks.html', {

        // status about the serve connection
        connection: WinJS.Binding.as({
            state: 'connecting'
        }),

        // the list of symbols that have been received from the server
        legend: new WinJS.Binding.List(),
        
        selectedSymbol: new WinJS.Binding.List(),

        // setting up the bindings and controls
        setupBindings: function (element) {
            var processAll = WinJS.Binding.processAll;
            var self = this;

            processAll(element.querySelector('#state'), this.connection);

            var lv = document.querySelector('#legend').winControl;
            lv.itemDataSource = this.legend.dataSource;

            var sl = document.querySelector('#selectedSymbol').winControl;
            sl.itemDataSource = this.selectedSymbol.dataSource;
            
            lv.addEventListener('selectionchanged', function () {
                
                // when an item is selected on the legend,
                // begin tracking the stats of that item
                lv.selection.getItems().then(function (items) {
                    if (items.length == 0) return;

                    self.selectedSymbol.splice(0, self.selectedSymbol.length);

                    items.forEach(function (item) {
                        var stock = WinJS.Binding.as({
                            symbol: item.data.symbol,
                            lastClose: '',
                            lastDate: '',
                            averageHigh: '',
                            averageLow: ''
                        });
  
                        self.selectedSymbol.push(stock);
                    });
                });
            });
        },

        ready: function (element, options) {
            var sets = {},
                connection = this.connection,
                //selection = this.selection,
                legend = this.legend,
                colors = new Sample.colorProvider();

            var smoothie = setupChart();

            this.updateLayout();
            this.setupBindings(element);

            function getOrAddSet(name, type) {

                var setName = (type) ? name + '.' + type : name;
                if (sets[setName]) return sets[setName];

                var set = new TimeSeries({ type: type });
                sets[setName] = set;
                smoothie.addTimeSeries(set, { strokeStyle: colors.forKey(name), lineWidth: 1 });
                return set;
            }

            function onError(err) {
                connection.state = 'error';
                console.log(err);
                debugger;
            }

            subscription = new Rx.CompositeDisposable();

            var observable = Rx.Subject.fromWebSocket('ws://localhost:8080', 'stock-protocol', function () {
                connection.state = 'server found';
            });

            // define the primary stream of real-time data grouped by symbol
            var groupedTickStream = observable
                .selectMany(function (value) {
                    var data = JSON.parse(value.data),
                        date = new Date().getTime();

                    return Rx.Observable.fromArray(data).doAction(function(x) {
                        x.timestamp = date;
                    });
                })
                .groupBy(function (quote) {
                    return quote.symbol;
                })
                .publish()
                .refCount();

            // Define a stream grouped by a 5 day window with a 1 day skip
            var stream = groupedTickStream
                .selectMany(function(stockStream) {
                    return stockStream.bufferWithCount(5, 1);
                }, function(stockStream, buffer) {
                    return { stockStream: stockStream, buffer: buffer };
                })
                .where(function(t) {
                    return t.buffer.length === 5;
                })
                .select(calculate)
                .publish()
                .refCount();

            // Update the bottom row for listeners based upon items inserted
            Rx.Observable.fromEvent(this.selectedSymbol, 'iteminserted').selectMany(function (e) {
                console.log(e.detail.value.symbol);

                return stream
                    .where(function (ev) {
                        return ev.symbol === e.detail.value.symbol;
                    })
                    .select(function (ev) {
                        return { stream: ev, stock: e.detail.value };
                    });
            })
            .subscribe(function (x) {
                x.stock.lastClose = x.stream.lastClose;
                x.stock.lastDate = x.stream.lastDate;
                x.stock.averageHigh = x.stream.averageHigh;
                x.stock.averageLow = x.stream.averageLow;
            });

            // draw a line graph of the lastClose price
            var lineGraph = stream
                .subscribe(function (x) {
                    var set = getOrAddSet(x.symbol);
                    set.append(x.timestamp, x.lastClose);
                }, onError);

            // if the data matches the selected symbol, update the selection view model
            var latestPrice = Rx.Disposable.empty;

            // if we receive a new symbol, add it to the legend
            var symbols = stream
                .subscribe(function (x) {
                    if (connection.state !== 'receiving data') { connection.state = 'receiving data'; }
                    if (!legend.some(function (item) { return item.symbol === x.symbol; })) {
                        legend.push({
                            symbol: x.symbol,
                            color: colors.forKey(x.symbol)
                        });
                    }
                }, onError);

            // if there is a spike in the price, render that as a circle
            var spikes = groupedTickStream
                .selectMany(function (stockStream) {
                    
                    // Get the previous day and current day
                    return stockStream.bufferWithCount(2, 1);
                }, function (stockStream, buffer) {
                    
                    // Project forward the symbol, timestamp and buffer
                    var len = buffer.length;
                    return {
                        symbol: stockStream.key,
                        timestamp: buffer[len - 1].timestamp,
                        buffer: buffer
                    };
                })
                .where(function (x) {
                    return x.buffer.length === 2;
                })
                .doAction(function (x) {
                    
                    // Project forward the first close, last close and spike
                    x.firstClose = x.buffer[0].close;
                    x.lastClose = x.buffer[1].close;
                    x.spike = (x.lastClose - x.firstClose) / x.firstClose;
                })
                .where(function (x) {
                    return Math.abs(x.spike) >= 0.1;
                })
                .subscribe(function (x) {
                    var sticks = getOrAddSet(x.symbol, 'candlestick');
                    var radius = Math.abs(x.spike) * 33;
                    sticks.append(x.timestamp, x.lastClose, radius);
                }, onError);

            subscription.add(lineGraph, spikes, latestPrice, symbols);
        },

        updateLayout: function () {
            // Make the chart the same size as it's container.
            var section = document.querySelector('#chartLayoutRoot');
            var chart = document.querySelector('#chart');
            chart.width = section.clientWidth;
            chart.height = section.clientHeight;
        },

        unload: function () {
            subscription.dispose();
        }
    });
})();
