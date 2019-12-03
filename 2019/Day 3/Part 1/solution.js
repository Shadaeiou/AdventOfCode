var fs             = require('fs');
var [wire1, wire2] = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8' }).split('\n');
// var wire1          = "R8,U5,L5,D3";
// var wire2          = "U7,R6,D4,L4";
wire1              = wire1.split(",");
wire2              = wire2.split(",");

var x      = 0;
var y      = 0;
var points = {};

// Wire 1
wire1.map(move => {
    var dir   = move[0];
    var steps = move.substring(1)*1;
    var ct;
    switch (dir) {
        case "R":
            for (ct = 0; ct < steps; ct++) {points[`${++x}_${y}`] = 1;}
            break;
        case "L":
            for (ct = 0; ct < steps; ct++) {points[`${--x}_${y}`] = 1;}
            break;
        case "U":
            for (ct = 0; ct < steps; ct++) {points[`${x}_${++y}`] = 1;}
            break;
        case "D":
            for (ct = 0; ct < steps; ct++) {points[`${x}_${--y}`] = 1;}
            break;
    }
});

x = 0;
y = 0;
var minDistancePt = 9999999999;
var minPt         = "";
wire2.map(move => {
    var dir   = move[0];
    var steps = move.substring(1)*1;
    switch (dir) {
        case "R":
            for (ct = 0; ct < steps; ct++) {
                // Check to see if a point already exists
                if (points[`${++x}_${y}`]) {
                    // Calc distance
                    var distance = Math.abs(x - 0) + Math.abs(y - 0);
                    if (distance < minDistancePt) {
                        minDistancePt = distance;
                        minPt         = `${x}_${y}`;
                    }
                }
            }
            break;
        case "L":
            for (ct = 0; ct < steps; ct++) {
                // Check to see if a point already exists
                if (points[`${--x}_${y}`]) {
                    // Calc distance
                    var distance = Math.abs(x - 0) + Math.abs(y - 0);
                    if (distance < minDistancePt) {
                        minDistancePt = distance;
                        minPt         = `${x}_${y}`;
                    }
                }
            }
            break;
        case "U":
            for (ct = 0; ct < steps; ct++) {
                // Check to see if a point already exists
                if (points[`${x}_${++y}`]) {
                    // Calc distance
                    var distance = Math.abs(x - 0) + Math.abs(y - 0);
                    if (distance < minDistancePt) {
                        minDistancePt = distance;
                        minPt         = `${x}_${y}`;
                    }
                }
            }
            break;
        case "D":
            for (ct = 0; ct < steps; ct++) {
                // Check to see if a point already exists
                if (points[`${x}_${--y}`]) {
                    // Calc distance
                    var distance = Math.abs(x - 0) + Math.abs(y - 0);
                    if (distance < minDistancePt) {
                        minDistancePt = distance;
                        minPt         = `${x}_${y}`;
                    }
                }
            }
            break;
    }
});

console.log(minDistancePt);