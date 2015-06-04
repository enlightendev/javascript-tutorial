
QUnit.test("Function Characteristics & Properties", function(assert){

    //typical function
    function doSomething(){
        return "called doSomething()";
    }

    //A function is an instance of the Object type:
    assert.ok(doSomething instanceof Object, "Functions are instances of object!");

    //A function can have properties and has a link back to its constructor method:
    doSomething.propertyA = "propA";
    console.log(doSomething.propertyA);
    console.log(doSomething.constructor);

    //You can store the function in a variable:
    var doit = doSomething;
    doit();

    //You can pass the function as a parameter to another function:
    function doTasks(tasks){
        for(var x=0; x<tasks .length; x++)
            tasks[x]();
    }

    doTasks([doit]);  //pass doit in array

    //You can return the function from a function:
    function tonightChores(){
        return doit;
    }

    var tonight = tonightChores();

    //returns a function that can be executed!
    assert.equal(tonight(), "called doSomething()", "returning function from a function.");

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