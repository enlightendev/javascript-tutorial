/**
 * Observable is a collection of iterms that arrive over time.
 */
QUnit.test('observable intro', function(assert){

    var Observable = Rx.Observable;

    var button = document.getElementById("btn");

    //var handler = function(e){
    //    alert('clicked:' + e);
    //    button.removeEventListener('click', handler);
    //};

    //button.addEventListener("click", handler);

    /**
     * create an observable based on button events
     * @type {Observable}
     */
    var clicks = Observable.fromEvent(button,'click');

    /**
     * create a points observable based on clicks observable
     */
    var points = clicks.map(function(click){
        return {x: click.clientX, y: click.clientY}
    });

    var subscription = points.forEach(

        function onNext(point){
            alert('clicked: ' + JSON.stringify(point));
        },
        /**
         * any error that occurs is sent to this async method.
         * @param error
         */
        function onError(error){
            console.error('WTF:' + error);
        },
        /**
         *
         * @param e
         */
        function onCompleted(){
            console.log('completed');
        }
    );



    assert.equal(true, true);
});