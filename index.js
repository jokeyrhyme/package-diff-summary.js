/* @flow */
'use strict'

const readPkgUp = require('read-pkg-up')

const git = require('./lib/git.js')
const diff = require('./lib/diff.js')

function main (
  input /* : string[] */
) {
  let oldPkg

  return Promise.all([
    readPkgUp({ cwd: process.cwd() }),
    git.gitShow(input[0], 'package.json')
      .then((oldPkgString) => JSON.parse(oldPkgString))
      .then((result) => { oldPkg = result })
  ])
    .then(([ { pkg } ]) => diff.diffPackages(oldPkg, pkg))
    .then((delta) => diff.deltaToMarkdown(delta, oldPkg))
    .then((text) => {
      /* eslint-disable no-console */ // CLI tool, relax!
      console.log(text)
      /* eslint-enable no-console */
    })
}

module.exports = {
  main
}
