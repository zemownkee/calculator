//global variables
let selectedOperation;
let storedValue;
let currentValue = '';

//set document references
const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const equals = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

//set dynamic 'click' listeners that push element.textContent to string
//get entry as numbers are entered
numbers.forEach((number) => number.addEventListener('click', () => addEntry(number.textContent)));

//get selection operation and store
operators.forEach((operator) => operator.addEventListener('click', () => {
    storeEntry();
    currentValue = '';
    selectedOperation = operator.textContent;
    console.log(selectedOperation);
}));

//listener for 'enter'
equals.addEventListener('click', () => calculate());

//listener for 'clear'
clearButton.addEventListener('click', () => fullClear());

function addEntry(entry) {
    currentValue = currentValue + entry;
    console.log(currentValue);
    display.textContent = currentValue;
}

//move current value to stored on operator selection
function storeEntry() {
    storedValue = parseFloat(currentValue);
    console.log('stored:', storedValue);
}

//set listeners for keyboard entry
    //no earthly clue



//clean entry
function clean(array) {return parseFloat(array.join(''));}



//perform operation on cleaned inputs
function calculate() {
    let currentFloat = parseFloat(currentValue);
    let answer;
    switch (selectedOperation) {
        case '+':
            answer = storedValue + currentFloat;
            break;
        case '-':
            answer = storedValue - currentFloat;
            break;
        case '*':
            answer = storedValue * currentFloat;
            break;
        case '/':
            answer = storedValue / currentFloat;
            break;
    }
    display.textContent = answer;
    currentValue = answer;
}

//reset values/display
function fullClear() {
    selectedOperation = '';
    currentValue = '';
    storedValue = '';
    display.textContent = '';
}