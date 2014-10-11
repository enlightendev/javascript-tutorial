/**
 *
 */
var isSoldier = false;
var weapon;

//standard conditional block
if(isSoldier){
    weapon = "sword";
} else {
    weapon = "pen";
}

console.log(weapon);

// more concise
// someCondition ? thisIfTrue : thisIfFalse
var isETF = true;

var ticker = isETF ? "spy" : "/es";

console.log(ticker);

//compound version
var isClosed = false;
var isProfit = true;
var isChecked = false;
var lastTrade = false;

console.log('Open and profitable: ' + ( !isClosed && isProfit ? 'Yes' : 'No'));

//demonstrate calling functions within ternary condition
!isClosed && isProfit ? function(){
        console.log('You have a profitable and open trade.');
    }()
    :
    function(){
        console.log('You do not have a profitable and open trade.');
    }();

//multiple statements inside ternary response are grouped in parentheses and separated by a comma.
!isClosed && isProfit ? ( isChecked = true, lastTrade = false)
    :
    ( isChecked = false, lastTrade = true);

console.log("Is checked: " + isChecked + '; is last trade: ' + lastTrade);

//nested ternary - ternary holding other ternaries - careful with these
//add some
