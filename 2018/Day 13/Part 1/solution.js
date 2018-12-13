var fs = require('fs');

fs.readFile(__dirname + '/input.txt', (err, data) => {
    if (err) {throw err}
    
    var cars  = [];
    var board = [];
    var last  = {right: 'left', left: 'straight', straight: 'right'};
    data.toString().split("\n").map((row, yIndex) => {
        board[yIndex] = [];
        row.split('').map((piece, xIndex) => {
            if (piece == '<' || piece == '>' || piece == '^' || piece == 'v') {
                var direction = piece;
                switch (piece) {
                    case '<':
                    case '>':
                        piece = '-';
                        break;
                    case '^':
                    case 'v':
                        piece = '|';
                }
                cars.push({x: xIndex, y: yIndex, direction: direction, last: 'right'});
            }
            
            board[yIndex][xIndex] = piece;
        })
    })

    var crash = null;
    while (!crash) {
        // Sort cars by top left most
        cars = cars.sort(function(a,b){
            if (a.x===b.x) {
                if (a.y === b.y) {crash = a.x+','+a.y;}
                return (a.y-b.y);
            } 
            else if (a.x>b.x) {
                return 1;
            } 
            else if (a.x<b.x) {
                return -1;
            }
        });
        if (crash) {break;}

        // Move cars check for crashes
        var newCars = [];
        cars.map(car => {
            var newCar = JSON.parse(JSON.stringify(car));
            var boardLoc = null;
            switch (car.direction) {
                case '<':
                    boardLoc = board[car.y][car.x];
                    break;
                case '>':
                    boardLoc = board[car.y][car.x];
                    break;
                case '^':
                    boardLoc = board[car.y][car.x];
                    break;
                case 'v':
                    boardLoc = board[car.y][car.x];
            }

            // Set next car direction
            if (boardLoc == '\\') {
                if (newCar.direction == '>')      {newCar.direction = 'v';}
                else if (newCar.direction == '<') {newCar.direction = '^';}
                else if (newCar.direction == '^') {newCar.direction = '<';}
                else if (newCar.direction == 'v') {newCar.direction = '>';}
            }
            else if (boardLoc == '/') {
                if (newCar.direction == '>')      {newCar.direction = '^';}
                else if (newCar.direction == '<') {newCar.direction = 'v';}
                else if (newCar.direction == '^') {newCar.direction = '>';}
                else if (newCar.direction == 'v') {newCar.direction = '<';}
            }
            else if (boardLoc == '+') {
                if (last[newCar.last] == 'left')  {
                    if (newCar.direction == '>')      {newCar.direction = '^';}
                    else if (newCar.direction == '^') {newCar.direction = '<';}
                    else if (newCar.direction == '<') {newCar.direction = 'v';}
                    else if (newCar.direction == 'v') {newCar.direction = '>';}
                }
                if (last[newCar.last] == 'right') {
                    if (newCar.direction == '>')      {newCar.direction = 'v';}
                    else if (newCar.direction == '^') {newCar.direction = '>';}
                    else if (newCar.direction == '<') {newCar.direction = '^';}
                    else if (newCar.direction == 'v') {newCar.direction = '<';}
                }
                newCar.last = last[newCar.last];
            }

            // Grab board piece and move the car
            switch (newCar.direction) {
                case '<':
                    --newCar.x;
                    break;
                case '>':
                    ++newCar.x;
                    break;
                case '^':
                    --newCar.y
                    break;
                case 'v':
                    ++newCar.y
            }

            newCars.push(newCar);
        });
        cars = newCars;
    }

    console.log(`Answer: ${crash}`)
    process.kill(process.pid)
})