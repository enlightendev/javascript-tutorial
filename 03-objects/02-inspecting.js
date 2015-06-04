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

QUnit.test("Inspecting Objects: getPrototypeOf", function (assert) {

    var a = {};

    assert.ok(Object.getPrototypeOf(a) === Object.prototype, 'Object.getPrototypeOf(a) === Object.prototype');

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


