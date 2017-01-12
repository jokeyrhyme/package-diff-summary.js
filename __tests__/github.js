/* @flow */
'use strict'

const github = require('../lib/github.js')

test('projectUrlFor("does-not-exist")', () => {
  const name = 'does-not-exist-' + (Math.random() * 1e6)
  return github.projectUrlFor(name)
    .then((result) => {
      expect(result).not.toBeDefined()
    })
})

test('projectUrlFor("execa")', () => {
  return github.projectUrlFor('execa')
    .then((result) => {
      expect(result).toMatchSnapshot()
    })
})
