/* @flow */
'use strict'

const depDiff = require('dependency-diff')

const git = require('./lib/git.js')

function main (
  input /* : string[] */,
  pkg /* : Object */
) {
  return git.gitShow(input[0], 'package.json')
    .then((oldPkgString) => JSON.parse(oldPkgString))
    .then((oldPkg) => depDiff().left(oldPkg).right(pkg).toObject())
    .then((diff) => {
      // TODO:
    })
}

module.exports = {
  main
}
