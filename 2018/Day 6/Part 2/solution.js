var fs     = require('fs');

function getMDistance(ptA, ptB) {
    return Math.abs(ptA.x - ptB.x) + Math.abs(ptA.y - ptB.y)
}

fs.readFile(__dirname + '/input.txt', (err, data) => {
    if (err) {throw err}

    // Manhattan: Take the sum of the absolute values of the differences of the coordinates.
    // For example, if x=(a,b) and y=(c,d), the Manhattan distance between x and y is
    // |a−c|+|b−d|.
    var input   = data.toString()
    var coords  = input.split('\n')

    // Convert string coords into objects and figure out bounds of grid
    var maxX    = 0
    var minX    = 9999999
    var maxY    = 0
    var minY    = 9999999
    var coords  = coords.map((coord, index) => {
        var [x, y] = coord.split(', ');
        if (x > maxX) {maxX = x*1}
        if (y > maxY) {maxY = y*1}
        if (x < minX) {minX = x*1}
        if (y < minY) {minY = y*1}
        return {x: x, y: y, index: index};
    })

    // Create the grid of closest points and also catch the edges
    var safe = 0;
    for (var y = minY*1 - 1; y < maxY*1 + 2; y++) {
        for (var x = minX*1 - 1; x < maxX*1 + 2; x++) {
            // Loop through each coordinate
            var totalDistance = 0;
            coords.map(coord => {
                totalDistance += getMDistance(coord, {x: x, y: y})
            })
            if (totalDistance < 10000) {safe++;}
        }
    }

    console.log(`Answer: ${safe}`)
    process.kill(process.pid)
})