/* @flow */
'use strict'

const readPkgUp = require('read-pkg-up')

const git = require('./lib/git.js')
const diff = require('./lib/diff.js')

function main (
  input /* : string[] */
) {
  let oldPkg

  if (!process.env.GITHUB_OAUTH_TOKEN) {
    /* eslint-disable no-console */ // show tip for better user experience
    console.log(`
    TIP: set the GITHUB_OAUTH_TOKEN environment variable to improve accuracy
`)
    /* eslint-enable no-console */
  }

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
