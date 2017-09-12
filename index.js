/* @flow */
'use strict';

const readPkgUp = require('read-pkg-up');

const git = require('./lib/git.js');
const diff = require('./lib/diff.js');

async function main(input /* : string[] */) {
  if (!process.env.GITHUB_OAUTH_TOKEN) {
    /* eslint-disable no-console */ // show tip for better user experience
    console.log(`
    TIP: set the GITHUB_OAUTH_TOKEN environment variable to improve accuracy
`);
    /* eslint-enable no-console */
  }

  const oldPkg = JSON.parse(await git.gitShow(input[0], 'package.json'));
  const { pkg } = await readPkgUp({ cwd: process.cwd() });

  const delta = diff.diffPackages(oldPkg, pkg);
  const text = await diff.deltaToMarkdown(delta, oldPkg); // CLI tool, relax!
  /* eslint-disable no-console */ console.log(text);
  /* eslint-enable no-console */
}

module.exports = {
  main,
};
