# package-diff-summary.js [![npm](https://img.shields.io/npm/v/package-diff-summary.svg?maxAge=2592000)](https://www.npmjs.com/package/package-diff-summary) [![Travis CI Status](https://travis-ci.org/jokeyrhyme/package-diff-summary.js.svg?branch=master)](https://travis-ci.org/jokeyrhyme/package-diff-summary.js)

compare package.json files to create CHANGELOG.md entries


## Installation

```
npm install --global package-diff-summary
```

OR

```
yarn global add package-diff-summary
```


## Usage

```
Usage
  $ package-diff-summary <revision>

Options
  -h, --help
  -v, --version
```

Output is intended to be copy-paste compatible with "Keep a CHANGELOG"


## Example

For this very project, these commands:

```sh
git checkout 1.1.0
package-diff-summary 1.0.0
```

outputs this Markdown / CommonMark text:

```md
### Changed

-   depend upon [github-url-from-git](https://www.npmjs.com/package/github-url-from-git) ^[1.5.0](https://github.com/visionmedia/node-github-url-from-git/blob/master/CHANGELOG.md)

-   depend upon [package-engines-notifier](https://www.npmjs.com/package/package-engines-notifier) ^[1.1.0](https://github.com/jokeyrhyme/package-engines-notifier.js/releases/tag/1.1.0)

-   depend upon [read-pkg-up](https://www.npmjs.com/package/read-pkg-up) ^2.0.0
```

which looks like:

> ### Changed
>
> -   depend upon [github-url-from-git](https://www.npmjs.com/package/github-url-from-git) ^[1.5.0](https://github.com/visionmedia/node-github-url-from-git/blob/master/CHANGELOG.md)
>
> -   depend upon [package-engines-notifier](https://www.npmjs.com/package/package-engines-notifier) ^[1.1.0](https://github.com/jokeyrhyme/package-engines-notifier.js/releases/tag/1.1.0)
>
> -   depend upon [read-pkg-up](https://www.npmjs.com/package/read-pkg-up) ^2.0.0


## Configuration


### GITHUB\_OAUTH\_TOKEN

Generate a new [GitHub Personal Access Token](https://github.com/settings/tokens) without any special permissions,
and set this as the value for the GITHUB\_OAUTH\_TOKEN environment variable.

This will reduce the likelihood of rate-limiting by GitHub's API,
which will in turn increase the accuracy of the hyperlinks discovered.


## See Also

-   [dependency-diff](https://www.npmjs.com/package/dependency-diff)

-   [execa](https://github.com/sindresorhus/execa)

-   [Keep a CHANGELOG](http://keepachangelog.com/)

-   [github](https://github.com/mikedeboer/node-github)

-   [github-url-from-git](https://github.com/tj/node-github-url-from-git)

-   [got](https://github.com/sindresorhus/got)

-   [read-pkg-up](https://github.com/sindresorhus/read-pkg-up)

-   [semver](https://github.com/npm/node-semver)
