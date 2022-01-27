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
const periodButton = document.getElementById("period-btn");

clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteDigit);
periodButton.addEventListener("click", appendPeriod);
equalsButton.addEventListener("click", evaluate);
window.addEventListener("keydown", keyboardInput);


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

function appendPeriod() {
    if(currentOperationScreen.textContent.indexOf(".") === -1) {
        currentOperationScreen.textContent = currentOperationScreen.textContent + ".";
    } else{
        return;
    }
};

function deleteDigit() {
    currentOperationScreen.textContent = currentOperationScreen.textContent
        .toString()
        .slice(0, -1);
};

function keyboardInput(e) {
    if(e.key >= 0 && e.key <= 9) {
        appendNumber(e.key)
    } 
    else if(e.key === "=" || e.key == "Enter") {
        if (e.key === "Enter") {
            e.preventDefault();
        }
        evaluate();
    } 
    else if(e.key === ".") {
        appendPeriod();
    }
    else if(e.key === "Backspace") {
        deleteDigit();
    }
    else if(e.key === "Escape") {
        clear();
    }
    else if(e.key === "+") {
        setOperation(e.key);
    }
    else if(e.key === "-") {
        setOperation(e.key);
    }
    else if(e.key === "/" || e.key === "*") {
        setOperation(convertOperator(e.key));
    }
};

function convertOperator(keyboardOperator) {
    if (keyboardOperator === "/") {
        return "÷";
    }
    else if(keyboardOperator === "*") {
        return "x"
    };
};

function resetScreen() {
    currentOperationScreen.textContent = "";
    shouldResetScreen = false;
}; 

function clear() {
    currentOperationScreen.textContent = "0";
    lastOperationScreen.textContent = "";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
};

function setOperation(operator) {
    if (currentOperation !== null) {
        evaluate();
    }
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
};

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
};

function evaluate() {
    if(currentOperation === null || shouldResetScreen) {
        return;
    } 
    if(currentOperation === "÷" && currentOperationScreen.textContent === "0") {
        alert("I don't think so!");
    };

    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
};

function operate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    if (operator === "+") {
        return add(num1, num2);
    } else if(operator === "-") {
        return subtract(num1, num2);
    } else if(operator === "x") {
        return multiply(num1, num2);
    } else if(operator === "÷") {
        if (num2 === 0) {
            return null;
        } else {
            return divide(num1, num2);
        }
    } else {
        return null;
    };
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