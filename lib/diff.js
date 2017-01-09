/* @flow */
'use strict'

const os = require('os')

const depDiff = require('dependency-diff')
const semver = require('semver')

function deltaToMarkdown (
  diff /* : Object */,
  oldPkg /* : Object */
) /* : Promise<string> */ {
  const oldDependencies = oldPkg.dependencies || {}

  const depDeltas = diff.dependencies || []

  // serial iteration with Promises
  return depDeltas.reduce((promise, { name, operation, version }) => {
    return promise.then((result) => {
      let line
      if (operation === 'delete') {
        line = `-   no longer depend upon ${name}`
      } else if (operation === 'new') {
        line = `-   depend upon ${name} ${version}`
      } else if (operation === 'edit') {
        const oldVersion = oldDependencies[name]
        if (semver.gt(oldVersion, version)) {
          line = `-   update ${name} to ${version} (from ${oldVersion})`
        } else if (semver.lt(oldVersion, version)) {
          line = `-   rollback ${name} to ${version} (from ${oldVersion})`
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
