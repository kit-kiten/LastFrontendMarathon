function Calc(operator, a, b) {

    if (operator === undefined || a === undefined || b === undefined){
        return 'Error'
    }

    let result

    const operations = {
        sum: a + b,
        subtr: a - b,
        multi: a * b,
        div: a / b,
        remOfDiv: a % b,
        pow: a ** b
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

console.log(Calc('sum', '4', 2))