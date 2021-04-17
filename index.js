/* @flow */
'use strict';

const readPkgUp = require('read-pkg-up');

const git = require('./lib/git.js');
const diff = require('./lib/diff.js');

async function main(
  { previousVersion, cwd } /* : { previousVersion: string, cwd: string } */
) /* : Promise<string> */ {
  const oldPkg = JSON.parse(await git.gitShow(previousVersion, 'package.json'));
  const { packageJson } = await readPkgUp({ cwd });

  const delta = diff.diffPackages(oldPkg, packageJson);
  const text = await diff.deltaToMarkdown(delta, oldPkg); // CLI tool, relax!
  return text;
}

module.exports = {
  main,
};
