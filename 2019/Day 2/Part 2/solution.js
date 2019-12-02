var fs = require('fs');

(async () => {
    var searching = true;
    var noun      = 0;
    var verb      = 0;

    while (searching) {
        if (noun == 99 && verb == 99) {break;}
        var input = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8' }).split(',');
        
        var done  = false;
        if (verb == 99) {verb = 0;noun++;}
        else            {verb++;         }
        input[1]  = noun;
        input[2]  = verb;
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
                done = true;
                return;
            }
            else {
                console.log(`Invalid opcode ${opC}`);
            }

            input[input[index+3]] = tot;
        });

        if (input[0] == 19690720) {
            console.log(`Found: ${100 * noun + verb}`);
        }
    }
})();