/* @flow */
'use strict'

const githubUrlFrom = require('github-url-from-git')

const http = require('./http.js')

function changelogUrlAt (projectUrl /* : string */) /* : Promise<string> */ {
  const changelogUrl = projectUrl + '/blob/master/CHANGELOG.md'
  return http.isUrlHealthy(changelogUrl)
    .then((yes) => yes ? changelogUrl : '')
}

function projectUrlFor (name /* : string */) /* : Promise<string> */ {
  const npm = require('./npm.js')
  return npm.repositoryUrlFor(name)
    .then(githubUrlFrom)
}

module.exports = {
  changelogUrlAt,
  projectUrlFor
}
