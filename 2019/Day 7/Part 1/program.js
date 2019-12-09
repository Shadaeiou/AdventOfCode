module.exports = {
    run: (program, value) => {
        var input = program.split(',');
        var skip  = 0;

        for (var ct = 0; ct < input.length; ct++) {
            if (skip--) {continue;}
            var instruction = input[ct];

            var param1 = input[ct+1] || 0;
            var param2 = input[ct+2] || 0;
            var param3 = input[ct+3] || 0;

            // Parse the instruction
            instruction += '';
            var opCode  = (instruction.length === 1) ? instruction*1 : (instruction[instruction.length-2]+instruction[instruction.length-1])*1;
            var mode1   = instruction[instruction.length-3]*1 || 0;
            var mode2   = instruction[instruction.length-4]*1 || 0;
            var mode3   = instruction[instruction.length-5]*1 || 0;

            // console.log(`Param1: ${param1}`);
            // console.log(`Param2: ${param2}`);
            // console.log(`Param3: ${param3}`);
            // console.log(`Instruction: ${instruction}`);
            // console.log(`OpCode: ${opCode}`);
            // console.log(`Mode1: ${mode1}`);
            // console.log(`Mode2: ${mode2}`);
            // console.log(`Mode3: ${mode3}`);
            
            var val1;
            param1 = param1*1;
            param2 = param2*1;
            if (mode1 == 1) {
                val1 = param1;
            }
            else {
                val1 = input[param1]*1;
            }

            if (mode2 == 1) {
                val2 = param2;
            }
            else {
                val2 = input[param2]*1;
            }

            // console.log(`Val1: ${val1}`);
            // console.log(`Val2: ${val2}`);
            
            if (opCode == 1) { // Addition
                var tot = val1 + val2;
                // console.log(`Total: ${tot}`);

                if (mode3 == 0) {
                    input[param3] = tot;
                }
                else {
                    // console.log('This was said to never be able to happen');
                }
                
                skip = 3;
            }
            else if (opCode == 2) { // Multiplication
                var tot = val1 * val2;
                // console.log(`Total: ${tot}`);

                if (mode3 == 0) {
                    input[param3] = tot;
                }
                else {
                    // console.log('This was said to never be able to happen');
                }
                
                skip = 3;
            }
            else if (opCode == 3) { // This only has one parameter
                input[param1] = value;
                skip          = 1;
            }
            else if (opCode == 4) { // This only has one parameter
                value = val1;
                skip  = 1;
            }
            else if (opCode == 5) { // This only has one parameter
                if (val1 != 0) {
                    ct   = val2 - 1;
                    skip = 0;
                }
                else {
                    skip  = 2;
                }
            }
            else if (opCode == 6) { // This only has one parameter
                if (val1 == 0) {
                    ct   = val2 - 1;
                    skip = 0;
                }
                else {
                    skip  = 2;
                }
            }
            else if (opCode == 7) { // This only has one parameter
                if (val1 < val2) {
                    if (input[param3] != null) {input[param3] = 1;}
                }
                else {
                    if (input[param3] != null) {input[param3] = 0;}
                }

                if (param3 > 1000) {skip = 2;}
                else               {skip = 3;}
            }
            else if (opCode == 8) { // This only has one parameter
                if (val1 == val2) {
                    if (input[param3] != null) {input[param3] = 1;}
                }
                else {
                    if (input[param3] != null) {input[param3] = 0;}
                }

                if (param3 > 1000) {skip = 2;}
                else               {skip = 3;}
            }
            else if (opCode == 99) {
                // console.log('Exit');
                skip = 999999999999999;
                continue;
            }
            else {
                console.log(`Invalid OpCode ${opCode}`);
            }

            // console.log(`Skip: ${skip}`);
            // console.log(`Input: ${input}`);
        }

        return value;
    }
}