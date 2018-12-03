var fs = require('fs');

fs.readFile(__dirname + '/input.txt', (err, data) => {
    if (err) {throw err}

    var input  = data.toString()
    var ids    = input.split('\n');
    var dupes  = 0;
    var points = {};

    // Convert the input into points
    for (var ct = 0; ct < ids.length; ct++) {
        var id      = ids[ct];
        var topLeft = id.substring(id.indexOf('@')+2, id.indexOf(':'));
        var top     = topLeft.split(',')[1]*1
        var left    = topLeft.split(',')[0]*1
        var dims    = id.substr(id.indexOf(': ')+2)
        var width   = dims.split('x')[0]*1
        var height  = dims.split('x')[1]*1
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                var point = left+x+'_'+(top+y)
                if (points[point] == null) {points[point] = 1;continue;}
                if (points[point] == 1)    {dupes++;points[point]++;   }
                points[point]++;
            }
        }
    }

    console.log(`Answer: ${dupes}`)
    process.kill(process.pid)
})