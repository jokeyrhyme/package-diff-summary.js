/* @flow */
'use strict';

const { Octokit } = require('@octokit/rest');
const githubUrlFrom = require('github-url-from-git');

const http = require('./http.js');

const octokit = new Octokit({
  auth: process.env.GITHUB_OAUTH_TOKEN,
});

function changelogUrlAt(projectUrl /* : string */) /* : Promise<string> */ {
  const changelogUrl = projectUrl + '/blob/master/CHANGELOG.md';
  return http
    .isUrlHealthy(changelogUrl)
    .then((yes) => (yes ? changelogUrl : ''));
}

function projectUrlFor(
  name /* : string */,
  cwd /* : string */
) /* : Promise<string> */ {
  const npm = require('./npm.js');
  return npm.repositoryUrlFor(name, cwd).then(githubUrlFrom);
}

function releaseUrlFor(
  projectUrl /* : string */,
  version /* : string */ // 1.2.3, 1.2.3-alpha.1, ... no leading "v"
) /* : Promise<string> */ {
  const [owner, repo] = projectUrl.split('/').slice(-2);
  const variations = [version, 'v' + version];
  // iterate serially to be friendlier to the GitHub API
  return variations
    .reduce((promise, variation) => {
      return promise.then((results) => {
        return (
          octokit.rest.repos
            .getReleaseByTag({ owner, repo, tag: variation })
            .then((release) => {
              // add this result to the array we're accumulating
              return results.concat([release]);
            })
            // no result, just return the accumulated array so far
            .catch(() => results)
        );
      });
    }, Promise.resolve([])) // start with empty array
    .then((results) => results.filter((result) => !!result)[0])
    .then((release) => release && release.data && release.data.html_url);
}

module.exports = {
  changelogUrlAt,
  projectUrlFor,
  releaseUrlFor,
};
