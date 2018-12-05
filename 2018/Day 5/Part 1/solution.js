var fs     = require('fs');

fs.readFile(__dirname + '/input.txt', (err, data) => {
    if (err) {throw err}

    var input = data.toString()
    while (true) {
        var next = false;
        for (var ct = 0; ct < input.length - 1; ct++) {
            let upper = input[ct].toUpperCase();
            let lower = input[ct].toLowerCase();
            if (input[ct] === lower ? input[ct + 1] === upper : input[ct + 1] === lower) {
                input = input.split('');
                input.splice(ct, 2);
                input = input.join('');
                next  = true;
            }
        }
        if (!next) {break;}
    }

    console.log(`Answer: ${input.length}`)
    process.kill(process.pid)
})