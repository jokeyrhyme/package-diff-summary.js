# Change Log


## Unreleased


### Fixed

-   uniform flow of version range to strict version (#11)

-   GitHub Release URL for old version actually points to old version


## 1.2.0 - 2017-01-13


### Added

-   support [SemVer pre-release versions](http://semver.org/#spec-item-9) e.g. 1.0.0-alpha.1

-   version hyperlinks to matching GitHub Release if any (#5)


### Changed

-   depend upon [github](https://www.npmjs.com/package/github) ^[8.0.0](https://github.com/mikedeboer/node-github/blob/master/CHANGELOG.md)


## 1.1.0 - 2017-01-13


### Added

-   versions hyperlinks to CHANGELOG.md if found (#4)


### Changed

-   depend upon [github-url-from-git](https://www.npmjs.com/package/github-url-from-git) ^[1.5.0](https://github.com/visionmedia/node-github-url-from-git/blob/master/CHANGELOG.md)

-   depend upon [package-engines-notifier](https://www.npmjs.com/package/package-engines-notifier) ^[1.1.0](https://github.com/jokeyrhyme/package-engines-notifier.js/blob/master/CHANGELOG.md)


## 1.0.1 - 2017-01-10


### Changed

-   depend upon [read-pkg-up](https://www.npmjs.com/package/read-pkg-up) ^2.0.0


### Fixed

-   use package.json in current working directory for comparison (oops!) (#6)
