var fs = require('fs');

fs.readFile(__dirname + '/input.txt', (err, data) => {
    if (err) {throw err}

    var input  = data.toString()
    var ids    = input.split('\n');
    var twos   = 0;
    var threes = 0;
    for (var ct = 0; ct < ids.length; ct++) {
        var letters = ids[ct].split('')
        var appear  = {}
        for (let ct = 0; ct < letters.length; ct++) {
            if (!appear[letters[ct]]) {appear[letters[ct]] = 0;}
            appear[letters[ct]]++;
        }

        var hasTwo   = false;
        var hasThree = false;
        for (var key in appear) {
            if (!appear.hasOwnProperty(key)) {continue;       }
            if (appear[key] == 2)            {hasTwo   = true;}
            if (appear[key] == 3)            {hasThree = true;}
        }

        if (hasTwo)   {twos++;  }
        if (hasThree) {threes++;}
    }

    console.log(`Answer: ${twos * threes}`)
    process.kill(process.pid)
})