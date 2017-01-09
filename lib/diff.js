/* @flow */
'use strict'

const os = require('os')

const depDiff = require('dependency-diff')
const semver = require('semver')

const npm = require('./npm.js')

function deltaToMarkdown (
  diff /* : Object */,
  oldPkg /* : Object */
) /* : Promise<string> */ {
  const oldDependencies = oldPkg.dependencies || {}

  const depDeltas = diff.dependencies || []

  // serial iteration with Promises
  return depDeltas.reduce((promise, { name, operation, version }) => {
    return Promise.all([
      npm.nameToMarkdown(name),
      promise
    ])
      .then(([ label, result ]) => {
        let line
        if (operation === 'delete') {
          line = `-   no longer depend upon ${label}`
        } else if (operation === 'new') {
          line = `-   depend upon ${label} ${version}`
        } else if (operation === 'edit') {
          const oldVersion = oldDependencies[name]
          if (semver.lt(oldVersion, version)) {
            line = `-   update ${label} to ${version} (from ${oldVersion})`
          } else if (semver.gt(oldVersion, version)) {
            line = `-   rollback ${label} to ${version} (from ${oldVersion})`
          }
        }
        return line ? (result + os.EOL + line + os.EOL) : result
      })
  }, Promise.resolve(os.EOL + '### Changed' + os.EOL))
}

function diffPackages (
  oldPkg /* : Object */,
  pkg /* : Object */
) /* : Object */ {
  return depDiff().left(oldPkg).right(pkg).toObject()
}

module.exports = {
  deltaToMarkdown,
  diffPackages
}
