var people = [
    {
        age: 23,
        gender: 'M',
        isMarried: false
    },{
        age: 43,
        gender: 'F',
        isMarried: true
    },{
        age: 29,
        gender: 'F',
        isMarried: true
    },{
        age: 69,
        gender: 'M',
        isMarried: false
    }
];

var filtered = [];

people.forEach(function(person){
    if(person.isMarried){
        filtered.push(person);
    }
});

console.log(filtered);

filtered = [];

people.forEach(function(person){
    if(person.age > 60){
        person.old = true;
        filtered.push(person);
    }
});

console.log(filtered);




