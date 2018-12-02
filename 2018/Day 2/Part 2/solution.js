var fs = require('fs');
 
fs.readFile(__dirname + '/input.txt', (err, data) => {
    if (err) {throw err}

    var input  = data.toString()
    var ids    = input.split('\n');
    var found  = false;
    var key;
    for (var ct = 0; ct < ids.length; ct++) {
        // Test this id against all other ids
        var current    = ids[ct]
        var currentArr = current.split('')
        for (let ct = 0; ct < ids.length; ct++) {
            var test = ids[ct]
            if (current == test) {continue;}

            var testArr = test.split('')
            var diff    = [];
            for (let ct = 0; ct < testArr.length; ct++) {
                if (currentArr[ct] != testArr[ct]) {diff.push(currentArr[ct])}
            }
            
            // Only one letter is different
            if (diff.length == 1) {
                key = currentArr.filter(x => x != diff[0]).join('')
            }
        }
    }

    console.log(`Answer: ${key}`)
    process.kill(process.pid)
})