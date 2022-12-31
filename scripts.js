// global variables
let selectedOperation;
// two values at all times. one is the "stored", parsed value, and one is the value currently taking input
let storedValue = 0;
let currentValue = "";

// set a lot of document references
// const buttons = document.querySelectorAll("button");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const displayCurrent = document.querySelector(".display .current-value");
const displayStored = document.querySelector(".display .stored-value");
const displayOperator = document.querySelector(".display .current-operator");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const clearButton = document.querySelector(".clear");
const backspace = document.querySelector(".back");

// reset all values and display
function fullClear() {
  selectedOperation = "";
  currentValue = "";
  storedValue = 0;
  displayStored.textContent = storedValue;
  displayCurrent.textContent = currentValue;
  displayOperator.textContent = selectedOperation;
}

// add selections to string
function addEntry(entry) {
  currentValue += entry;
  displayCurrent.textContent = currentValue;
}

// move current value to stored
function storeEntry() {
  if (currentValue === "") {
    storedValue = 0;
  } else {
    storedValue = parseFloat(currentValue);
    displayStored.textContent = storedValue;
  }
}

function keyEntry(e) {
  const keyPressed = document.querySelector(`[data-key='${e.key}']`);
  // when key is pressed, it selects the relevant element and simulates mouse click
  keyPressed.click();
  keyPressed.classList.toggle("keyEntry");
  setTimeout(() => {
    keyPressed.classList.toggle("keyEntry");
  }, 100);
}

// enable decimal only once per entry
decimal.addEventListener("click", () => {
  if (!currentValue.includes(".")) {
    addEntry(decimal.textContent);
  }
});

// set dynamic 'click' listeners that push element.textContent to string
// get entry as numbers are entered
numbers.forEach((number) =>
  number.addEventListener("click", () => {
    addEntry(number.textContent);
  })
);

// perform operation on cleaned inputs
function calculate() {
  // added extra condition to input cleaning to fix bug when no value entered
  const currentFloat = currentValue === "" ? parseFloat(0) : parseFloat(currentValue);
  switch (selectedOperation) {
    case "+":
      storedValue += currentFloat;
      break;
    case "-":
      storedValue -= currentFloat;
      break;
    case "*":
      storedValue *= currentFloat;
      break;
    case "/":
      if (currentFloat === 0) {
        // if(oof) {oof}
        fullClear();
        displayStored.textContent = "OOF";
        return;
      }
      storedValue /= currentFloat;
      break;
    default:
  }
  storedValue = parseFloat(storedValue.toFixed(3).replace(".000", ""));
  displayStored.textContent = storedValue;
  currentValue = "";
  displayCurrent.textContent = currentValue;
  displayOperator.textContent = "";
}

function operation(operator) {
  // get input when fully cleared
  if (!storedValue) {
    storeEntry();
    currentValue = "";
    displayCurrent.textContent = currentValue;
    selectedOperation = operator.textContent;
    displayOperator.textContent = selectedOperation;
    // when there is a value stored, but nothing currently entered
  } else if (currentValue === "") {
    selectedOperation = operator.textContent;
    displayOperator.textContent = selectedOperation;
  } else {
    // when there is a value stored, and someting currently entered, perform calculation as if enter had been hit. \
    //  this will ready the input for next number
    calculate();
    selectedOperation = operator.textContent;
    displayOperator.textContent = selectedOperation;
  }
}

// listener for backspace
backspace.addEventListener("click", () => {
  if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
    displayCurrent.textContent = currentValue;
  } else fullClear();
});

// set listeners for keyboard entry
window.addEventListener("keydown", keyEntry);

// get selection operation and store
operators.forEach((operator) => operator.addEventListener("click", () => operation(operator)));

// listener for 'enter'
equals.addEventListener("click", () => calculate());

// listener for 'clear'
clearButton.addEventListener("click", () => fullClear());
