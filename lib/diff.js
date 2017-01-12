/* @flow */
'use strict'

const os = require('os')

const depDiff = require('dependency-diff')
const semver = require('semver')

const npm = require('./npm.js')

// http://semver.org/#spec-item-9
// 1.0.0, 1.0.0-foo1, 1.0.0-foo1.blah2, 1.0.0-foo1.blah2.abc3, ...
const VERSION_REGEXP = /\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?/

function versionToMarkdown (
  version /* : string */,
  changelogUrl /* : string */
) /* : string */ {
  const [ versionNumbers ] = version.match(VERSION_REGEXP) || []
  if (!versionNumbers) {
    return version
  }
  if (changelogUrl) {
    return version.replace(versionNumbers, `[${versionNumbers}](${changelogUrl})`)
  }
  return version
}

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
      npm.changelogUrlFor(name),
      promise
    ])
      .then(([ label, changelogUrl, result ]) => {
        let versionLabel = versionToMarkdown(version, changelogUrl)

        let line
        if (operation === 'delete') {
          line = `-   no longer depend upon ${label}`
        } else if (operation === 'new') {
          line = `-   depend upon ${label} ${versionLabel}`
        } else if (operation === 'edit') {
          const oldVersion = oldDependencies[name]
          if (semver.lt(oldVersion, version)) {
            line = `-   update ${label} to ${versionLabel} (from ${oldVersion})`
          } else if (semver.gt(oldVersion, version)) {
            line = `-   rollback ${label} to ${versionLabel} (from ${oldVersion})`
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
  diffPackages,
  versionToMarkdown
}
