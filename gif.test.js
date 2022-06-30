const urlUtil = require('url');
const probe = require('probe-image-size');
const { gifs } = require('./gifs.json');
const { domains } = require('./domains.json');
const { _names: existingGifs } = require('./.cache.json');
const SPECIAL_CHAR_REGEX = new RegExp(/^[a-zA-Z0-9!?'$,.@#()&%-_\s]+$/);
const IS_NUMBER_REGEX = new RegExp(/\d+/);
const LOWER_CASE_REGEX = new RegExp(/^[a-z]+[a-z0-9-]*$/);
const START_WITH_LOWER_CASE_REGEX = new RegExp(/^[a-z]/);
const MAX_SIZE_IN_BYTES = 5000000;

function isValidHttpUrl(string) {
  let protocol;

  try {
    protocol = new URL(string)?.protocol;
  } catch (_) {
    return false;
  }

  return protocol === 'http:' || protocol === 'https:';
}

let allNames = new Set();
let existingURLs = new Set();

gifs.forEach(({ _id, name, url, description, active }, i) => {
  allNames.add(name);

  describe(`Validating entry: '${name}'`, () => {
    // Only newly added GIFs are tested here
    if (_id > existingGifs.length - 1) {
      const { host, search, hash } = urlUtil.parse(url);

      test('GIF URL doesnt already exist', () => expect(existingURLs.has(url)).not.toBe(true));

      test('GIF size is less than 5MB', async () => {
        const { length: bytes } = await probe(url);
        expect(bytes).toBeLessThan(MAX_SIZE_IN_BYTES);
      });

      test('The _id needs to be the same as its index in the array', async () => expect(_id).toBe(i));

      test('The _id needs to be a number', async () => {
        expect(IS_NUMBER_REGEX.test(_id)).toBe(true);
        expect(typeof _id).toBe('number');
        expect(Number.isInteger(_id)).toBe(true);
      });

      test('New names must be unique', async () => expect(existingGifs.includes(name)).not.toBe(true));

      test('The name is required', async () => expect(typeof name).toBe('string'));

      test('The name must be less than 50 characters', async () => expect(name.length).toBeLessThan(50));

      test('The name must be greater than 1 character', async () => expect(name.length).toBeGreaterThan(1));

      test('The name must only contain lowercase letters, numbers and dashes (-)', async () =>
        expect(LOWER_CASE_REGEX.test(name)).toBe(true));

      test('The name must start with a lowercase letter', async () =>
        expect(START_WITH_LOWER_CASE_REGEX.test(name)).toBe(true));

      test('The url is required', async () => expect(typeof url).toBe('string'));

      test('The url must be less than 2000 characters', async () => expect(url.length).toBeLessThan(2000));

      test('the URL is a valid URL with a protocol', async () => expect(isValidHttpUrl(url)).toBe(true));

      test('The url domain must be an approved domain', async () =>
        expect(domains.includes(host.substring(host.indexOf('.') + 1))).toBe(true));

      test('The url must not have query params', async () => expect(!!search).not.toBe(true));

      test('The url must not have a fragment', async () => expect(!!hash).not.toBe(true));

      test('The description is required', async () => expect(typeof description).toBe('string'));

      test('The description cannot contain special characters', async () =>
        expect(SPECIAL_CHAR_REGEX.test(description)).toBe(true));

      test('The description must be less than 200 characters', async () =>
        expect(description.length).toBeLessThan(200));

      test('The active state is required', async () => {
        expect(active).toBeGreaterThan(-1);
        expect(active).toBeLessThan(2);
      });

      // Only pre-existing GIFs are tested here
    } else {
      existingURLs.add(url);

      test('Existing GIFs should not be modified or removed', () => {
        expect(name).toBe(existingGifs[i]);
        expect(allNames.has(name)).toBe(true);
      });
    }
  });
});
