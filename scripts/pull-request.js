const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function run() {
  const r = new RegExp(/(\+      "url": "|",\n)/gm);
  const { stdout: rawGIFLines } = await exec(`git diff master... gifs.json | grep '+      "url": '`);
  const newGIFLinks = rawGIFLines.replace(r, '').split('+      url: ');
  console.log('Writing PR body with new GIFs: ', newGIFLinks);
  const formattedGIFMarkDown = newGIFLinks.map((gifURL) => `![New GIF](${gifURL})\n`);
  const { stdout: branch } = await exec('git branch --show-current');
  console.log('Pushing changes to remote\n');
  await exec(`git push origin -u ${branch}`);
  console.log('Remote received changes\n');
  console.log('Opening new PR\n');
  const { stdout: message } = await exec(
    `gh pr create --title 'Adding More Gifs' --body '## Added GIFs \n\n ${formattedGIFMarkDown}'`
  );
  console.log(`New PR opened @ ${message.replace('\n', '')}`);
}

run();
