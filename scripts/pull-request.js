const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function run() {
  const r = new RegExp(/(\+      "url": "|",\n)/gm);
  const { stdout: rawGIFLines } = await exec(`git diff master... gifs.json | grep '+      "url": '`);
  const newGIFLinks = rawGIFLines.replace(r, '').split('+      url: ');
  const formattedGIFMarkDown = newGIFLinks.map((gifURL) => `![New GIF](${gifURL})\n`);
  const pr = await exec(`gh pr create --title 'Adding More Gifs' --body '## Added GIFs \n\n ${formattedGIFMarkDown}'`);
  console.log(pr);
}

run();
