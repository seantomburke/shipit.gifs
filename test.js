const fs = require('fs');
const url = require('url');
let { gifs } = require('./gifs.json');
let { domains } = require('./domains.json');
const { _names } = require('./.cache.json');

const red = '\033[38;5;124m𝗑\033[38;5;196m';
const yellow = '\033[38;5;226m';
const green = '\033[38;5;34m⚬\033[38;5;237m';
const clear = '\033[2J';
let mark = green;
let errors = 1;
const names = gifs.map(gif => gif.name);
const urls = gifs.map(gif => gif.url && url.parse(gif.url).pathname);
const gifs_ = gifs.slice().reverse();

const assert = (message, condition) => ((mark = green) && condition && errors++ && (mark = red), console.log(mark, message));

/**
 * Simple test suite to validate the tests
 * Note: this test suite will be very slow when the array starts to get larger
 */
const test = () => {
  console.log(clear);
  console.log('Running tests for shipit.gifs');
  assert('The existing entries cannot be removed', gifs.length < _names.length);
  assert('The existing names cannot be changed', !_names.every((name, i) => gifs[i] && name === gifs[i].name));
  assert('The _id is required', gifs_.some(gif => !Number.isInteger(gif._id)));
  assert('The _id needs to be the same as its index in the array', (gifs.some((gif, i) => gif._id !== i)));
  assert('The _id needs to be a number', !gifs_.every(gif => /\d+/g.test(gif._id) && typeof gif._id === 'number'));
  assert('The name is required', gifs_.some(gif => gif.name == null || !gif.name));
  assert('The name must be less than 50 characters', !gifs_.every(gif => gif.name && gif.name.length < 50));
  assert('The name must be greater than 1 character', !gifs_.every(gif => gif.name && gif.name.length > 1));
  assert('The name must be unique', !(names.length === new Set(names).size));
  assert('The name must only contain lowercase letters, numbers and dashes (-)', !gifs_.every(gif => gif.name && /^[a-z]+[a-z0-9-]*$/g.test(gif.name)));
  assert('The name must start with a lowercase letter', !gifs_.every(gif => gif.name && /^[a-z]/g.test(gif.name)));
  assert('The url paths must be unique', !(urls.length === new Set(urls).size));
  assert('The url is required', gifs_.some(gif => !gif.url || gif.url == null));
  assert('The url must be less than 2000 characters', !gifs_.every(gif => gif.url && gif.url.length < 2000));
  assert('The url protocol must start with https://', !gifs_.every(gif => gif.url && gif.url.startsWith('https://')));
  assert('The url domain must be an approved domain', !gifs_.every(gif => gif.url && domains.includes((url.parse(gif.url).host || '').split('.').slice(-2).join('.'))));
  assert('The url must not have query params', !gifs_.every(gif => gif.url && !url.parse(gif.url).search));
  assert('The url must not have a fragment', !gifs_.every(gif => gif.url && !url.parse(gif.url).hash));
  assert('The url path must end with .gif', !gifs_.every(gif => gif.url && url.parse(gif.url).pathname.endsWith('.gif')));
  assert('The description cannot contain special characters', !gifs_.every(gif => gif.description && /^[a-zA-Z0-9!?'$,.@#()&%-_\s]+$/.test(gif.description)));
  assert('The description is required', gifs_.some(gif => gif.description == null || !gif.description));
  assert('The description must be less than 200 characters', !gifs_.every(gif => gif.description && gif.description.length < 200));
  assert('The active state is required', gifs_.some(gif => gif.active !== 1 && gif.active !== 0));
}

test(); 
(errors-- && !errors && console.log('\033[38;5;34m', 'All tests passed'));
(errors && console.error(yellow, 'Tests Failed'));
process.exit(errors);