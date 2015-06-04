/* Functions as the fundamental modular unit of execution

 A function encloses a set of statements. Functions are the fundamental modular unit of JavaScript.
 They are used for code reuse, information hiding, and composition.

 FUNCTION OBJECTS
 - Functions in JavaScript are objects.
 - Objects are collections of name/value pairs having a hidden link to a prototype object.
 - Objects produced from object literals are linked to Object.prototype.
 - Function objects are linked to Function.prototype (which is itself linked to Object.prototype).
 - Every function is also created with two additional hidden properties:
 the function's context and the code that implements the function's behavior.
 - Every function object is also created with a prototype property.
 Its value is an object with a constructor property whose value is the function.
 This is distinct from the hidden link to Function.prototype.

 Since functions are objects, they can be used like any other value.
 Functions
 - can be stored in variables, objects, and  arrays.
 - can be passed as arguments to functions, and functions can be returned from functions.
 - can have methods - since they are objects.
 - can be invoked
 */

/*
 Implicit function parameters -
 all function invocations are also passed two implicit parameters: arguments and this
 */
QUnit.test("Implicit Parameters - arguments", function(assert){

    var myFuncImplied = function(a){
        return(arguments.length);
    };

    assert.equal(myFuncImplied(1),1,"argument length");

    assert.equal(myFuncImplied(1,2),2,"extra arguments"); //notice how js will accept more params w/o throwing error

});


/*
 INVOCATION
 The manner in which a function is invoked has a huge impact on how the code within it operates,
 primarily in how the this parameter is established. Every function receives two additional parameters: this and arguments.
 The this paramerer value is determined by the invocation pattern.

 The this parameter refers to an object that’s implicitly associated with the function
 invocation and is termed the function context.

 What the this parameter points to isn’t, as in Java, defined by how the function is declared, but by how it’s invoked.

 There are four patterns of invocation in JavaScript:
 - function invocation pattern ,
 - method invocation pattern (a function associated with an object),
 - constructor invocation pattern (nwe object is brought into existence),
 - apply invocation pattern (Via its apply() or call() methods).
 */

/* -----------------------------------------------------
 Method  -
 When a function is assigned to a property of an object (we call it a method) and the invocation occurs by referencing
 the function using that property, then the function is invoked as a method of that object.

 When a method is invoked, this is bound to that object. if you come from any object-oriented
 background, you’ll remember that the object to which a method belongs is available
 within the body of the method as this. The same thing happens here. When we invoke
 the function as the method of an object, that object becomes the function context
 and is available within the function via the this parameter.
 */

QUnit.test("Method Invocation", function(assert){

    var myObject = {

        value: 0,

        //function stores as property of this object => this is bound to myObject
        //Methods that get their object context from this are called public methods.
        increment: function(inc){
            this.value += typeof inc === 'number' ? inc : 1;
        }
    };

    myObject.increment();
    assert.equal(myObject.value,1,"method invoke 1");

    myObject.increment(2);
    assert.equal(myObject.value,3,"method invoke 2");

});

/*
 Function Invocation
 When a function is not the property of an object, then it is invoked as a function.
 When a function is invoked with this pattern, this is bound to the global object/context — the window object.
 I.E. implicitness of the window as the “owner” of the function - window is set as the function context
 */
QUnit.test("Function Invocation", function(assert){

    //Function objects are created with function literals
    var add = function (a, b) {
        return a + b;
    };

    var myObject = {

        value: 0,

        //function stores as property of this object => this is bound to myObject
        //Methods that get their object context from this are called public methods.
        increment: function(inc){
            this.value += typeof inc === 'number' ? inc : 1;
        }
    };

    myObject.double = function() {

        /*
         When a function is invoked with this pattern, this is bound to the global object.
         This was a mistake in the design of the language. Had the language been designed
         correctly, when the inner function is invoked, this would still be bound to the
         this variable of the outer function. A consequence of this error is that a method
         cannot employ an inner function to help it do its work because the inner function
         does not share the method's access to the object as its this is bound to the
         wrong value. Fortunately, there is an easy workaround. If the method defines
         a variable and assigns it the value of this, the inner function will have access
         to this through that variable. By convention, the name of that variable is that:
         */

        var that = this; // Workaround.

        // this function is not a property of myObject (it is a function within a function)
        //and thus "this" is bound to the  global object and hence "that = this"
        var helper = function() {
            that.value = add(that.value, that.value);
        };

        helper();//Invoke helper as a function.
    };

    myObject.increment(2);
    myObject.double();

    assert.equal(myObject.value,4,"value");

});

/*
 Even though the same function is used throughout all these examples, the function context
 for each invocation of the function changes depending upon how the function is invoked,
 rather than on how it was declared.
 */
test("Method Vs. Function Invocation", function(){

    //function that returns its context
    function creep(){return this;}

    equal(creep(), window, "function context is gloabal scope, i.e. window?");

    var sneak = creep;

    equal(sneak(), window, "function context is still gloabal scope, i.e. window?");

    var ninja1 = {
        //skulk property that references original creep function - rememeber this function rteturns its context
        skulk: creep
    };

    equal(ninja1.skulk(), ninja1, "check for context"); //window/gloabl woudl fail

    var ninja2 = {
        //skulk property that references original creep function - rememeber this function rteturns its context
        skulk: creep
    };

    equal(ninja2.skulk(), ninja2, "check for context"); //window/gloabl woudl fail

});


/*
 Constructor Invocation

 JavaScript is a prototypal inheritance language. That means that objects can inherit properties
 directly from other objects. The language is class-free

 If a function is invoked with the new prefix, then a new object will be created with a
 hidden link to the value of the function's prototype member, and this will be bound
 to that new object.

 The new prefix also changes the behavior of the return statement.
 */
test("Constructor Invocation", function(){

    //constructor function
    function Ninja(){

        //function that returns its context.
        this.skulk = function() { return this;}
    }

    var nin1 = new Ninja();
    var nin2 = new Ninja();

    equal(nin1.skulk(), nin1, "check for context");
    equal(nin2.skulk(), nin2, "check for context");

});

/*
 Apply inocation pattern

 The apply method lets us construct an array of arguments to use to invoke a function.
 It also lets us choose the value of this. The apply method takes two parameters.
 The first is the value that should be bound to this. The second is an array of parameters

 */
test("Apply Invocation", function(){

    //
    var add = function (a, b) {
        return a + b;
    };

    var array = [3, 4];
    var sum = add.apply(null, array);    // sum is 7

    equal(sum,7,"Testing apply invocation");

});









