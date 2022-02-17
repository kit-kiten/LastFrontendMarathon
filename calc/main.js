function Calc(operator, a, b) {

    if (operator === undefined || a === undefined || b === undefined){
        return 'Error'
    }

    let result

    const operations = {
        '+': +a + +b,
        '-': +a - +b,
        '×': +a * +b,
        '÷': +a / +b
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

const result = document.querySelector('.main-result')
const numberList = document.querySelectorAll('.main-number')
const del = document.querySelector('.main-del')
const delFull = document.querySelector('.main-delete')
const zero = document.querySelector('.main-zero')
const operationList = document.querySelectorAll('.main-operation')

let a = '', b = '', operator

for (let number of numberList){
    number.addEventListener('click', function(){
        if (result.textContent.length >= 6){
            result.style.fontSize = '60px'
        } else{
            result.style.fontSize = '96px'
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

for (let operation of operationList){
    operation.addEventListener('click', function (){
        if (result.textContent.length >= 6){
            result.style.fontSize = '60px'
        } else{
            result.style.fontSize = '96px'
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

del.addEventListener('click', function (){
    if (result.textContent.length >= 6){
        result.style.fontSize = '60px'
    } else{
        result.style.fontSize = '96px'
    }

    let resultLength = result.textContent.length

    for (let operation of operationList){
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

delFull.addEventListener('click', function (){
     result.style.fontSize = '96px'

    result.textContent = '0'
    a = ''
    b = ''
    operator = undefined
})

zero.addEventListener('click', function (){
    if (result.textContent.length >= 6){
        result.style.fontSize = '60px'
    } else{
        result.style.fontSize = '96px'
    }

    const checkZero = result.textContent === '0'
    if (!checkZero){
        result.textContent += zero.textContent
    }
})