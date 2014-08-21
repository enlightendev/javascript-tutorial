/*
 * Testing basic javascript concepts and APIs
 */
test('numbers', function(){

    equal(Math.floor(1.8),1,'floor of 1.8 = 1');

    /*
     JavaScript has a single number type. Internally, it is represented as 64-bit
     floating point, the same as Java's double. Unlike most other programming
     languages, there is no separate integer type, so 1 and 1.0 are the same value.
     This is a significant convenience because problems of overflow in short integers
     are completely avoided, and all you need to know about a number is that it is a
     number. A large class of numeric type errors is avoided.
     */
});

/*
 Strings
 */
test('string', function(){

    equal('seven'.length,5,'Strings have a length property');

    //Strings are immutable. Once it is made, a string can never be changed. 
    //But it is easy to make a new string by concatenating other strings together 
    //with the + operator. Two strings containing exactly the same characters in 
    //the same order are considered to be the same string

    equal('c' + 'a' + 't', 'cat', 'new string by concatenating other strings together.');
    console.log('cat'.toUpperCase());
});