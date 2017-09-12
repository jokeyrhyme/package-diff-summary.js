/* @flow */
'use strict';

const execa = require('execa');

const http = require('./http.js');

function changelogUrlFor(name /* : string */) /* : Promise<string> */ {
  const github = require('./github.js');
  return github
    .projectUrlFor(name)
    .then(projectUrl => (projectUrl ? github.changelogUrlAt(projectUrl) : ''));
}

function nameToMarkdown(name /* : string */) /* : Promise<string> */ {
  const pkgUrl = 'https://www.npmjs.com/package/' + name;
  return http
    .isUrlHealthy(pkgUrl)
    .then(yes => (yes ? `[${name}](${pkgUrl})` : name));
}

function releaseUrlFor(
  name /* : string */,
  version /* : string */
) /* : Promise<string> */ {
  const github = require('./github.js');
  return github
    .projectUrlFor(name)
    .then(
      projectUrl =>
        projectUrl ? github.releaseUrlFor(projectUrl, version) : ''
    );
}

function repositoryUrlFor(name /* : string */) /* : Promise<string> */ {
  return execa('npm', ['view', name, 'repository.url'])
    .then(({ stdout }) => stdout)
    .catch(() => '');
}

module.exports = {
  changelogUrlFor,
  nameToMarkdown,
  releaseUrlFor,
  repositoryUrlFor,
};
