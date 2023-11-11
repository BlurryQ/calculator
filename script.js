let masterArray = [inputtedData = [], inputtedOps = []],
allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '*', '-', '+', '.', '=', `Enter`];

const infoScreen = document.getElementById(`info-screen`)
const resultScreen = document.getElementById(`result-screen`)

const keyboardInput = document.addEventListener(`keypress`, event => {
    resultScreen.style.cssText = `color: white;`
    if(allowedKeys.includes(event.key)) {
        if(event.key !== `Enter`) { 
            calculate(event.key, masterArray)
        } else {
            calculate(`=`, masterArray)
        }
    }
})

const buttons = document.querySelectorAll(`button`);
buttons.forEach(button => {
    button.addEventListener(`click`, () => {
        resultScreen.style.cssText = `color: white;`
        calculate(button.id, masterArray)
    })
});


function calculate(value, arr) {
    inputtedData.push(value)
    displayEntry(inputtedData)
    if(isNaN(value)) {
        inputtedOps.push(value)
        if(value ===`clear`) {
            clearData(arr, true)
        }
    }
    if(inputtedOps.length === 2) {
        values = getValues(arr),
        lastOp = (arr[1])[1]
        result = operate(values)
        console.error(`The result is: ` + result)
        displayResult(result)
        clearData(masterArray)
        a = result;
        (arr[0]).push(a)
        if(!(lastOp === `=`)) { 
            (arr[0]).push(lastOp);
            (arr[1]).push(lastOp);
        }
    }
}

function getValues(arr) {
    trueOp = (arr[1])[0]
    data = arr[0]
    opIndex = data.indexOf(trueOp)
    lastOp = data.splice(-1)
    b = data.splice(opIndex+1).join(``)
    op = data.splice(opIndex)
    a = data.splice(0).join(``)
    console.log(`a: ` + a + ` | op: ` + trueOp + ` &= ` + op + ` | b: ` + b + ` | lastOp: ` + lastOp)
    return [a, trueOp , b]
}

function displayEntry(arr) {
    infoScreen.textContent = arr.join(``)
}

function displayResult(value) {
    value = formatValueForDisplay(value)
    resultScreen.textContent = value
    resultScreen.style.cssText = `color: green;`
}

function formatValueForDisplay(value) {
    stringValue = value.toString()
    if(!(stringValue.includes(`.`))) {
        value = tidyCommas(value);
    } else {
        values = stringValue.split(`.`)
        integers = tidyCommas(values[0]);
        decimals = tidyDecimals(values[1]);
        console.log(`integers: ` + integers + ` | decimals: ` + decimals)
        console.error(integers + decimals)
        value = integers + `.` + decimals
        console.error(value)
    }
    return value;
}

function tidyDecimals(value) {
    decimalValue = 0;
    valueLength = value.length
    makeDecimal = [1]
    for(x = 1; x <= valueLength; x++) {
        makeDecimal.push(0)
    }
    makeDecimal = makeDecimal.join(``);
    value = value / makeDecimal;
    if(valueLength >= 5) {
        decimalValue = value.toFixed(5)
    } else {
        for(x = 1; x <= 5; x++) {
            if (value == value.toFixed(x)) {
                decimalValue = value.toFixed(x)
                break;
            }
        }
    }
    decimals = decimalValue.split(`.`)
    return decimals[1];
}

function tidyCommas(value) {
    stringValue = (value.toString()).split(``)
    console.log(`stringValue: ` + stringValue)
    stringLength = stringValue.length;
    console.log(`value: ` + value + ` | length: ` + stringLength);
    totalCommas = parseInt((stringLength-1) / 3);
    console.table(`total commas: ` + totalCommas);
    for(x = 1; x <= totalCommas; x++) {
        stringValue.splice((stringLength-(3 * x)), 0, `,`)
    }
    console.log(`stringValue: ` + stringValue)
    return stringValue.join(``);
}

function operate(arr) {
    a = parseInt((arr[0]*10000))
    op = arr[1]
    b = parseInt((arr[2]*10000))
    switch(op) {
            case "+": return add(a,b)/10000
            case "-": return subtract(a,b)/10000
            case "*": return multiply(a,b)/(10000*10000)
            case "/": return divide(a,b)
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

function clearData(arr, full) {
    arr[0].splice(0)
    arr[1].splice(0)
    if(full) {
        infoScreen.textContent = 0;
        resultScreen.textContent = 0;
        console.warn("Data has been cleared");
    }
    
}