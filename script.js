let masterArray = [inputtedData = [], inputtedOps = []];

const infoScreen = document.getElementById(`info-screen`)
const resultScreen = document.getElementById(`result-screen`)

const buttons = document.querySelectorAll(`button`);
buttons.forEach(button => {
    button.addEventListener(`click`, () => {
        resultScreen.style.cssText = `color: white;`
        inputtedData.push(button.id)
        displayEntry(inputtedData)
        if(isNaN(button.id)) {
            inputtedOps.push(button.id)
            if(button.id ===`clear`) {
                clearData(masterArray, true)
            }
        }
        inputtedOps.length === 2 ? calculate(masterArray) : false;
    })
    
});


function calculate(arr) {
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
    value = tidyCommas(value);
    value = tidyDecimals(value);
    return value;
}

function tidyDecimals(value) {
    console.log(value + ` === ` + parseInt(value) + ` : ` + (value === parseInt(value)))
    if(!(value ===  parseInt(value))) {
        console.log(`here`)
        console.log(`value: ` + value + ` == ` + value.toFixed(1) + ` (fixed value)`)
        for(x = 1; x >= 5; x++) {
            console.log(`value: ` + value + ` == ` + value.toFixed(x) + ` (fixed value)`)
            if (value == value.toFixed(x)) {
                console.log(`true`)
                return value.toFixed(x)
            }
            console.log(`false`)
            return value.toFixed(5)
        }
    }
    return value;
}

function tidyCommas(value) {
    stringValue = (value.toString()).split(``)
    length = stringValue.length;
    console.log(`value: ` + value + ` | length: ` + length);
    totalCommas = parseInt(length / 3);
    console.table(`total commas: ` + totalCommas);
    for(x = 0; x <= totalCommas; x++) {

    }
    return value;
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