var fs = require('fs');

var totalFuel = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8' }).split("\n").reduce((currentFuel, mass) => {
    return currentFuel + Math.floor(mass / 3 - 2);
}, 0);

console.log(`Answer: ${totalFuel}`);