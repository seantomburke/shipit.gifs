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
  assert('The existing names cannot be changed', _names.some((name, i) => gifs[i] && name !== gifs[i].name));
  assert('The existing entries cannot be removed', gifs.length < _names.length);
  assert('The entry needs to include an _id', gifs.some(gif => gif._id == null));
  assert('The entry needs to include a description', gifs.some(gif => gif.description == null));
  assert('The entry needs to include a name', gifs.some(gif => gif.name == null));
  assert('The entry needs to include a url', gifs.some(gif => gif.url == null));
  assert('The _id needs to be the same as its index in the array', (gifs.some((gif, i) => gif._id !== i)));
  assert('The _id needs to be a number', gifs.some(gif => !/\d+/g.test(gif._id) || !(typeof gif._id === 'number')));
  assert('The name must not start with a number', gifs.some(gif => /^\d/g.test(gif.name)));
  assert('The name must be unique', !(names.length === new Set(names).size));
}

test(); 
(errors-- && !errors && cache() && console.log(green, 'All tests passed'));
(errors && console.error(red, 'Tests Failed'));
process.exit(errors);