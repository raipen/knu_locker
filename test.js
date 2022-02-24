const spawn = require('child_process').spawn;


const result = spawn('python', ['./python/assign_locker.py']);

result.stdout.on('data', (data) => {
    console.log(data.toString());
});

result.stderr.on('data', (data) => {
    console.error(data.toString());
});



