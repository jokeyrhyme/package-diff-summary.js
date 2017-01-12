/* @flow */
'use strict'

const execa = require('execa')
const got = require('got')

function nameToMarkdown (name /* : string */) /* : Promise<string> */ {
  const pkgUrl = 'https://www.npmjs.com/package/' + name
  return got(pkgUrl, { method: 'HEAD' })
    .then(() => {
      return `[${name}](${pkgUrl})`
    })
    .catch(() => {
      return name
    })
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
