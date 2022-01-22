function Calc(operator, a, b) {
    if (operator === undefined || a === undefined || b === undefined){
        return 'Error'
    }

    let result

    switch (operator){
        case 'sum':
            result = a + b
            break
            
        case 'subtr':
            result = a - b
            break

        case 'multi':
            result = a * b
            break

        case 'div':
            result = a / b
            break

        case 'remOfDiv':
            result = a % b
            break

        case 'pow':
            result = a ** b
            break
        default:
            return 'unknown operator'
    }

    if (result === result && typeof result == 'number'){
        return result
    }

    return 'Error'
}

console.log(Calc('div', 4, 2))