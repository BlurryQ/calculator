let a, op, b, displayValue = 0, storedValues = [], result;

let displayScreen = document.getElementById(`display-screen`);
displayScreen.textContent = displayValue

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if(button.id == "=") {
        op = storedValues[1].toString()
        a = parseInt(storedValues[0])
        b = parseInt(storedValues[2])
        result = operate(op, a, b)
        displayScreen.textContent = result;
    } else {
        displayScreen.textContent = button.id
        storedValues.push(button.id)
    }
    }); 
})

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, a, b) {
switch(op) {
        case "+": return add(a,b)
        case "-": return subtract(a,b)
        case "*": return multiply(a,b)
        case "/": return divide(a,b)
    }
    storedValues.clear()
}
