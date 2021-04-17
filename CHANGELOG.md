# Change Log

## Unreleased

### Changed

- MAJOR: require Node.js 12.x or newer

- update [execa](https://www.npmjs.com/package/execa) to [5.0.0](https://github.com/sindresorhus/execa/releases/tag/v5.0.0) (from 0.8.0)

- no longer depend upon [github](https://www.npmjs.com/package/github)

- update [got](https://www.npmjs.com/package/got) to [11.8.2](https://github.com/sindresorhus/got/releases/tag/v11.8.2) (from [7.0.0](https://github.com/sindresorhus/got/releases/tag/v7.0.0))

- update [meow](https://www.npmjs.com/package/meow) to [9.0.0](https://github.com/sindresorhus/meow/releases/tag/v9.0.0) (from 3.7.0)

- update [read-pkg-up](https://www.npmjs.com/package/read-pkg-up) to [7.0.1](https://github.com/sindresorhus/read-pkg-up/releases/tag/v7.0.1) (from 2.0.0)

- update [semver](https://www.npmjs.com/package/semver) to [7.3.5](https://github.com/npm/node-semver/blob/master/CHANGELOG.md) (from [5.3.0](https://github.com/npm/node-semver/blob/master/CHANGELOG.md))

- update [update-nodejs-notifier](https://www.npmjs.com/package/update-nodejs-notifier) to [1.1.1](https://github.com/jokeyrhyme/update-nodejs-notifier.js/releases/tag/1.1.1) (from [1.1.0](https://github.com/jokeyrhyme/update-nodejs-notifier.js/releases/tag/1.1.0))

- update [update-notifier](https://www.npmjs.com/package/update-notifier) to [5.1.0](https://github.com/yeoman/update-notifier/releases/tag/v5.1.0) (from 2.1.0)

- depend upon [@octokit/rest](https://www.npmjs.com/package/@octokit/rest) [18.5.2](https://github.com/octokit/rest.js/releases/tag/v18.5.2)

## 2.0.0 - 2017-09-12

### Changed

- MAJOR: require Node.js 8.x or newer

- CHORE: update [execa](https://www.npmjs.com/package/execa) to 0.8.0 (from 0.6.0)

- CHORE: update [github](https://www.npmjs.com/package/github) to [11.0.0](https://github.com/mikedeboer/node-github/blob/master/CHANGELOG.md) (from [9.0.0](https://github.com/mikedeboer/node-github/blob/master/CHANGELOG.md))

- CHORE: update [got](https://www.npmjs.com/package/got) to 7.0.0 (from 6.7.1)

## 1.3.0 - 2017-02-22

### Added

- authenticate with GitHub using GITHUB_OAUTH_TOKEN environment variable (if any)

### Changed

- update [github](https://www.npmjs.com/package/github) to [9.0.0](https://github.com/mikedeboer/node-github/blob/master/CHANGELOG.md) (from [8.0.0](https://github.com/mikedeboer/node-github/blob/master/CHANGELOG.md))

- update [update-notifier](https://www.npmjs.com/package/update-notifier) to 2.1.0 (from [1.0.3](https://github.com/yeoman/update-notifier/releases/tag/v1.0.3))

## 1.2.1 - 2017-01-16

### Fixed

- uniform flow of version range to strict version (#11)

- GitHub Release URL for old version actually points to old version

## 1.2.0 - 2017-01-13

### Added

- support [SemVer pre-release versions](http://semver.org/#spec-item-9) e.g. 1.0.0-alpha.1

- version hyperlinks to matching GitHub Release if any (#5)

### Changed

- depend upon [github](https://www.npmjs.com/package/github) ^[8.0.0](https://github.com/mikedeboer/node-github/blob/master/CHANGELOG.md)

## 1.1.0 - 2017-01-13

### Added

- versions hyperlinks to CHANGELOG.md if found (#4)

### Changed

- depend upon [github-url-from-git](https://www.npmjs.com/package/github-url-from-git) ^[1.5.0](https://github.com/visionmedia/node-github-url-from-git/blob/master/CHANGELOG.md)

- depend upon [package-engines-notifier](https://www.npmjs.com/package/package-engines-notifier) ^[1.1.0](https://github.com/jokeyrhyme/package-engines-notifier.js/blob/master/CHANGELOG.md)

## 1.0.1 - 2017-01-10

### Changed

- depend upon [read-pkg-up](https://www.npmjs.com/package/read-pkg-up) ^2.0.0

### Fixed

- use package.json in current working directory for comparison (oops!) (#6)
