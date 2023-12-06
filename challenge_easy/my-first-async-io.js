const fs = require('fs');
const newfile = fs.readFile(process.argv[2], 'utf-8', (err, data) => {
    if (err) throw err;
    const newlines = data.split('\n').length - 1;
    console.log(newlines)
});
