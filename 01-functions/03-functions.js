/* Augmenting Types

 JavaScript allows the basic types of the language to be augmented. We have seen
 that adding a method to Object.prototype makes that method available to all
 objects. This also works for functions, arrays, strings, numbers, regular
 expressions, and booleans.

 By augmenting the basic types, we can make significant improvements to the
 expressiveness of the language. Because of the dynamic nature of JavaScript's
 prototypal inheritance, all values are immediately endowed with the new methods,
 even values that were created before the methods were created.

 Compare with Ruby's open classes.
 */
test("Augmenting Function", function(){

    /*
     By augmenting Function.prototype with a method method, we no longer have
     to type the name of the prototype property. That bit of ugliness can now be hidden.
     */
    Function.prototype.method = function (name, func) {
        this.prototype[name] = func;
        return this;
    };

    //JavaScript does not have a separate integer type, so it is sometimes
    //necessary to extract just the integer part of a number. The method JavaScript
    //provides to do that is ugly. We can fix it by adding an integer method to
    //Number.prototype. It uses either Math.ceil or Math.floor, depending on the sign of the number:

    Number.method('integer', function () {
        return Math[this < 0 ? 'ceil' : 'floor'](this);
    });

    equal((-10/3).integer(),-3,"Testing augmented integer() function");

    //JavaScript lacks a method that removes spaces from the ends of a string.
    //That is an easy oversight to fix:

    String.method('trim', function (  ) {
        return this.replace(/^\s+|\s+$/g, '');
    });

    equal("My name is    ".trim(),"My name is","Testing augmented trim() function");

});