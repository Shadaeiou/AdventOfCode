var fs = require('fs');

fs.readFile(__dirname + '/input.txt', (err, data) => {
    if (err) {throw err}

    var input  = data.toString()
    var ids    = input.split('\n');
    var points = {};
    var noLaps = []

    // Convert the input into points and also check for laps
    for (var ct = 0; ct < ids.length; ct++) {
        var id      = ids[ct];
        var ident   = id.substring(1, id.indexOf(' @'));
        var topLeft = id.substring(id.indexOf('@')+2, id.indexOf(':'));
        var top     = topLeft.split(',')[1]*1
        var left    = topLeft.split(',')[0]*1
        var dims    = id.substr(id.indexOf(': ')+2)
        var width   = dims.split('x')[0]*1
        var height  = dims.split('x')[1]*1
        var curr    = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                var point = left+x+'_'+(top+y)
                curr.push(point)
                if (points[point] == null) {points[point] = 1;continue;}
                points[point]++;
            }
        }

        // Quick check for laps
        var hasLap = false;
        for (let ct = 0; ct < curr.length; ct++) {
            if (points[curr[ct]] > 1) {hasLap = true;break;}
        }
        if (!hasLap) {noLaps.push({id: ident, points: curr})}
    }

    // Mega check for laps
    for (let ct = 0; ct < noLaps.length; ct++) {
        var curr   = noLaps[ct];
        var hasLap = false;
        for (let ct = 0; ct < curr.points.length; ct++) {
            if (points[curr.points[ct]] > 1) {hasLap = true;break;}
        }
        if (!hasLap) {console.log(`Answer: ${curr.id}`)}
    }
    process.kill(process.pid)
})