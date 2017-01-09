/* @flow */
'use strict'

const os = require('os')

const depDiff = require('dependency-diff')
const semver = require('semver')

function deltaToMarkdown (
  diff /* : Object */,
  oldPkg /* : Object */
) /* : Promise<string> */ {
  let result = os.EOL + '### Changed' + os.EOL

  const oldDependencies = oldPkg.dependencies || {}

  const depDeltas = diff.dependencies || []

  depDeltas
    .forEach(({ name, operation, version }) => {
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
      if (line) {
        result += os.EOL + line + os.EOL
      }
    })

  return Promise.resolve(result)
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
