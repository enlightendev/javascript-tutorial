/**
 *
 Objects in JavaScript are little more than containers for properties.
 I’ve heard programmers describe them as “property bags,” which evokes a
 pleasing visual. Every object can have zero or more properties, which
 can either hold a primitive value or pointer that references a complex
 object. JavaScript can create objects in three ways: using literal notation,
 the new() operator, or the create() function.
 */

QUnit.test("Object properties: Configurable", function(assert){

    var car = {};

    Object.defineProperty(car,'doors',{
        configurable: true,
        value: 4
    });

    assert.equal(car.doors, '4', 'Object.defineProperty - configurable true');


    // A programmer might want to revoke the configurable attribute of a property as a form of defensive programming
    // to prevent an object from being modified much like built-in objects of the language do.
    Object.defineProperty(car,'wheels',{
        configurable: false,
        value: 4
    });

    delete car.wheels;

    assert.equal(car.wheels, '4', 'Object.defineProperty - configurable false; cant delete property');

});

QUnit.test("Object properties: Enumerable", function(assert){

    var car = {};

    Object.defineProperty(car,'doors',{
        writable: true,
        configurable: true,
        enumerable: true,
        value: 4
    });

    Object.defineProperty(car, 'wheels', {
        writable: true,
        configurable: true,
        enumerable: true,
        value: 4
    });

    Object.defineProperty(car, 'secretTrackingDeviceEnabled', {
        enumerable: false,
        value: true
    });

    for(var x in car){
        console.log(x);
    }

    console.log('Object.keys(car) ---> ' + Object.keys(car));

    console.log('Object.getOwnPropertyNames(car) ---> ' + Object.getOwnPropertyNames(car));

    assert.equal(Object.keys(car).length, 2, 'Object has only 2 enumerable properties.');

    assert.equal(Object.getOwnPropertyNames(car).length, 3, 'getOwnPropertyNames shows all enumerable and non enumerable properties.');

    ok(!car.propertyIsEnumerable('secretTrackingDeviceEnabled'), 'property is not enumerable.');

    ok(car.secretTrackingDeviceEnabled);

});

/**
 * When true, the value associated with the property can be changed; otherwise, the value remains constant.
 */
QUnit.test("Object properties: Writable", function(assert){

    var car = {};

    Object.defineProperty(car,'doors',{
        configurable: true,
        writable: false,
        value: 4
    });

    car.doors = 10;

    assert.equal(car.doors, '4', 'property cant be updated.');

});