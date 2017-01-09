/* @flow */
'use strict'

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

module.exports = {
  nameToMarkdown
}
