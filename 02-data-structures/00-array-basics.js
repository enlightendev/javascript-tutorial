/*
 * Testing basic javascript concepts and APIs
 */
QUnit.test('array basics', function(assert){

    var movie1 = [ 16, "Candles"];
    var movie2 = [ 3, "Men", "and", "a", "Baby"];

    var eightiesMovies = [ movie1, movie2];

    assert.equal(eightiesMovies[1][2], 'and', '2d array access');

});

/*
 * Array API - Accessor methods
 * These methods do not modify the array and return some representation of the array.
 */
QUnit.test('array accessor methods', function(assert){

    var values = [ 213, 16, 2058, 54, 10, 1965, 57, 9 ];

    //SLICE - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    //get a slice of the sorted array at index 3
    var slicedArray = values.slice(3);
    assert.deepEqual(slicedArray, [54, 10, 1965, 57, 9], 'sliced array');

    //MAP - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    var unsquared = [1,3,5];
    var squared = unsquared.map(function(x){
        return Math.pow(x,2);
    });

    assert.deepEqual(squared, [1,9,25],'map function');

    //notice how we pass a reference to the function Math.sqrt and not Math.sqrt()
    var rooted = squared.map(Math.sqrt);
    assert.deepEqual(rooted, [1,3,5],'map function rooted');


    var passengers = [
        ["Thomas", "Meeks"],
        ["Gregg", "Pollack"],
        ["Christine", "Wong"],
        ["Dan", "McGaw"]
    ];

    /**
     * @type {Array}
     */
    var modifiedNames = passengers.map(function(arr){
        return arr[0] + " " + arr[1];
    });

    assert.deepEqual(modifiedNames, ["Thomas Meeks","Gregg Pollack","Christine Wong","Dan McGaw"],'map function test');

});

/*
 * Array API - Mutator methods - These methods modify the array
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 */
QUnit.test('array mutator methods', function(assert){

    var values = [ 213, 16, 2058, 54, 10, 1965, 57, 9 ];

    //SORT
    //sorts descending -
    values.sort( function(value1,value2){
        return value2 - value1;
    });

    assert.equal(values[0],2058,'Array index[0] access');
    assert.equal(values[7],9,'Array index[7] access');

    assert.equal(values.pop(), 9, 'Remove last element from an array.')
    assert.equal(values.shift(), 2058, 'Remove first element from an array.')
    assert.equal(values.length,6, 'Array length is now 6.')

    assert.equal(values.push(99),7, 'Added 99 to end of array. Length is now 7')

});

QUnit.test('array iteration methods', function(assert){

    var values = [ 213, 16, 2058, 54, 10, 1965, 57, 9 ];

    //The every() method tests whether all elements in the array
    //pass the test implemented by the provided function.
    var passed = values.every(function(element,index,array){

        //array max size = 10
        if(array.length > 10){
            return false;
        }

        //no negative numbers
        if(element < 0){
            return false;
        }

        return true;

    });

    assert.equal(passed, true, 'Array no bigger than 10 and no negative numbers');

    /**
     * filter does not mutate the array on which it is called
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     * @type {Array}
     */
    var filtered = values.filter(function(element,index,array){

        //filter out any number in the 50's
        return element >= 60 || element <= 49;

    });

    assert.deepEqual(filtered,[ 213, 16, 2058, 10, 1965, 9], 'Filter to exclude any 50s');

});