const fs = require('fs');
const { exec } = require('child_process');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let { gifs } = require('./gifs.json');
// const gifsBackup = JSON.stringify({ gifs }, null, 2);

rl.question('Enter the GIF URL:\n', function (url) {
  rl.question('Enter the GIF name:\n', function (name) {
    rl.question('Enter the GIF description:\n', function (description) {
      gifs.push({
        _id: gifs.length,
        name,
        url,
        description,
        active: 1,
      });
      rl.close();
    });
  });
});

rl.on('close', function () {
  fs.writeFileSync('./gifs.json', JSON.stringify({ gifs }, null, 2));
  console.log('Running tests...');
  exec('yarn test', (err, stdout, stderr) => {
    // NOTE: this _almost_ works. Need to figure out how to read the
    // stderr to make a decision on whether to commit or revert the changes.
    // if (stderr) {
    //   console.log(stdout, stderr);
    //   console.log('The GIF did not pass the tests.\nReverting entry\n(See test output above)\n');
    //   console.log('Attempted entry:\n', gifs.at(-1));
    //   fs.writeFileSync('./gifs.json', gifsBackup);
    //   process.exit(1);
    // } else {
    //   console.log('GIF added and tests passed!', gifs.at(-1));
    // }
    console.log(stdout, stderr);
    console.log('\nGIF was added\n', gifs.at(-1));
    process.exit(0);
  });
});
