const urlUtil = require('url');
const { gifs } = require('./gifs.json');
const { domains } = require('./domains.json');
const { _names: existingGifs } = require('./.cache.json');
const SPECIAL_CHAR_REGEX = new RegExp(/^[a-zA-Z0-9!?'$,.@#()&%-_\s]+$/);
const IS_NUMBER_REGEX = new RegExp(/\d+/);
const LOWER_CASE_REGEX = new RegExp(/^[a-z]+[a-z0-9-]*$/);
const START_WITH_LOWER_CASE_REGEX = new RegExp(/^[a-z]/);

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

describe('Validating all GIFs', () => {
  let allNames = new Set();
  let existingURLs = new Set();

  gifs.forEach(({ _id, name, url, description, active }, i) => {
    allNames.add(name);

    if (_id < existingGifs.length) {
      test(`${name}: Existing GIFs should not be modified`, () => {
        // The existing names cannot be changed
        expect(name).toBe(existingGifs[i]);
      });

      existingURLs.add(url);
    } else {
      test(`${name}: New GIF URL doesnt already exist`, () => {
        expect(existingURLs.has(url)).not.toBe(true);
      });
    }

    test(`${name}: GIF should be valid`, () => {
      // The _id needs to be the same as its index in the array
      expect(_id).toBe(i);

      // The _id needs to be a number
      expect(IS_NUMBER_REGEX.test(_id)).toBe(true);
      expect(typeof _id).toBe('number');
      expect(Number.isInteger(_id)).toBe(true);

      // New names must be unique
      expect(name).not.toBe(existingGifs.includes(name));

      // The name is required
      expect(typeof name).toBe('string');

      // The name must be less than 50 characters
      expect(name.length).toBeLessThan(50);

      // The name must be greater than 1 character
      expect(name.length).toBeGreaterThan(1);

      // The name must only contain lowercase letters, numbers and dashes (-)
      expect(LOWER_CASE_REGEX.test(name)).toBe(true);

      // The name must start with a lowercase letter
      expect(START_WITH_LOWER_CASE_REGEX.test(name)).toBe(true);

      // The url is required
      expect(typeof url).toBe('string');

      // The url must be less than 2000 characters
      expect(url.length).toBeLessThan(2000);

      // the URL is a valid URL with a protocol
      expect(isValidHttpUrl(url)).toBe(true);

      // The url domain must be an approved domain
      const { host } = urlUtil.parse(url);
      expect(domains.includes(host.substring(host.indexOf('.') + 1))).toBe(true);

      // The url must not have query params
      expect(!!urlUtil.parse(url).search).not.toBe(true);

      // The url must not have a fragment
      expect(!!urlUtil.parse(url).hash).not.toBe(true);

      // The description is required
      expect(typeof description).toBe('string');

      // The description cannot contain special characters
      expect(SPECIAL_CHAR_REGEX.test(description)).toBe(true);

      // The description must be less than 200 characters
      expect(description.length).toBeLessThan(200);

      // The active state is required
      expect(active).toBeGreaterThan(-1);
      expect(active).toBeLessThan(2);
    });
  });

  test('The existing entries cannot be removed', () => {
    const existingGIFsStillExist = existingGifs.every((name, i) => allNames.has(name));
    expect(existingGIFsStillExist).toBe(true);
  });
});
