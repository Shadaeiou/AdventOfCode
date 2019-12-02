var fs = require('fs');

const calcFuel = (mass) => {
    return Math.floor(mass / 3 - 2);
}

var input        = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8' });
var totalFuel    = input.split("\n").reduce((currentFuel, mass) => {
    var fuelReq  = calcFuel(mass);
    var totalReq = (fuelReq > 0) ? fuelReq : 0;
    while (fuelReq > 0) {
        fuelReq  = calcFuel(fuelReq);
        totalReq += (fuelReq > 0) ? fuelReq : 0;
    }
    return currentFuel + totalReq;
}, 0);

console.log(`Answer: ${totalFuel}`);