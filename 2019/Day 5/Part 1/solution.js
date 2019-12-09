var fs    = require('fs');
var input = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8' });
// input     = '1002,4,3,4,33';
input     = input.split(',');
var skip  = 0;
var value = 1;

input.map((instruction, index) => {
    if (skip--) {return;}

    var param1 = input[index+1] || 0;
    var param2 = input[index+2] || 0;
    var param3 = input[index+3] || 0;

    // Parse the instruction
    instruction += '';
    var opCode  = (instruction.length === 1) ? instruction*1 : (instruction[instruction.length-2]+instruction[instruction.length-1])*1;
    var mode1   = instruction[instruction.length-3]*1 || 0;
    var mode2   = instruction[instruction.length-4]*1 || 0;
    var mode3   = instruction[instruction.length-5]*1 || 0;
    
    var val1;
    if (mode1 == 1) {
        val1 = param1*1;
    }
    else {
        val1 = input[param1]*1;
    }

    if (mode2 == 1) {
        val2 = param2*1;
    }
    else {
        val2 = input[param2]*1;
    }
    
    if (opCode == 1) { // Addition
        var tot = val1 + val2;

        if (mode3 == 0) {
            input[param3] = tot;
        }
        else {
            console.log('This was said to never be able to happen');
        }
        
        skip = 3;
    }
    else if (opCode == 2) { // Multiplication
        var tot = val1 * val2;

        if (mode3 == 0) {
            input[param3] = tot;
        }
        else {
            console.log('This was said to never be able to happen');
        }
        
        skip = 3;
    }
    else if (opCode == 3) { // This only has one parameter
        input[param1] = value;
        skip          = 1;
    }
    else if (opCode == 4) { // This only has one parameter
        value = input[param1];
        skip  = 1;
    }
    else if (opCode == 99) {
        console.log('Exit');
        skip = 999999999999999;
        return;
    }
    else {
        console.log(`Invalid OpCode ${opCode}`);
    }
});

console.log(`Output: ${value}`);