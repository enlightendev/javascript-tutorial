
QUnit.test("Function Characteristics & Properties", function(assert){

    /**
     * this function declaration style builds in memory immediately when the program loads.
     * @returns {string}
     */
    function diffOfSquares(a,b){
        return a*a - b*b;
    }

    /**
     * function expression
     * this function declaration style builds only when the declaration line is reached.
     * @param a
     * @param b
     * @returns {number}
     */
    var diff = function diffOfSquares(a,b){
        return a*a - b*b;
    };

    //A function is an instance of the Object type:
    assert.ok(diffOfSquares instanceof Object, "Functions are instances of object!");
    assert.ok(diff instanceof Object, "Functions are instances of object!");

    //A function can have properties and has a link back to its constructor method:
    diffOfSquares.propertyA = "propA";

    //the fact that functions can have properties and other functions allows them to simulate classes.
    assert.equal(diffOfSquares.propertyA,'propA', 'functions can have properties.');

    //console.log(doSomething.constructor);

    //You can store the function in a variable:
    var doit = diff;
    assert.equal( doit(3,2) , 5, 'you can store a function as a variable and call it');

    //You can pass the function as a parameter to another function:
    function doTasks(tasks){
        for(var x=0; x<tasks .length; x++)
            console.log( tasks[x](3,5) );
    }

    doTasks([doit,doit]);  //pass doit in array

    //You can return the function from a function:
    function tonightChores(){
        return doit;
    }

    var tonight = tonightChores();

    //returns a function that can be executed!
    assert.equal(tonight(3,2), 5, "returning function from a function.");

    //Array of anonymous functions.
    var puzzlers = [
        function(x){return 3*x-8;},
        function(x){return Math.pow(2+x,3);},
        function(x){return Math.pow(x,2)-9;},
        function(x){return x%4;}
    ];

    assert.equal(puzzlers[0](5),7,"Puzzler 1");
    assert.equal(puzzlers[2](3),0,"Puzzler 2");

});