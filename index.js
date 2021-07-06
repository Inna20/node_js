const colors = require("colors/safe");

let min = parseInt(process.argv[2]);
let max = parseInt(process.argv[3]);

let simpleNumbersArray = getSimpleNumbers(min, max);

if (simpleNumbersArray.length > 0) {
    let resString = '';
    let currentColor = 0;
    for (let i = 0; i < simpleNumbersArray.length; i++) {
        
        if (resString !== '') {
            resString += ', ';
        }
        switch (currentColor) {
            case 0:
                resString += colors.green(simpleNumbersArray[i]);
                break;
            case 1:
                resString += colors.yellow(simpleNumbersArray[i]);
                break;
            case 2:
                resString += colors.red(simpleNumbersArray[i]);
                break
        }
        currentColor++;

        if (currentColor > 2) {
            currentColor = 0;
        }
    }
    console.log(resString);
}

function getSimpleNumbers(min, max) {
    let res = [];
    if (!Number.isInteger(min) || !Number.isInteger(max)) { 
        console.log('Введите корректный диапазон');
        return res;
    } 
    for (let i = min; i <= max; i++) {
        if (isPrime(i)) {
            res.push(i)
        }
    }
    
    if (res.length === 0) {
        console.log('В указаном диапазоне нет простых чисел');
    }
    return res;
}

function isPrime(num) {
    if ( num === 0 || num === 1 ) {
        return false;
    }
    for ( var i = 2; i < num; i++ ) {
        if ( num % i === 0 ) {
            return false;
        }
    }
    return true;
}