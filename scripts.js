//global variables
let selectedOperation;
//two values at all times. one is the "stored", parsed value, and one is the value currently taking input
let storedValue = 0;
let currentValue = '';

//set document references
const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const equals = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const backspace = document.querySelector('.back');

//enable decimal only once per entry
decimal.addEventListener('click', () => {
    if(!currentValue.includes('.')) {
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
operators.forEach((operator) => operator.addEventListener('click', () => operation(operator)));

//set listeners for keyboard entry
    //no earthly clue
    window.addEventListener('keydown', keyEntry);
    function keyEntry(e) {
       const keyPressed = document.querySelector(`[data-key='${e.key}']`);
       console.log(keyPressed);
       keyPressed.click();
    }

function operation(operator) {
    //get input when fully cleared
    if(!storedValue){
        storeEntry();
        currentValue = '';
        selectedOperation = operator.textContent;
        console.log('current:', currentValue);
        console.log('stored:', storedValue);
    //when there is a value stored, but nothing currently entered
    } else if(currentValue == '') {
        selectedOperation = operator.textContent;
    } else {
    //when there is a value stored, and someting currently entered, perform calculation as if enter had been hit. \
    // this will ready the input for next number
        calculate();
        selectedOperation = operator.textContent;
    }
}

//listener for 'enter'
equals.addEventListener('click', () => calculate());

//listener for 'clear'
clearButton.addEventListener('click', () => fullClear());

//listener for backspace
backspace.addEventListener('click', () => {
    currentValue = currentValue.slice(0,-1);
    display.textContent = currentValue;
}
)

//add selections to string
function addEntry(entry) {
    currentValue = currentValue + entry;
    display.textContent = currentValue;
}

//move current value to stored
function storeEntry() {
    if(currentValue == '') {
        storedValue = 0;
    } else {
    storedValue = parseFloat(currentValue);
    }
}

//clean entry
function clean(array) {return parseFloat(array.join(''));}

//perform operation on cleaned inputs
function calculate() {
    let currentFloat = currentValue == ''  ? parseFloat(0) : parseFloat(currentValue);
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
            if(currentFloat == 0) {
                display.textContent = "OOF";
                storedValue = 0;
                currentValue = '';
                return;
            }
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
    storedValue = 0;
    display.textContent = '0';
    console.log('current:', currentValue);
    console.log('stored:', storedValue);
}