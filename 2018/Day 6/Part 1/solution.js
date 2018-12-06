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
    var area  = {}
    var edges = {}
    for (var y = minY*1 - 1; y < maxY*1 + 2; y++) {
        for (var x = minX*1 - 1; x < maxX*1 + 2; x++) {
            // Loop through each coordinate
            var closest = {distance: 999999, index: 'lol'}
            coords.map(coord => {
                var distance = getMDistance(coord, {x: x, y: y})
                if (distance < closest.distance)       {closest = {distance: distance, index: coord.index}}
                else if (distance == closest.distance) {closest.index = '.'                                }
            })

            if (!area[closest.index])                       {area[closest.index] = 1; }
            else                                            {area[closest.index]++;   }
            if (x == 0 || y == 0 || x == maxX || y == maxY) {edges[closest.index] = 1;}
        }
    }

    // Take the non-edge indexes and see which of those have the largest area
    var largest = 0;
    var edges   = Object.keys(edges);
    for (var key in area) {
        if (!area.hasOwnProperty(key))                        {continue;           }
        if (area[key] > largest && edges.indexOf(key) === -1) {largest = area[key];}
    }

    console.log(`Answer: ${largest}`)
    process.kill(process.pid)
})