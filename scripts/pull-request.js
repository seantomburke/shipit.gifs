const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { gifs } = require('../gifs.json');
const { _names: existingGifs } = require('../.cache.json');

async function run() {
  const newGIFLinks = gifs.slice(existingGifs.length, gifs.length).map(({ url }) => url);
  console.log('Writing PR body with new GIFs: ', newGIFLinks);
  const formattedGIFMarkDown = newGIFLinks.map((gifURL) => `![New GIF](${gifURL})\n`);
  const { stdout: branch } = await exec('git branch --show-current');
  console.log('Pushing changes to remote\n');
  await exec(`git push origin -u ${branch}`);
  console.log('Remote received changes\n');
  console.log('Opening new PR\n');
  const { stdout: message } = await exec(
    `gh pr create --add-label automerge --title 'Adding More Gifs' --body '## Added GIFs \n\n ${formattedGIFMarkDown}'`
  );
  console.log(`New PR opened @ ${message.replace('\n', '')}`);
}

run();
