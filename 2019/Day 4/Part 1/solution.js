var fs           = require('fs');
var [start, end] = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8' }).split('-');

const hasSameAdjacent = (num) => {
    var does = false;

    for (var ct = 1; ct < num.length; ct++) {
        if (num[ct] == num[ct - 1]) {
            does = true;
        }
    }

    return does;
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
    if (hasSameAdjacent(next+'') && doesIncrease(next+'')) {
        possibles++;
    }
}

console.log(`Answer: ${possibles}`);