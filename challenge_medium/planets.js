const fs = require('fs');
const newfiles = fs.readFileSync('planets.txt', 'utf-8');
console.log(newfiles);