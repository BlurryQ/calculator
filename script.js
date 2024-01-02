const numberLimit = 13;

const limit = document.getElementById("limit")

const infoScreen = document.getElementById("info-screen");
const resultScreen = document.getElementById("result-screen");
let a = b = null, opA = opB = null;

const numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
    number.addEventListener("click", () => {
        infoScreen.classList.remove("blink")
        operate(number.id, "number");
    })
});

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", () => {
        infoScreen.classList.add("blink")
        operate(operator.id, "operator");
    })
});

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
    resetValues();
})

const removeButton = document.getElementById("remove");
removeButton.addEventListener("click", () => {
    deleteLastInput();
})

function deleteLastInput() {
    const currentContent = infoScreen.textContent;
    const contentLength = currentContent.length;
    let newLength = contentLength - 1
    let newContent = "";
    for(let index = 0; index < newLength; index++) {
        newContent += currentContent[index]
    }
    if(newLength === 0) { newContent = 0 }
    getValues()
    limit.textContent = "";
    return infoScreen.textContent = newContent;  
}

const allowedNumbers = /[\d.]/
const allowedOperators = /[-+*/="Enter"]/

const keyboardInput = document.addEventListener("keypress", event => {
    const isAllowedNumber = allowedNumbers.test(event.key)
    infoScreen.classList.remove("blink")
    if(isAllowedNumber) {
        return operate(event.key, "number")
    }
    infoScreen.classList.add("blink")
    const isAllowedOperator = allowedOperators.test(event.key)
    if(isAllowedOperator && event.key!= "Enter") {
        return operate(event.key, "operator")
    } else  if(event.key === "Enter") {
        return operate("=", "operator")   
    }
    
});

function operate(input, type) {
    let containsError = errorCheck(input);
    if(containsError) { return; }
    if(input === ".") {
        let containsDecimal = decimalCheck(input)
        if(containsDecimal) { return }
    }
    infoScreen.textContent === "0" ? infoScreen.textContent = input : infoScreen.textContent += input;
    switch(type) {
        case "number": 
            if(opA != null) { 
                b === null ? b = input : b += input;
            } else {
                a === null ? a = input : a += input;
            }
            if(a.length >= numberLimit) {
                limit.textContent = `Maximum digits (${numberLimit}) reached!!`
            }
            if(b != null && b.length >= numberLimit) {
                limit.textContent = `Maximum digits (${numberLimit}) reached!!`
            }
            break;
        case "operator":
            opA != null ? opB = input : opA = input;
            if(opB != null) {
                prepareCalculation();
            }
            break;
        }
}

function getValues() {
    let currentContent = infoScreen.textContent;
    let opIndex = currentContent.search(allowedOperators);
    a = currentContent.slice(0, opIndex);
    opA = currentContent.slice(opIndex, opIndex+1);
    b = currentContent.slice(opIndex+1,-1);
}

function prepareCalculation() {
    limit.textContent = "";
    getValues()
    let result = calculate(a,opA,b);
    if(result === "error") { return; }
    result = formatResult(result)
    if(result === "error") { return; }
    resultScreen.textContent = result;
    a = result;
    opA = opB;
    opB = null;
    b = null;
    if(opA === "=") { 
        opA = null;
        infoScreen.textContent = a
    } else {
        infoScreen.textContent = a + opA
    } 
}

function formatResult(result) {
    fixedResult = result.toFixed(5).replace(/0+$/, "");
    parsedResult = parseInt(fixedResult);
    parsedLength = parsedResult.toString().length
    if(parsedLength >= numberLimit) {
        infoScreen.textContent = "Error:";
        resultScreen.textContent =  `Maximum digits (${numberLimit}) reached!!`;
        return "error";
    }
    if(result === parsedResult) { 
        return result 
     } else {
        return fixedResult;
     }
}

function calculate(a, op, b) {
    a = Number(a);
    b = Number(b);
    if(op === "/" && (a === 0 || b === 0)) { 
        infoScreen.textContent = "Error:";
        resultScreen.textContent = "Even Google can't do that!!";
        return "error";
    }
    switch(op) {
            case "+": return add(a,b);
            case "-": return subtract(a,b);
            case "*": return multiply(a,b);
            case "/": return divide(a,b);
        }
}

function add(a, b) {
    return (a + b);
}

function subtract(a, b) {
    return (a - b);
}

function multiply(a, b) {
    return (a * b);
}

function divide(a, b) {
    return (a / b);
}

function decimalCheck(input) {
    if(a != null && b === null) {
        const string = a.toString();
        return string.includes(".");
    }
    if(a != null && b != null) {
        const string = b.toString();
        return string.includes(".");
    }
}

function errorCheck(input) {
    if(input === "=" && (opA === null || b === null)) {
        infoScreen.textContent = "Error:";
        resultScreen.textContent =  "Invalid input";
        return true;
    }
    if(infoScreen.textContent === "Error:") { 
        infoScreen.textContent = input; 
        resultScreen.textContent =  "0";
        return true;
    }
}

function resetValues() {
    a = b = null, opA = opB = null;
    infoScreen.textContent = "0";
    resultScreen.textContent = "0";
    limit.textContent = "";
}