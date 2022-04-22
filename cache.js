let { gifs } = require('./gifs.json');
const fs = require('fs');

const names = gifs.map(({ name }) => name);

const cache = () => (
  (_cache = {
    _names: names,
  }),
  fs.writeFileSync('./.cache.json', JSON.stringify(_cache)),
  console.log('\033[38;5;229m', 'Cache updated')
);
cache();
