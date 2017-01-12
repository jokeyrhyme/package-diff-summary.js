/* @flow */
'use strict'

const githubUrlFrom = require('github-url-from-git')

const npm = require('./npm.js')

function projectUrlFor (name /* : string */) /* : Promise<string> */ {
  return npm.repositoryUrlFor(name)
    .then(githubUrlFrom)
}

module.exports = {
  projectUrlFor
}
