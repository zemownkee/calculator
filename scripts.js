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
const decimal = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');

//enable decimal only once per entry
decimal.addEventListener('click', () => {
    if(!currentValue.contains('.')) {
        addEntry(decimal.textContent);
        console.log('current:', currentValue);
        console.log('stored:', storedValue);
    }
});

//set dynamic 'click' listeners that push element.textContent to string
//get entry as numbers are entered
numbers.forEach((number) => number.addEventListener('click', () => {
    addEntry(number.textContent);
    console.log('current:', currentValue);
    console.log('stored:', storedValue);
}));

//get selection operation and store
operators.forEach((operator) => operator.addEventListener('click', () => {
    if(!storedValue){
        storeEntry();
        currentValue = '';
        selectedOperation = operator.textContent;
        console.log('current:', currentValue);
        console.log('stored:', storedValue);
    } else if(currentValue == '') {
        selectedOperation = operator.textContent;
    } else {
        calculate();
        selectedOperation = operator.textContent;
    }
}));

//listener for 'enter'
equals.addEventListener('click', () => calculate());

//listener for 'clear'
clearButton.addEventListener('click', () => fullClear());

function addEntry(entry) {
    currentValue = currentValue + entry;
    display.textContent = currentValue;
}

//move current value to stored on operator selection
function storeEntry() {
    storedValue = parseFloat(currentValue);
}

//set listeners for keyboard entry
    //no earthly clue

//clean entry
function clean(array) {return parseFloat(array.join(''));}

//perform operation on cleaned inputs
function calculate() {
    let currentFloat = parseFloat(currentValue);
    switch (selectedOperation) {
        case '+':
            storedValue = storedValue + currentFloat;
            break;
        case '-':
            storedValue = storedValue - currentFloat;
            break;
        case '*':
            storedValue = storedValue * currentFloat;
            break;
        case '/':
            storedValue = storedValue / currentFloat;
            break;
    }
    display.textContent = storedValue;
    currentValue = '';
    console.log('current:', currentValue);
    console.log('stored:', storedValue);
}

//reset values/display
function fullClear() {
    selectedOperation = '';
    currentValue = '';
    storedValue = undefined;
    display.textContent = '0';
    console.log('current:', currentValue);
    console.log('stored:', storedValue);
}