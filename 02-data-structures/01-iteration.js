/**
 *
 */
QUnit.test('array iteration: manual, forEach, map, filter, etc', function(assert){

    var stocks = [
        {symbol: 'msft', price: 100, volume: 100000},
        {symbol: 'orcl', price: 200, volume: 300000},
        {symbol: 'amzn', price: 300, volume: 500000},
        {symbol: 'lnkd', price: 400, volume: 400000}
    ];

    function getStockSymbolsCounter(stocks){

        var symbols = [],
            counter,
            stock;

        for (counter = 0; counter < stocks.length; counter++){
            stock = stocks[counter];
            symbols.push(stock.symbol);
        }

        return symbols;
    }

    /**
     *
     * @param stocks array of stock objects
     * @param attribute the object attribute to display
     * @returns {Array}
     */
    function getStockSymbolsForEach(stocks, attribute){

        var symbols = [];

        stocks.forEach(function(stock){
           symbols.push(stock[attribute]);
        });

        return symbols;
    }

    /**
     * Show symbols filtered according to provided filter function
     * @param stocks
     *
     * @param predicate - a function that returns true or false
     *  http://codepen.io/Universalist/post/predicates-in-javascript
     *
     * @returns {Array}
     */
    function getStockSymbolsForEachFilter(stocks, predicate){

        var symbols = [];

        stocks.forEach(function(stock){
            if(predicate(stock)){
                symbols.push(stock.symbol);
            }
        });

        return symbols;
    }

    /**
     * Showing old way of doing iteration - counter with loop variables.
     */
    var symbols = getStockSymbolsCounter(stocks);
    assert.deepEqual( symbols , ["msft","orcl","amzn", "lnkd"], 'array for loop');

    /**
     * using better more functional style forLoop with closure.
     * also passing attribute we wan to return: symbol.
     * @type {Array}
     */
    symbols = getStockSymbolsForEach(stocks, 'symbol');
    assert.deepEqual( symbols , ["msft","orcl","amzn", "lnkd"], 'array forEach');

    /**
     *
     * @type {Array}
     */
    symbols = stocks.map(function(stock){return stock.symbol});
    assert.deepEqual( symbols , ["msft","orcl","amzn", "lnkd"], 'using array.map with inline function');

    /**
     * this filtering mechanism (passing a predicate) is very common such that arrays have built in filter function
     */
    symbols = getStockSymbolsForEachFilter(stocks, function(stock){
        if(stock.price < 200)
            return true;
    });
    assert.deepEqual( symbols , ["msft"], 'cheap stocks using predicate to filter array.');

    /**
     * using array filter function
     */
    stocks = stocks.filter(function(stock){
       if(stock.price > 300){
           return true;
       }
    });

    assert.deepEqual( getStockSymbolsForEach(stocks, 'symbol') , ["lnkd"], 'expensive stocks using array.filter.');

});


QUnit.test('chaining forEach, map, filter, etc', function(assert) {

    var stocks = [
        {symbol: 'msft', price: 100, volume: 100000},
        {symbol: 'orcl', price: 200, volume: 300000},
        {symbol: 'amzn', price: 300, volume: 500000},
        {symbol: 'lnkd', price: 400, volume: 400000}
    ];

    var filterStocks = stocks
        .filter(function(stock){
            if(stock.price > 200){
                return true;
            }
        }).map(function(stock){
            return stock.symbol;
        });


    assert.deepEqual( filterStocks , ["amzn","lnkd"], 'chaining filter and map.');

});

QUnit.test('flatten nested array', function(assert) {

    var exchanges = [
      [
          {symbol: 'msft', price: 100, volume: 100000},
          {symbol: 'orcl', price: 200, volume: 300000},
          {symbol: 'amzn', price: 300, volume: 500000},
          {symbol: 'lnkd', price: 400, volume: 400000}

      ],[
            {symbol: 'ge', price: 10.0, volume: 1000.00},
            {symbol: 'pg', price: 20.0, volume: 3000.00},
            {symbol: 'ms', price: 30.0, volume: 5000.00},
            {symbol: 'jpm', price: 40.0, volume: 4000.00}

        ]
    ];

    Array.prototype.concatAll = function(){

        var results = [];

        this.forEach(function(subArray){
            subArray.forEach(function(item){
                results.push(item);
            });
        });

        return results;
    };

    //exchanges.forEach(function(exchange){
    //    exchange.forEach(function(stock){
    //        console.log(JSON.stringify(stock));
    //    })
    //});

    var stocks = exchanges.concatAll();
    console.log(JSON.stringify(stocks));

    assert.equal(stocks.length, 8, 'new flattened array has correct length');
});