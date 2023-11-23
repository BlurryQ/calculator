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

const buttons = document.querySelectorAll(`div.button`);
buttons.forEach(button => {
    button.addEventListener(`click`, () => {
        resultScreen.style.cssText = `color: white;`;
        operate(button.id, masterArray);
    })
});

function operate(inputValue, arr) {
    data = arr[0],
    ops = arr[1];
    data.push(inputValue);
    amountOps = ops.length;
    if(isNaN(inputValue) && inputValue != `.`) {
        ops.push(inputValue)
        if(inputValue ===`clear`) {
            return clearData(arr, true);
        }
        if(inputValue ===`remove`) {
            removeLastEntry(arr);
        }
        if(ops.length > 0) {
            firstOp = ops[0].toString();
            if((firstOp === `=`) && (inputValue === `=`)) {
                displayError(`firstOpIsEquals`);
                removeLastEntry(arr, false)
                return;
            }
        }
    }
    values = getValues(arr);
    if(inputValue === `.`) {
        removeDecimal = decimalCheck(values);
        if(removeDecimal) {
            data.splice(-1,1)
        }
    }
    displayEntry(values);
    if(amountOps === 2) {
        infoScreen.textContent += lastOp;
        result = calculate(values);
        if(result === `error`) { return; }
        resultString = result.toString(),
        resultLength = resultString.length;
        if(resultLength > 15) {
            return displayError(`tooLong`);
        }
        displayResult(result);
        clearData(arr);
        a = result;
        (arr[0]).push(a);
        lastOp = lastOp.toString();
        if(!(lastOp === `=`)) { 
            (arr[0]).push(lastOp);
            (arr[1]).push(lastOp);
        }
    }
}

function getValues(arr) {
    gvValues = [],  
    ops = arr[1],
    trueOp = ops[0],
    data = arr[0],
    lastOp = ops[1],
    amountOps = ops.length;
    switch(amountOps) {
        case 0:
                copyData =  data.slice(0);
                a = copyData.splice(0);
                aLength = a.length;
                if(aLength > 15) {
                    displayError(`tooLong`)      
                    removeLastEntry(arr, false)              
                }
                a = a.join(``);
                if(a === `0`) { data.splice(0,1) }
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
                if(a === ``) { a = `0`}
                bLength = b.length;
                if(bLength > 15) {
                    ops.push(trueOp)
                    displayError(`tooLong`)      
                    removeLastEntry(arr, false)              
                }
                gvValues.push(a, trueOp, b);
                break;
        case 2:
                opIndex = data.indexOf(trueOp);
                lastOp = data.splice(-1);
                b = data.splice(opIndex+1).join(``);
                op = data.splice(opIndex);
                a = data.splice(0).join(``);
                if(a === ``) { a = `0`}
                if(b === ``) { b = `0`}
                gvValues.push(a, trueOp , b);
    }
    return gvValues;
}

function decimalCheck(arr) {
    removeDecimal = false,
    a = arr[0],
    a = a.split(``),
    b = arr[2],
    bExists = false;
    if(b !== undefined) {
        bExists = true;
        b = b.split(``);
    } 
    aTotalDecimals = a.filter(item => item === `.`) 
    if(aTotalDecimals.length === 2) {
        removeDecimal = true;
    }
    if(bExists) {
        bTotalDecimals = b.filter(item => item === `.`) 
        if(bTotalDecimals.length === 2) {
            removeDecimal = true;
        }  
    }
    return removeDecimal;
}

function displayEntry(arr) {
    infoScreen.textContent = ``;
    if(arr[0][0] === undefined) {
        infoScreen.textContent = `0`;
    } else {
        arr.forEach(value => {
            value = formatValueForDisplay(value);
            infoScreen.textContent += value;   
        });
    }
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
    if(value.toFixed(5) == `1.00000`) { 
        return `99999`}
    else if(valueLength >= 5) {
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
        isNegative = stringValue.includes(`-`)
        if(isNegative) {
            totalCommas = parseInt((stringLength-2) / 3);
            for(x = 1; x <= totalCommas; x++) {
                stringValue.splice((stringLength-(3 * x)), 0, `,`);
            }
            return stringValue.join(``);
        } else {
            totalCommas = parseInt((stringLength-1) / 3);
            for(x = 1; x <= totalCommas; x++) {
                stringValue.splice((stringLength-(3 * x)), 0, `,`);
            }
            return stringValue.join(``);
        }
}

function calculate(arr) {
    a = parseInt((arr[0]*10000));
    op = arr[1],
    b = parseInt((arr[2]*10000));
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

function removeLastEntry(arr, byInput = true) {
    let input = arr[0],
    inputLength = input.length,
    lastInput = input[inputLength-2], //-2 as last input = remove
    ops = arr[1];
    ops.splice(-1,1)
    opsLength = ops.length;
    if(!(byInput)) {
        input.splice(-1,1)
        return;
    }
    if(opsLength > 0 && (isNaN(lastInput) && lastInput != `.`)) {
        input.splice(-2,2);
        ops.splice(-1,1);
    } else if(opsLength > 0) {
        input.splice(-2,2);
    } else {
        input.splice(-2,2);
        ops.splice(-1,1);
    }
    rlValues = getValues(arr);
    displayEntry(rlValues);
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
    switch(record) {
        case `firstOpIsEquals`:     resultScreen.textContent = `Error: No operators found`;
                                    return `error`;
        case `divideZero`:          infoScreen.textContent = `Error:`;
                                    resultScreen.textContent = `Even Google can't do that!!`;
                                    return `error`;
        case `tooLong`:             resultScreen.textContent = `Error: Exceeds maximum digits`;
                                    return `error`;
    }
}