/* @flow */
'use strict';

const os = require('os');

const depDiff = require('dependency-diff');
const semver = require('semver');

const npm = require('./npm.js');

// http://semver.org/#spec-item-9
// 1.0.0, 1.0.0-foo1, 1.0.0-foo1.blah2, 1.0.0-foo1.blah2.abc3, ...
const VERSION_REGEXP = /\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?/;

function lineForDelete(nameMd /* : string */) /* : string */ {
  return `-   no longer depend upon ${nameMd}`;
}

function lineForNew(
  nameMd /* : string */,
  versionMd /* : string */
) /* : string */ {
  return `-   depend upon ${nameMd} ${versionMd}`;
}

function lineForRollback(
  nameMd /* : string */,
  versionMd /* : string */,
  oldVersionMd /* : string */
) /* : string */ {
  return `-   rollback ${nameMd} to ${versionMd} (from ${oldVersionMd})`;
}

function lineForUpdate(
  nameMd /* : string */,
  versionMd /* : string */,
  oldVersionMd /* : string */
) /* : string */ {
  return `-   update ${nameMd} to ${versionMd} (from ${oldVersionMd})`;
}

// strips any sloppy / range characters, e.g. ^ or >=
function strictVersion(version /* : string */) /* : string */ {
  const [versionNumbers] = version.match(VERSION_REGEXP) || [];
  return versionNumbers || '';
}

function versionToMarkdown(
  version /* : string */, // assumed strict, no sloppy / range, etc
  changelogUrl /* : string */
) /* : string */ {
  if (changelogUrl) {
    return `[${version}](${changelogUrl})`;
  }
  return version;
}

function wrapWithEol(text /* : string */) /* : string */ {
  return os.EOL + text + os.EOL;
}

function deltaToMarkdown(
  diff /* : Object */,
  oldPkg /* : Object */
) /* : Promise<string> */ {
  const oldDependencies = oldPkg.dependencies || {};

  const depDeltas = diff.dependencies || [];

  // serial iteration with Promises
  return depDeltas.reduce((promise, depDelta) => {
    const { name, operation, version: versionRange } = depDelta;
    const version = strictVersion(versionRange);

    let oldVersionRange, oldVersion;
    if (operation === 'edit') {
      oldVersionRange = oldDependencies[name];
      oldVersion = strictVersion(oldVersionRange);
    }

    return Promise.all([
      npm.nameToMarkdown(name), // -> nameMd
      npm.changelogUrlFor(name), // -> changelogUrl
      npm.releaseUrlFor(name, version), // -> releaseUrl
      oldVersion && npm.releaseUrlFor(name, oldVersion), // -> oldReleaseUrl
      promise, // -> result
    ]).then(([nameMd, changelogUrl, releaseUrl, oldReleaseUrl, result]) => {
      let versionMd = versionToMarkdown(version, releaseUrl || changelogUrl);
      if (operation === 'delete') {
        return result + wrapWithEol(lineForDelete(nameMd));
      }
      if (operation === 'new') {
        return result + wrapWithEol(lineForNew(nameMd, versionMd));
      }
      if (operation === 'edit') {
        let oldVersionMd = versionToMarkdown(
          oldVersion,
          oldReleaseUrl || changelogUrl
        );
        if (semver.lt(oldVersion, version)) {
          return (
            result + wrapWithEol(lineForUpdate(nameMd, versionMd, oldVersionMd))
          );
        }
        if (semver.gt(oldVersion, version)) {
          return (
            result +
            wrapWithEol(lineForRollback(nameMd, versionMd, oldVersionMd))
          );
        }
      }
      return result;
    });
  }, Promise.resolve(wrapWithEol('### Changed')));
}

function diffPackages(
  oldPkg /* : Object */,
  pkg /* : Object */
) /* : Object */ {
  return depDiff()
    .left(oldPkg)
    .right(pkg)
    .toObject();
}

module.exports = {
  deltaToMarkdown,
  diffPackages,
  versionToMarkdown,
};
