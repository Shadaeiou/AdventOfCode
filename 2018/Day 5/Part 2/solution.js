var fs     = require('fs');

var getLength = (input) => {
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

    return input.length;
} 

fs.readFile(__dirname + '/input.txt', (err, data) => {
    if (err) {throw err}

    var input    = data.toString()
    var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var shortest = 9999999;
    console.log(`Shortest is ${shortest}`)
    alphabet.forEach(letter => {
        console.log(`Trying ${letter}`)
        var length  = getLength(input.replace(RegExp(letter, 'gi'), ''));
        if (length < shortest) {shortest = length;console.log(`Shortest is now ${shortest}`);}
    });
    
    console.log('')
    console.log(`Answer: ${shortest}`)
    process.kill(process.pid)
})