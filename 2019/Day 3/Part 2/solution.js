var fs             = require('fs');
var [wire1, wire2] = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8' }).split('\n');
// var wire1          = "R8,U5,L5,D3";
// var wire2          = "U7,R6,D4,L4";
wire1              = wire1.split(",");
wire2              = wire2.split(",");

var x        = 0;
var y        = 0;
var points   = {};
var totSteps = 0;

// Wire 1
wire1.map(move => {
    var dir   = move[0];
    var steps = move.substring(1)*1;
    var ct;
    switch (dir) {
        case "R":
            for (ct = 0; ct < steps; ct++) {
                x++;
                totSteps += 1;
                if (points[`${x}_${y}`] > totSteps || !points[`${x}_${y}`]) {
                    points[`${x}_${y}`] = totSteps;
                }
            }
            break;
        case "L":
            for (ct = 0; ct < steps; ct++) {
                x--;
                totSteps += 1;
                if (points[`${x}_${y}`] > totSteps || !points[`${x}_${y}`]) {
                    points[`${x}_${y}`] = totSteps;
                }
            }
            break;
        case "U":
            for (ct = 0; ct < steps; ct++) {
                y++;
                totSteps += 1;
                if (points[`${x}_${y}`] > totSteps || !points[`${x}_${y}`]) {
                    points[`${x}_${y}`] = totSteps;
                }
            }
            break;
        case "D":
            for (ct = 0; ct < steps; ct++) {
                y--;
                totSteps += 1;
                if (points[`${x}_${y}`] > totSteps || !points[`${x}_${y}`]) {
                    points[`${x}_${y}`] = totSteps;
                }
            }
            break;
    }
});

x            = 0;
y            = 0;
totSteps     = 0;
var minSteps = 9999999999;
wire2.map(move => {
    var dir   = move[0];
    var steps = move.substring(1)*1;
    switch (dir) {
        case "R":
            for (ct = 0; ct < steps; ct++) {
                totSteps++;
                x++;
                // Check to see if a point already exists (intersection)
                if (points[`${x}_${y}`]) {
                    // See if this took the least amount of steps
                    if (points[`${x}_${y}`] + totSteps < minSteps) {
                        minSteps = points[`${x}_${y}`] + totSteps;
                    }
                }
            }
            break;
        case "L":
            for (ct = 0; ct < steps; ct++) {
                x--;
                totSteps++;
                // Check to see if a point already exists (intersection)
                if (points[`${x}_${y}`]) {
                    // See if this took the least amount of steps
                    if (points[`${x}_${y}`] + totSteps < minSteps) {
                        minSteps = points[`${x}_${y}`] + totSteps;
                    }
                }
            }
            break;
        case "U":
            for (ct = 0; ct < steps; ct++) {
                y++;
                totSteps++;
                // Check to see if a point already exists (intersection)
                if (points[`${x}_${y}`]) {
                    // See if this took the least amount of steps
                    if (points[`${x}_${y}`] + totSteps < minSteps) {
                        minSteps = points[`${x}_${y}`] + totSteps;
                    }
                }
            }
            break;
        case "D":
            for (ct = 0; ct < steps; ct++) {
                y--;
                totSteps++;
                // Check to see if a point already exists (intersection)
                if (points[`${x}_${y}`]) {
                    // See if this took the least amount of steps
                    if (points[`${x}_${y}`] + totSteps < minSteps) {
                        minSteps = points[`${x}_${y}`] + totSteps;
                    }
                }
            }
            break;
    }
});

console.log(minSteps);