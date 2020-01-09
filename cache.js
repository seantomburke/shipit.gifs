
let { gifs } = require('./gifs.json');
const fs = require('fs');

const names = gifs.reverse().map(gif => gif.name);
const cache = () => (_cache = { _names: names }, fs.writeFileSync('./.cache.json', JSON.stringify(_cache)), console.log('\033[38;5;229m', 'Cache updated'));
cache();