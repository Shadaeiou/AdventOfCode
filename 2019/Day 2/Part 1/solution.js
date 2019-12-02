var fs = require('fs');

var done  = false;
var input = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8' }).split(',');
input[1]  = 12;
input[2]  = 2;
input.map((i, index) => {
    if (index % 4 != 0 || done) {return;}
    var opC  = i;
    var num1 = input[input[index+1]]*1;
    var num2 = input[input[index+2]]*1;
    var tot  = 0;
    if (opC == 1) {
        tot = num1 + num2;
    }
    else if (opC == 2) {
        tot = num1 * num2;
    }
    else if (opC == 99) {
        console.log('Exit');
        done = true;
        return;
    }
    else {
        console.log(`Invalid opcode ${opC}`);
    }

    input[input[index+3]] = tot;
});

console.log(`Answer: ${input[0]}`);