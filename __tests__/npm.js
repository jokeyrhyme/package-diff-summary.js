/* @flow */
'use strict';

const npm = require('../lib/npm.js');

test('nameToMarkdown("does-not-exist")', () => {
  const name = 'does-not-exist-' + Math.random() * 1e6;
  return npm.nameToMarkdown(name).then((result) => {
    expect(result).toBe(name);
  });
});

test('nameToMarkdown("execa")', () => {
  const expected = '[execa](https://www.npmjs.com/package/execa)';
  return npm
    .nameToMarkdown('execa')
    .then((result) => expect(result).toBe(expected));
});

test('repositoryUrlFor("does-not-exist")', () => {
  const name = 'does-not-exist-' + Math.random() * 1e6;
  return npm.repositoryUrlFor(name, process.cwd()).then((result) => {
    expect(result).toBe('');
  });
});

test('repositoryUrlFor("execa")', () => {
  const expected = 'git+https://github.com/sindresorhus/execa.git';
  return npm
    .repositoryUrlFor('execa', process.cwd())
    .then((result) => expect(result).toBe(expected));
});
