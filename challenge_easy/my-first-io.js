const fs = require('fs');
const buf = fs.readFileSync(process.argv[2]);
const str = buf.toString().split('\n').length;
console.log(str - 1);
