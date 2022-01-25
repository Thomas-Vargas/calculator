let shouldResetScreen = false;
let firstOperand = "";
let secondOperand = "";
let currentOperation = null;

const operationScreen = document.getElementById("currentOperationScreen");
const lastOperationScreen = document.getElementById("lastOperationScreen");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals-btn");

clearButton.addEventListener("click", resetScreen);

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
);

function appendNumber(number) {
    if (currentOperationScreen.textContent === "0" || shouldResetScreen) {
        resetScreen();
    }
    currentOperationScreen.textContent += number;
};

function resetScreen() {
    currentOperationScreen.textContent = "";
    shouldResetScreen = false;
}; 

function setOperation(operator) {
    if (currentOperation !== null) {
        evalute();
    }
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
};

function operate(operator, num1, num2) {
    return operator(num1, num2);
};

function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};
