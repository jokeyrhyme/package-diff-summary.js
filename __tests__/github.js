/* @flow */
'use strict'

const github = require('../lib/github.js')

test('changelogUrlAt("https://github.com/sindresorhus/got")', () => {
  const projectUrl = 'https://github.com/sindresorhus/got'
  return github.changelogUrlAt(projectUrl)
    .then((result) => expect(result).toBe(''))
})

test('changelogUrlAt("https://github.com/tj/node-github-url-from-git")', () => {
  const projectUrl = 'https://github.com/tj/node-github-url-from-git'
  return github.changelogUrlAt(projectUrl)
    .then((result) => expect(result).toMatchSnapshot())
})

test('projectUrlFor("does-not-exist")', () => {
  const name = 'does-not-exist-' + (Math.random() * 1e6)
  return github.projectUrlFor(name)
    .then((result) => expect(result).not.toBeDefined())
})

test('projectUrlFor("execa")', () => {
  return github.projectUrlFor('execa')
    .then((result) => expect(result).toMatchSnapshot())
})
