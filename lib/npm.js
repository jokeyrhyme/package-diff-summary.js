/* @flow */
'use strict'

const execa = require('execa')

const http = require('./http.js')

function nameToMarkdown (name /* : string */) /* : Promise<string> */ {
  const pkgUrl = 'https://www.npmjs.com/package/' + name
  return http.isUrlHealthy(pkgUrl)
    .then((yes) => yes ? `[${name}](${pkgUrl})` : name)
}

function repositoryUrlFor (name /* : string */) /* : Promise<string> */ {
  return execa('npm', [ 'view', name, 'repository.url' ])
    .then(({ stdout }) => stdout)
    .catch(() => '')
}

module.exports = {
  nameToMarkdown,
  repositoryUrlFor
}
