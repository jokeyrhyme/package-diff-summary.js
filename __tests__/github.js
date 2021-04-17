/* @flow */
'use strict';

const github = require('../lib/github.js');

test('changelogUrlAt("https://github.com/sindresorhus/got")', () => {
  const projectUrl = 'https://github.com/sindresorhus/got';
  return github
    .changelogUrlAt(projectUrl)
    .then((result) => expect(result).toBe(''));
});

test('changelogUrlAt("https://github.com/tj/node-github-url-from-git")', () => {
  const projectUrl = 'https://github.com/tj/node-github-url-from-git';
  const expected = `${projectUrl}/blob/master/CHANGELOG.md`;
  return github
    .changelogUrlAt(projectUrl)
    .then((result) => expect(result).toBe(expected));
});

test('projectUrlFor("does-not-exist")', () => {
  const name = 'does-not-exist-' + Math.random() * 1e6;
  return github
    .projectUrlFor(name)
    .then((result) => expect(result).not.toBeDefined());
});

test('projectUrlFor("execa")', () => {
  const expected = 'https://github.com/sindresorhus/execa';
  return github
    .projectUrlFor('execa')
    .then((result) => expect(result).toBe(expected));
});

test('releaseUrlFor(thisProject, "1.0.0")', () => {
  const projectUrl = 'https://github.com/jokeyrhyme/package-diff-summary.js';
  return github
    .releaseUrlFor(projectUrl, '1.0.0')
    .then((result) => expect(result).not.toBeDefined());
});

test('releaseUrlFor(thisProject, "1.1.0")', () => {
  const projectUrl = 'https://github.com/jokeyrhyme/package-diff-summary.js';
  const expected = `${projectUrl}/releases/tag/1.1.0`;
  return github
    .releaseUrlFor(projectUrl, '1.1.0')
    .then((result) => expect(result).toBe(expected));
});
