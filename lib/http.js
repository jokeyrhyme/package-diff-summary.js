/* @flow */
'use strict'

const got = require('got')

function isUrlHealthy (testUrl /* : string */) /* : Promise<string> */ {
  return got(testUrl, {
    method: 'HEAD',
    timeout: 5e3
  })
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

module.exports = {
  isUrlHealthy
}
