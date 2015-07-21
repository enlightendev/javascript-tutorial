/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
 */
QUnit.test('Inheritance with the prototype chain', function (assert) {

    var parentObj = {};

    assert.ok(Object.getPrototypeOf(parentObj) === Object.prototype, 'Object.getPrototypeOf(parentObj) === Object.prototype');

    //obj inherits from a
    var childObj = Object.create(parentObj);

    assert.ok(Object.getPrototypeOf(childObj) === parentObj, 'Object.getPrototypeOf(childObj) === parentObj');


});

/**
 * inheriting methods
 */
QUnit.test('inheriting methods', function (assert) {

    var o = {
        a: 2,
        b: 5,
        m: function (b) {
            return this.a + 1;
        }
    };

    assert.ok(o.hasOwnProperty('b'), 'object o does have its own property b');

    assert.equal(o.m(), 3, 'so far so good');

    //p is an object that inherits from o
    var p = Object.create(o);

    //creates an own property, i.e. overwrite parent value
    p.a = 12;

    assert.ok(p.hasOwnProperty('a'), 'object p has its own property a');
    assert.ok(!p.hasOwnProperty('b'), 'object p does not have its own property a');

    assert.equal(p.m(), 13, 'p.m() used its own value that over shadowed parent object.')

    //// Arrays inherit from Array.prototype (which has methods like indexOf, forEach, etc.)
    // The prototype chain looks like: a ---> Array.prototype ---> Object.prototype ---> null
    var stocks = ['msft', 'ibm'];

    console.log(Object.getPrototypeOf(stocks));

    stocks.forEach(function (val) {
        console.log(val);
    });

});