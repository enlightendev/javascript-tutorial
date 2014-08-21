/* Scoping and Hoisting
 http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html

 Other languages have block-level scope. When control enters a block,
 such as the if statement, new variables can be declared within that
 scope, without affecting the outer scope. This is not the case in JavaScript.

 JavaScript has function-level scope. This is radically different from the
 C family. Blocks, such as if statements, do not create a new scope.
 Only functions create a new scope.

 How Hoisting works
 First, any declared variables get moved to the top of the load,
 and are initially undefined. These are followed by any declared
 functions in the order they are declared. Any code that is executed,
 like assignments, operations, or function calls, are always last and proceed
 from first appearance in the code body to the last.

 */
test('Scoping & Hoisting 1', function(){


    function sumOfSquares(a,b){

        var x = add(a*a,b*b);

        //you would think nothing past this gets executed
        //and you would be correct
        return x;

        //this function is executed because at first entry to sumOfSquares
        //the compiler hoists this function to the top of sumOfSquares scope.
        //in other words in the compiler this function exists above the
        //previous executable statments.
        function add(c,d){
            return c+d;
        }
    }

    equal(sumOfSquares(3,4), 25, 'Hoisting example 1');

});

test('Scoping & Hoisting - Function Expressions', function(){

    //function expresions are never hoisted
    function sumOfSquares(a,b){

        var x = add(a*a,b*b);

        //you would think nothing past this gets executed
        //and you would be correct
        return x;

        //this function expression is not hoisted and thus never reached
        //i.e. not visible and hence error
        /* uncomment to fail the test
         var add = function (c,d){
         return c+d;
         };
         */

        //this one is hoisted
        function add(c,d){
            return c+d;
        }
    }

    equal(sumOfSquares(3,4), 25, 'hoisting function expressions');

});

test('Scoping & Hoisting 2', function(){

    var a = 1;
    function b() {
        a = 10; //created in global scope?
        return;
        function a() {}
    }
    b();
    equal(a,1,'scoping 2');
});

/*
 Only functions create new scope. Thus the second var x overwrites first
 and remains in on the final test.
 */
test('Scoping & Hoisting 3', function(){

    var x = 1;
    equal(x,1,'var at function level');

    if (true) {
        //this will overwrite x
        var x = 2;
        equal(x,2,'overwrite var');
    }

    //x is still 2 because if(true) block did not create new scope
    equal(x,2,'if(true) block did not create new scope');

});


test('Temporay scope withn function', function(){

    function foo() {
        var x = 1;
        var b = 5;

        if (x) {
            //self exec anonymous function
            (function () {
                var x = 2;
                equal(b,5,'5 = 5');
                // some other code
            }());
        }

        // x is still 1.
        equal(x,1,'x = 1 and ');

    }

    foo(); //need to call or no test is executed
    //how do you test undefined
    //ok('undefined' == b,'should be undefined');
});