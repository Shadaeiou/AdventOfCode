var fs           = require('fs');
var [start, end] = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8' }).split('-');

// 123444 no good
// 122444 good
const hasDoubleNotTriple = (digits) => {
    return (
        (digits[0] === digits[1] && digits[1] !== digits[2])
        || (digits[1] === digits[2] && digits[0] !== digits[1] && digits[2] !== digits[3])
        || (digits[2] === digits[3] && digits[1] !== digits[2] && digits[3] !== digits[4])
        || (digits[3] === digits[4] && digits[2] !== digits[3] && digits[4] !== digits[5])
        || (digits[4] === digits[5] && digits[3] !== digits[4]));
};

const doesIncrease = (num) => {
    var does = true;

    for (var ct = 1; ct < num.length; ct++) {
        if (num[ct]*1 < num[ct - 1]*1) {
            does = false;
        }
    }

    return does;
};

// Et tu, brute
var possibles = 0;
for (var ct = 0; ct < end - start; ct++) {
    var next = start*1 + ct*1;
    if (doesIncrease(next+'') && hasDoubleNotTriple(next+'')) {
        possibles++;
    }
}

console.log(`Answer: ${possibles}`);