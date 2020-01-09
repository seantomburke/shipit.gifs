const { gifs } = require('./gifs.json');
const { _names } = require('./.cache.json');
const fs = require('fs');

const red = '\u001B[31m𝗑';
const green = '\u001B[32m⚬';
let errors = 1;
let mark = green;
const names = gifs.map(gif => gif.name);

const assert = (message, condition) => ((mark = green) && condition && errors++ && (mark = red), console.log(mark, message));
const cache = () => (_cache = { _names }, fs.writeFileSync('./.cache.json', JSON.stringify(_cache)), true);

const test = () => {
  assert('The _id needs to be the same as its position in the array', (gifs.some((gif, i) => gif._id !== i + 1)));
  assert('The existing names cannot be changed', _names.some((name, i) => gifs[i] && name !== gifs[i].name));
  assert('The existing entries cannot be removed', gifs.length < _names.length);
  assert('The entry needs to include a description', gifs.some((gif, i) => !gif.description || !gif.description.length));
  assert('The entry needs to include a name', gifs.some((gif, i) => !gif.name || !gif.name.length));
  assert('The entry needs to include a url', gifs.some((gif, i) => !gif.url || !gif.url.length));
  assert('The name must not start with a number', gifs.some((gif, i) => /^[0-9]/g.test(gif.name)));
  assert('The name must be unique', !(names.length === new Set(names).size));
}

test(); 
(errors-- && !errors && cache() && console.log(green, 'All tests passed'));
(errors && console.error(red, 'Tests Failed'));
process.exit(errors);