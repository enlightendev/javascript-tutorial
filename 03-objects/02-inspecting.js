/**
 *
 */
QUnit.test("Inspecting Objects: getOwnPropertyDescriptor", function (assert) {

    var o = {
        foo: 'bar'
    };

    // Object {value: "bar", writable: true, enumerable: true, configurable: true}
    console.log(Object.getOwnPropertyDescriptor(o, 'foo'));

    assert.ok(Object.getOwnPropertyDescriptor(o, 'foo').writable, 'default is writable.');

});

QUnit.test("Inspecting Objects: getOwnPropertyNames", function (assert) {

    var box = Object.create({}, {
        openLid: {
            value: function () {
                return "nothing";
            },
            enumerable: true
        },

        openSecretCompartment: {
            value: function () {
                return 'treasure';
            },
            enumerable: false
        }
    });

    console.log('Object.getOwnPropertyNames(box) ---> ' + Object.getOwnPropertyNames(box).sort());

    assert.ok(Object.getOwnPropertyNames(box).length === 2, 'Object.getOwnPropertyNames lists all properties enumerable or not');

});

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
 */
QUnit.test("Inspecting Objects: getPrototypeOf", function (assert) {

    var parentObj = {};

    assert.ok(Object.getPrototypeOf(parentObj) === Object.prototype, 'Object.getPrototypeOf(parentObj) === Object.prototype');

    //obj inherits from a
    var childObj = Object.create(parentObj);

    assert.ok(Object.getPrototypeOf(childObj) === parentObj, 'Object.getPrototypeOf(childObj) === parentObj');

});

/**
 * JavaScript’s prototype chain allows you to iterate over an instance of an object and return
 * all properties that are enumerable. It includes properties that are not present on the object
 * but somewhere in the prototype chain. The hasOwnProperty method allows you to identify whether
 * the property in question is present on the object instance
 */
QUnit.test("Inspecting Objects: hasOwnProperty", function (assert) {

    var foo = {
        foo: 'foo'
    };

    var bar = Object.create(foo, {
        bar: {
            enumerable: true,
            value: 'bar'
        },
        bar_none: {
            enumerable: false,
            value: 'bar_none'
        }
    });

    for (var x in bar){
        console.log(x);
    }

    /**
     * get only the property names for given object and not all properties inherited from prototype chain.
     * @type {Array}
     */
    var myProperties = Object.getOwnPropertyNames(bar).map(function(i) {
       return bar.hasOwnProperty(i) ? i : undefined;
    });

    console.log(myProperties);

    assert.ok(myProperties.length = 2, 'hasOwnProperty only shows immediate properties.');

});

QUnit.test("Inspecting Objects: Object.keys & isFrozen", function(assert){

    var box = Object.create({}, {
        openLid: {
            value: function(){
                return "nothing";
            },
            enumerable: true
        },
        openSecret: {
            value: function(){
                return "treasure"
            },
            enumerable: false
        }
    });

    assert.ok(Object.keys(box).length === 1, 'Object.keys(box) only returns enumerable objects');


    var extendableObject = {
        wrapping: 'plastic',
        flavors: ['cherry','lime']
    };

    assert.ok(!Object.isFrozen(extendableObject), 'basic object literal is extendable.');

    Object.freeze(extendableObject);

    delete extendableObject.wrapping;

    assert.equal(extendableObject.wrapping,'plastic','Object.freeze prevents object from being modified.')

    assert.ok(Object.isFrozen(extendableObject), 'Object is frozen.');
});

//continue with isPrototypeOf






