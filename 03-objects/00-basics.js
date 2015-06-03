/*
 The simple types of JavaScript are numbers, strings, booleans (true and false),
 null, and undefined. All other values are objects. Numbers, strings, and
 booleans are object-like in that they have methods, but they are immutable.
 Objects in JavaScript are mutable keyed collections. In JavaScript, arrays
 are objects, functions are objects, regular expressions are objects, and,
 of course, objects are objects.

 An object is a container of properties, where a property has a name and a
 value. A property name can be any string, including the empty string.
 A property value can be any JavaScript value except for undefined.

 Objects in JavaScript are class-free. There is no constraint on the names of
 new properties or on the values of properties. Objects are useful for
 collecting and organizing data. Objects can contain other objects, so they
 can easily represent tree or graph structures.

 JavaScript includes a prototype linkage feature that allows one object to
 inherit the properties of another. When used well, this can reduce object
 initialization time and memory consumption.
 */

QUnit.test("Object Basics: object literal", function(assert){

    /* Object literals */
    var empty_obj = {};

    /* Obj literal w/properties. */
    var basic_obj = {
        fname:"Juan",
        lname:"Lamadrid"
    };

    //we can even add/augment properties after obj literal is defined
    basic_obj.ssn = '123456789';

    assert.equal(basic_obj.ssn, '123456789', 'added ssn property after literal was created');

    /* Complex object literal with objects as properties */
    var parent = {
        name: "Dad",
        age: 45,
        children: [
            {
                name: "Jr",
                dob: "2004-09-22 14:55",
                city: "Sydney",
                disciplinedCount: 0
            },
            {
                name: "Jr2",
                dob: "2010-09-22 14:55",
                city: "NYC",
                disciplinedCount: 0
            }
        ],
        wife: {
            name: "Mrs",
            dob: "1980-09-23 10:42",
            city: "Los Angeles"
        },

        childCount: function(){
            return this.children.length;
        }
    };

    assert.equal(typeof(parent), 'object', 'checking typeof parent = object');

    assert.equal(typeof(parent.name), 'string', 'checking typeof parent.name = string');

    assert.equal(parent['wife']['name'], 'Mrs', 'accessing properties using bracket operator -> parent[\'wife\'][\'name\']');

    assert.equal(parent.wife.name, 'Mrs', 'accessing properties using dot operator -> parent.wife.name');

    assert.equal(parent.childCount(),2,'Check number of children using childCount function');

    assert.equal(parent.children[0].name, 'Jr', 'checking object property retrieval');


    //updating
    parent.name = "Juan";
    assert.equal(parent.name, 'Juan', 'updating object property -> ');

    //augmenting with attribute not already in original def.
    parent.tool = {
        model: 'Makita'
    };

    assert.equal(parent.tool.model, 'Makita', 'checking augmenting object with an object property');

    //augmenting with method not already in original def.
    parent.discipline = function(childName){

        //iterate through children, discipline them and leave in filtered result
        var filtered = this.children.filter(function(element,index,array){

            //discipline and keep in list
            if(element.name == childName){
                element.disciplinedCount = element.disciplinedCount + 1;
                return true;
            }else{
                return false;
            }
        });
    };

    parent.discipline("Jr");

    assert.equal(parent.children[0].disciplinedCount,1,'Got disciplined');
    assert.equal(parent.children[1].disciplinedCount,0,'Did not get disciplined');


    parent.discipline("Jr");
    parent.discipline("Jr2");

    assert.equal(parent.children[0].disciplinedCount,2,'Bad kid');
    assert.equal(parent.children[1].disciplinedCount,1,'First time is a charm.');


    /* enumerating object props */
    for (var name in parent) {
        if (typeof parent[name] !== 'function') {
            //console.log(name + ': ' + parent[name] + " type:" + typeof(parent[name]));
        }
    }

    /* enumerating specific object props */
    var i;
    var properties = ['name','age'];
    for (i = 0; i < properties.length; i += 1) {
        //console.log("Properties: " + properties[i] + ': ' + parent[properties[i]]);
    }

    delete parent.age;
    assert.equal(parent.age,undefined,'deleted property');

});


QUnit.test('Object Finder',function(assert){

    var vehicle1 = {type: "Motorboat", capacity: 6, storedAt: "Ammunition Depot"};
    var vehicle2 = {type: "Jet Ski", capacity: 1, storedAt: "Reef Dock"};
    var vehicle3 = {type: "Submarine", capacity: 8, storedAt: "Underwater Outpost"};

    /**
     * create an array of the vehicles
     * @type {*[]}
     */
    var vehicles = [vehicle1,vehicle2,vehicle3];

    var findLocation = function(name,list){

        var location;
        list.forEach(function(element, array){
            if(element.type === name){
                location = element.storedAt;
            }
        });

        return location;

    };

    var v = findLocation('Submarine',vehicles);
    assert.equal(v,'Underwater Outpost','locating on object in array of objects.');

});