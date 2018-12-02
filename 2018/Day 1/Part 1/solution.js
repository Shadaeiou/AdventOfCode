var fs = require('fs');

var start = 0;
fs.readFile(__dirname + '/input.txt', (err, data) => {
    if (err) {throw err}

    var input      = data.toString()
    var iterations = input.split('\n');
    iterations.forEach(val => {
        start += val*1
    })
    console.log(`Answer: ${start}`)
})