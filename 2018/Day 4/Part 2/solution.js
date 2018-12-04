var fs     = require('fs');
var moment = require('moment')

fs.readFile(__dirname + '/input.txt', (err, data) => {
    if (err) {throw err}

    var input = data.toString()
    var lines = input.split('\n');
    var dForm = 'YYYY-MM-DD HH:mm';

    // Sort the lines by date and time
    lines.sort((a, b) => {
        return moment(a.substring(1, a.indexOf('] ')), dForm).diff(moment(b.substring(1, b.indexOf('] ')), dForm))
    });

    // Set up some trackers
    var minsByGuard      = {};
    var worstGuard       = {id: null, value: null, minute: null};

    // Build guard minutes and find worst guard
    for (var ct = 0; ct < lines.length; ct++) {
        var line = lines[ct];

        // Find only guard lines
        if (line.indexOf('#') === -1) {continue;}

        // Grab pertinent data
        var dt      = moment(line.substring(1, line.indexOf('] ')), dForm);
        var guardId = line.substring(line.indexOf('#') + 1, line.indexOf(' begins'));
        
        // Grab next line until he falls asleep or next line is a guard
        var next = ct+1;
        var fall = null;
        while(true) {
            if (next >= lines.length)            {break;} // Out of range
            if (lines[next].indexOf('#') !== -1) {break;} // Guard row

            var dt = moment(lines[next].substring(1, lines[next].indexOf('] ')), dForm);
            if (lines[next].indexOf('falls') !== -1) {fall = dt;}
            if (lines[next].indexOf('wakes') !== -1) {
                var mins    = Math.abs(fall.diff(dt, 'minutes')*1)
                var currMin = fall.format('mm')*1;
                if (!minsByGuard[guardId]) {minsByGuard[guardId] = {total: 0, mins: {}}}
                minsByGuard[guardId].total += mins;
                    
                // Add mins to guard mins and check for worst guard
                for (let ct = 0; ct < mins; ct++) {
                    // Default
                    if (!minsByGuard[guardId].mins[currMin]) {
                        minsByGuard[guardId].mins[currMin] = 0
                    }
                    minsByGuard[guardId].mins[currMin]++;

                    // Check
                    if (!worstGuard.id || minsByGuard[guardId].mins[currMin] > worstGuard.value) {
                        worstGuard.id     = guardId;
                        worstGuard.value  = minsByGuard[guardId].mins[currMin]
                        worstGuard.minute = currMin
                    }
                    currMin++
                }
                fall = null;
            }
            next++;
        }
    };

    console.log(`Answer: ${worstGuard.id * worstGuard.minute}`)
    process.kill(process.pid)
})