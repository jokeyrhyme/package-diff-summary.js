/* @flow */
'use strict'

const GitHub = require('github')
const githubUrlFrom = require('github-url-from-git')

const http = require('./http.js')

const github = new GitHub({
  protocol: 'https',
  timeout: 5e3
})

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

function releaseUrlFor (
  projectUrl /* : string */,
  version /* : string */ // 1.2.3, 1.2.3-alpha.1, ... no leading "v"
) /* : Promise<string> */ {
  const [ owner, repo ] = projectUrl.split('/').slice(-2)
  return Promise.all([
    github.repos.getReleaseByTag({ owner, repo, tag: version })
      .catch(() => null),
    github.repos.getReleaseByTag({ owner, repo, tag: 'v' + version })
      .catch(() => null)
  ])
    .then((results) => results.filter((result) => !!result)[0])
    .then((release) => release && release.html_url)
}

module.exports = {
  changelogUrlAt,
  projectUrlFor,
  releaseUrlFor
}
