let masterArray = [inputtedData = [], inputtedOps = []],
allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '*', '-', '+', '.', '=', `Enter`];

const infoScreen = document.getElementById(`info-screen`);
const resultScreen = document.getElementById(`result-screen`);

const keyboardInput = document.addEventListener(`keypress`, event => {
    resultScreen.style.cssText = `color: white;`;
    if(allowedKeys.includes(event.key)) {
        if(event.key !== `Enter`) { 
            operate(event.key, masterArray);
        } else {
            operate(`=`, masterArray);
        }
    }
})

const buttons = document.querySelectorAll(`button`);
buttons.forEach(button => {
    button.addEventListener(`click`, () => {
        resultScreen.style.cssText = `color: white;`;
        operate(button.id, masterArray);
    })
});


function operate(value, arr) {
    console.warn(`THIS IS THE START`);
    data = arr[0],
    totalOps = arr[1];
    data.push(value);
    ops = arr[1],
    amountOps = ops.length;
    if(isNaN(value) && value != `.`) {
        totalOps.push(value)
        if(value ===`clear`) {
            return clearData(arr, true);
        }
        if(value ===`remove`) {
            return removeLastInput(arr);
        }
        if(totalOps.length > 0) {
            isEquals = totalOps[0].toString();
            if((isEquals === `=`) && (value === `=`)) {
                displayError(`equalsFirstOp`);
                return;
            }
        }
    }
    values = getValues(masterArray);
    displayEntry(values);
    if(amountOps === 2) {
        result = calculate(values);
        if(result === `error`) { return; }
        displayResult(result);
        clearData(masterArray);
        a = result;
        (arr[0]).push(a);
        lastOp = lastOp.toString();
        if(!(lastOp === `=`)) { 
            (arr[0]).push(lastOp);
            (arr[1]).push(lastOp);
        }
    }
}

//maybe getValues switch for removed values? (arr, skipB = false)
function getValues(arr) {
    gvValues = [],  
    trueOp = (arr[1])[0],
    data = arr[0],
    lastOp = (arr[1])[1],
    ops = arr[1],
    amountOps = ops.length;
    switch(amountOps) {
        case 0:
                copyData =  data.slice(0);
                a = copyData.splice(0);
                a = a.join(``);
                gvValues.push(a);
                break;
        case 1: 
                copyData = data.slice(0);
                copyData.forEach((button, index) => {
                    if(isNaN(button) && button != `.`) {
                        b = copyData.splice(index+1);
                        copyData.splice(index,1);
                    }
                });
                op = arr[1][0];
                a = copyData.splice(0);
                a = a.join(``);
                b = b.join(``);
                gvValues.push(a, trueOp, b);
                break;
        case 2:
                opIndex = data.indexOf(trueOp);
                lastOp = data.splice(-1);
                b = data.splice(opIndex+1).join(``);
                op = data.splice(opIndex);
                a = data.splice(0).join(``);
                gvValues.push(a, trueOp , b);
                console.log(`a: ` + a + ` | op: ` + op + ` | b: ` + b)
        
    }
    return gvValues;
}


function displayEntry(arr) {
    infoScreen.textContent = ``;  
    arr.forEach(value => {
        value = formatValueForDisplay(value);
        //console.log(value);
        infoScreen.textContent += value;   
    });
}

function displayResult(value) {
    value = formatValueForDisplay(value);
    resultScreen.textContent = value
    resultScreen.style.cssText = `color: lightgreen;`;
}

function formatValueForDisplay(value) {
    stringValue = value.toString();
    if(!(stringValue.includes(`.`))) {
        value = tidyCommas(value);
    } else {
        fvdValues = stringValue.split(`.`),
        integers = tidyCommas(fvdValues[0]),
        decimals = tidyDecimals(fvdValues[1]);
        value = integers + `.` + decimals;

    }
    console.log(`fvValue: ` + value)
    return value;
}

function tidyDecimals(value) {
    decimalValue = 0,
    valueLength = value.length,
    makeDecimal = [1];
    for(x = 1; x <= valueLength; x++) {
        makeDecimal.push(0);
    }
    makeDecimal = makeDecimal.join(``);
    value = value / makeDecimal;
    if(valueLength >= 5) {
        decimalValue = value.toFixed(5);
    } else {
        for(x = 1; x <= 5; x++) {
            if (value == value.toFixed(x)) {
                decimalValue = value.toFixed(x);
                break;
            }
        }
    }
    decimals = decimalValue.split(`.`);
    if(decimals[1] === `0`) { decimals[1] = ``; }
    return decimals[1];
}

function tidyCommas(value) {
        stringValue = (value.toString()).split(``);
        stringLength = stringValue.length;
        totalCommas = parseInt((stringLength-1) / 3);
        for(x = 1; x <= totalCommas; x++) {
            stringValue.splice((stringLength-(3 * x)), 0, `,`);
        }

        return stringValue.join(``);
}

function calculate(arr) {
    a = parseInt((arr[0]*10000));
    op = arr[1],
    b = parseInt((arr[2]*10000));
    console.log(`a: ` + a + ` | op: ` + op + ` | b: ` + b)
    if(op === `/` && (a === 0 || b === 0)) { return displayError(`divideZero`)}
    switch(op) {
            case "+": return add(a,b)/10000;
            case "-": return subtract(a,b)/10000;
            case "*": return multiply(a,b)/(10000*10000);
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

//getvalues will find b if opLength = 1. switch in GV or something here
function removeLastInput(arr) {
    let input = arr[0],
    inputLength = input.length,
    lastInput = input[inputLength-2], //-2 as last input = remove
    ops = arr[1];
    ops.splice(-1,1)
    opsLength = ops.length;
    console.log(`lastinPut ` + lastInput + ` | opsLength: ` + opsLength)
    console.table(ops)
    console.warn(`lastInput is not a number: ` + (isNaN(lastInput)))
    //if op length > 0 and b = `` ?
    if(opsLength > 0 && isNaN(lastInput)) {
        input.splice(-2,2);
        console.table(input)
        console.table(ops)
        console.log(`level 1`)
    } else if(opsLength > 0) {
        input.splice(-2,2);
        ops.splice(-1,1);
        console.table(input)
        console.table(ops)
        console.log(`level 2`)
    } else {
        input.splice(-2,2);
        ops.splice(-1,1);
        console.log(`level 3`)
    }
    rlValues = getValues(masterArray);
    console.table(rlValues);
    displayEntry(rlValues);
    if(input.length === 0) {
        infoScreen.textContent = 0
    }
}

function clearData(arr, full = false) {
    arr[0].splice(0);
    arr[1].splice(0);
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