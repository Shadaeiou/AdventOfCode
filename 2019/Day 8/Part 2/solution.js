var fs        = require('fs');
const chalk   = require('chalk');
var input     = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8' });
// input         = '0222112222120000';
input         = input.split('');
var imageW    = 25; // 25
var imageH    = 6; // 6
var layers    = [];
var currLayer = [];
var currRow   = [];
var image     = [];

for (var ct = 0; ct < input.length; ct++) {
    currRow.push(input[ct]);

    var y = ct % imageW;
    var x = currLayer.length;
    
    if (!image[x])    {image[x]    = [];}
    if (!image[x][y]) {image[x][y] = 2; }

    if (image[x][y] == 2) {image[x][y] = input[ct];}
    
    if ((ct + 1) % imageW === 0 && ct) {
        currLayer.push(currRow);
        currRow = [];
    }
    if (currLayer.length == imageH) {
        layers.push(currLayer);
        currLayer = [];
    }
}

const black       = chalk.green.bgGreen;
const white       = chalk.red.bgRed;
const transparent = chalk.hidden;

for (var h = 0; h < imageH; h++) {
    for (var w = 0; w < imageW; w++) {
        const color = image[h][w];
        if (color === '0') process.stdout.write(black('|_|'));
        else if (color === '1') process.stdout.write(white('|_|'));
        else if (color === '2') process.stdout.write(transparent('|_|'));
    }
    console.log();
}