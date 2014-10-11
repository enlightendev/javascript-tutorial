var testModule = (function () {
    var counter = 0;
    return {

        printCounter: function() {
            console.log('counter value:' + counter);
        },

        incrementCounter: function () {
            return counter++;
        },
        resetCounter: function () {
            console.log('counter value prior to reset:' + counter);
            counter = 0;
        }
    };
})();

// test
testModule.printCounter();
testModule.incrementCounter();
testModule.resetCounter();