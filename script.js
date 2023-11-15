let masterArray = [inputtedData = [], inputtedOps = []],
allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '*', '-', '+', '.', '=', `Enter`];

const infoScreen = document.getElementById(`info-screen`)
const resultScreen = document.getElementById(`result-screen`)

const keyboardInput = document.addEventListener(`keypress`, event => {
    resultScreen.style.cssText = `color: white;`
    if(allowedKeys.includes(event.key)) {
        if(event.key !== `Enter`) { 
            operate(event.key, masterArray)
        } else {
            operate(`=`, masterArray)
        }
    }
})

const buttons = document.querySelectorAll(`button`);
buttons.forEach(button => {
    button.addEventListener(`click`, () => {
        resultScreen.style.cssText = `color: white;`
        operate(button.id, masterArray)
    })
});


function operate(value, arr) {
    data = arr[0]
    inputtedOps = arr[1]
    inputtedData.push(value)
    ops = arr[1],
    amountOps = ops.length;
    if(isNaN(value)) {
        inputtedOps.push(value)
        if(value ===`clear`) {
            clearData(arr, true)
        }
        isEquals = inputtedOps[0].toString()
        if((isEquals === `=`) && (value === `=`)) {
            displayError(`equalsFirstOp`)
            return;
        }
    }
    values = getValues(masterArray)
    //console.log(values)
    displayEntry(values)
    if(amountOps === 2) {
        result = calculate(values)
        if(result === `error`) { return; }
        displayResult(result)
        clearData(masterArray)
        a = result;
        (arr[0]).push(a)
        lastOp = lastOp.toString()
        if(!(lastOp === `=`)) { 
            (arr[0]).push(lastOp);
            (arr[1]).push(lastOp);
        }
    }
}

function getValues(arr) {
    values = [],  
    trueOp = (arr[1])[0],
    data = arr[0],
    lastOp = (arr[1])[1],
    ops = arr[1],
    amountOps = ops.length;
    switch(amountOps) {
        case 0:
                copyData =  data.slice(0)
                copyData.forEach((button, index) => {
                    if(isNaN(button)) {
                        copyData.splice(index,1)
                    }
                });
                a = copyData.splice(0)
                a = a.join(``)
                values.push(a)
                break;
        case 1: 
                copyData = data.slice(0)
                copyData.forEach((number, index) => {
                    if(isNaN(number)) {
                        b = copyData.splice(index+1)
                        copyData.splice(index,1)
                    }
                });
                op = arr[1][0]
                a = copyData.splice(0)
                a = a.join(``)
                b = b.join(``)
                values.push(a, op, b)
                break;
        case 2:
                opIndex = data.indexOf(trueOp)
                lastOp = data.splice(-1)
                b = data.splice(opIndex+1).join(``)
                op = data.splice(opIndex)
                a = data.splice(0).join(``)
                values.push(a, trueOp , b)
    }
    return values;
}

function displayEntry(arr) {
        infoScreen.textContent = ``;  
        arr.forEach(value => {
            value = formatValueForDisplay(value)
            infoScreen.textContent += value    
        });
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
        value = integers + `.` + decimals
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
        stringLength = stringValue.length;
        totalCommas = parseInt((stringLength-1) / 3);
        for(x = 1; x <= totalCommas; x++) {
            stringValue.splice((stringLength-(3 * x)), 0, `,`)
        }
        return stringValue.join(``);
}

function calculate(arr) {
    a = parseInt((arr[0]*10000))
    op = arr[1]
    b = parseInt((arr[2]*10000))
    if(op === `/` && (a === 0 || b === 0)) { return displayError(`divideZero`)}
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
    }
    
}

function displayError(record) {
    infoScreen.textContent = `Error:`;
    switch(record) {
        case `equalsFirstOp`:   resultScreen.textContent = `No operators found`;
                                break;
        case `divideZero`:      resultScreen.textContent = `Even Google can't do that!!`;
                                return `error`;
                                break;
    }
}