/* @flow */
'use strict';

const git = require('../lib/git.js');

test('gitShow()', () => {
  return git.gitShow('HEAD~1', 'README.md', process.cwd()).then((contents) => {
    expect(contents).toContain('# package-diff-summary.js');
  });
});
