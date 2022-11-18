//global variables
let selectedOperation;
let storedValue = '';
let currentValue = '';
let displayValue;

//set document references
const buttons = document.querySelectorAll('button');
const buttonArray = [...buttons];
const numbers = document.querySelectorAll('.number');
const numberArray = [...numbers];

//set dynamic 'click' listeners that push element.textContent to string
//get entry as numbers are entered
numbers.forEach((number) => number.addEventListener('click', () => addEntry(number.textContent)));

function addEntry(entry) {
    currentValue = currentValue + entry;
    console.log(currentValue);
}

//set listeners for keyboard entry
    //no earthly clue



//clean entry
function clean(array) {return parseFloat(array.join(''));}

//get selection operation and store

//switch from entering first number to entering second number

//perform operation on cleaned inputs

//reset values/display