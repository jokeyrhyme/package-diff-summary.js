/* @flow */
'use strict'

const os = require('os')

const depDiff = require('dependency-diff')
const semver = require('semver')

const npm = require('./npm.js')

// http://semver.org/#spec-item-9
// 1.0.0, 1.0.0-foo1, 1.0.0-foo1.blah2, 1.0.0-foo1.blah2.abc3, ...
const VERSION_REGEXP = /\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?/

// strips any sloppy / range characters, e.g. ^ or >=
function strictVersion (version /* : string */) /* : string */ {
  const [ versionNumbers ] = version.match(VERSION_REGEXP) || []
  return versionNumbers || ''
}

function versionToMarkdown (
  version /* : string */,
  changelogUrl /* : string */
) /* : string */ {
  const versionNumbers = strictVersion(version)
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
      npm.nameToMarkdown(name), // -> label
      npm.changelogUrlFor(name), // -> changelogUrl
      npm.releaseUrlFor(name, strictVersion(version)), // -> releaseUrl
      promise // -> result
    ])
      .then(([
        label,
        changelogUrl,
        releaseUrl,
        result
      ]) => {
        let versionMd = versionToMarkdown(version, releaseUrl || changelogUrl)

        let line
        if (operation === 'delete') {
          line = `-   no longer depend upon ${label}`
        } else if (operation === 'new') {
          line = `-   depend upon ${label} ${versionMd}`
        } else if (operation === 'edit') {
          const oldVersion = oldDependencies[name]
          let oldVersionMd = versionToMarkdown(strictVersion(oldVersion), releaseUrl || changelogUrl)
          if (semver.lt(oldVersion, version)) {
            line = `-   update ${label} to ${versionMd} (from ${oldVersionMd})`
          } else if (semver.gt(oldVersion, version)) {
            line = `-   rollback ${label} to ${versionMd} (from ${oldVersionMd})`
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
