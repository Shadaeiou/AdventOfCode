var fs = require('fs');

var start = 0;
var freqs = {};
fs.readFile(__dirname + '/input.txt', (err, data) => {
    if (err) {throw err}

    var input      = data.toString()
    var iterations = input.split('\n');
    for (var ct = 0; ct < iterations.length; ct++) {
        start += iterations[ct]*1
        if (ct == iterations.length - 1) {ct = -1;         }
        if (!freqs[start])               {freqs[start] = 1;}
        else                             {break;           }
    }
    console.log(`Answer: ${start}`)
    process.kill(process.pid)
})