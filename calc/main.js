import {result, BUTTONS} from "./view.js";

function Calc(operator, a, b) {

    if (operator === undefined || a === undefined || b === undefined){
        return 'Error'
    }

    let result

    const operations = {
        '+': Number(a) + Number(b),
        '-': Number(a) - Number(b),
        '×': Number(a) * Number(b),
        '÷': Number((Number(a) / Number(b)).toFixed(5))
    }

    if (operator in operations){
        result = operations[operator]
    } else{
        return 'unknown operator'
    }

    if (result === result && typeof result == 'number'){
        return result
    }

    return 'Error'
}

function changeSize(size){
    return result.style.fontSize = `${size}px`
}

let a = '', b = '', operator

for (let number of BUTTONS.numberList){
    number.addEventListener('click', function(){
        if (result.textContent.length >= 9){
            changeSize(30)
        } else if (result.textContent.length >= 5){
            changeSize(60)
        } else{
            changeSize(96)
        }

        if (result.textContent === '0'){
            result.textContent = number.textContent
        } else {
            result.textContent += number.textContent
        }

        if (!operator){
            a += number.textContent
        } else {
            b += number.textContent
        }

    })
}

for (let operation of BUTTONS.operationList){
    operation.addEventListener('click', function (){
        if (result.textContent.length >= 9){
            changeSize(30)
        } else if (result.textContent.length >= 5){
            changeSize(60)
        } else{
            changeSize(96)
        }

        if (!operator && operation.textContent !== '=') {
            result.textContent += operation.textContent
            operator = operation.textContent
        } else if(operation.textContent === '='){

            result.textContent = Calc(operator, a, b)
            a = Calc(operator, a, b)
            b = ''
            operator = undefined
        }
    })
}

BUTTONS.del.addEventListener('click', function (){
    if (result.textContent.length >= 9){
        changeSize(30)
    } else if (result.textContent.length >= 5){
        changeSize(60)
    } else{
        changeSize(96)
    }

    let resultLength = result.textContent.length

    for (let operation of BUTTONS.operationList){
        if (operation.textContent === result.textContent[resultLength - 1]){
            operator = undefined
            break
        } else if (operator){
            b = b.slice(0, b.length - 1)
        } else{
            a = a.slice(0, a.length - 1)
        }
    }

    result.textContent = result.textContent.slice(0, resultLength - 1)

    const checkResult = result.textContent
    if (!checkResult){
        result.textContent = '0'
    }
})

BUTTONS.delFull.addEventListener('click', function (){
     changeSize(96)

    result.textContent = '0'
    a = ''
    b = ''
    operator = undefined
})

BUTTONS.zero.addEventListener('click', function (){
    if (result.textContent.length >= 9){
        changeSize(30)
    } else if (result.textContent.length >= 5){
        changeSize(60)
    } else{
        changeSize(96)
    }

    const checkZero = result.textContent === '0'
    if (!checkZero){
        result.textContent += BUTTONS.zero.textContent
        if (!operator){
            a += '0'
        } else {
            b += '0'
        }
    }
})