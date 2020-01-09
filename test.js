const { gifs } = require('./gifs.json');
const { names } = require('./.cache.json');
const fs = require('fs');

const red = '\u001B[31m𝗑';
const green = '\u001B[32m⚬';
let errors = 1;
let mark = green;
const _names = gifs.map(gif => gif.name);

const assert = (message, condition) => {
  (mark = green) && condition && errors++ && (mark = red);
  console.log(mark, message);
};

const test = () => {
  assert('The _id needs to be the same as its position in the array', (gifs.some((gif, i) => gif._id !== i + 1)));
  assert('The name must not start with a number', gifs.some((gif, i) => /^[0-9]/g.test(gif.name)));
  assert('The existing name cannot be changed, make a new entry instead', names.some((name, i) => gifs[i] && name !== gifs[i].name));
  assert('The name must be a unique name that does not already exist', !(_names.length === new Set(_names).size));
  assert('The existing entries cannot be removed', gifs.length < names.length);
  assert('The entry needs to include a description property', gifs.some((gif, i) => !gif.description || !gif.description.length));
  assert('The entry needs to include a name property', gifs.some((gif, i) => !gif.name || !gif.name.length));
  assert('The entry needs to include a url property', gifs.some((gif, i) => !gif.url || !gif.url.length));
}

const cache = () => (_cache = { names: _names }, fs.writeFileSync('./.cache.json', JSON.stringify(_cache)), true);

test();
errors-- && !errors && cache() && console.log(green, 'All tests passed')
errors && console.error(red, 'Tests Failed');
process.exit(errors);