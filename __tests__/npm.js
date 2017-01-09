/* @flow */
'use strict'

const npm = require('../lib/npm.js')

test('nameToMarkdown("does-not-exist")', () => {
  const name = 'does-not-exist-' + (Math.random() * 1e6)
  return npm.nameToMarkdown(name)
    .then((result) => {
      expect(result).toBe(name)
    })
})

test('nameToMarkdown("execa")', () => {
  return npm.nameToMarkdown('execa')
    .then((result) => expect(result).toMatchSnapshot())
})
