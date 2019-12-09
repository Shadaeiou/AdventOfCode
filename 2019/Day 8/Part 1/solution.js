var fs        = require('fs');
var input     = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8' });
// input         = '123456789012';
input         = input.split('');
var imageW    = 25;
var imageH    = 6;
var layers    = [];
var currLayer = [];
var currRow   = []; 
var numRows   = 1;

for (var ct = 0; ct < input.length; ct++) {
    currRow.push(input[ct]);
    
    if ((ct + 1) % imageW === 0 && ct) {
        currLayer.push(currRow);
        currRow = [];
        numRows++;
    }
    if (numRows > imageH) {
        layers.push(currLayer);
        currLayer = [];
        numRows = 1;
    }
}

// Find layer with least number of zeroes
var num0 = 9999999999999;
var answer;
for (var ct = 1; ct < layers.length; ct++) {
    var layer    = layers[ct];
    var currNum0 = 0;
    var num1     = 0;
    var num2     = 0;
    for (var h = 0; h < imageH; h++) {
        for (var w = 0; w < imageW; w++) {
            if (layer[h][w] == 0) {
                currNum0++;
            }
            if (layer[h][w] == 1) {
                num1++;
            }
            if (layer[h][w] == 2) {
                num2++;
            }
        }
    }
    if (currNum0 < num0) {
        num0   = currNum0;
        answer = num1 * num2;
    }
}

console.log(`Answer: ${answer}`);