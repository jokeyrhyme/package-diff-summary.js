/* @flow */
'use strict'

const path = require('path')

const execa = require('execa')

const binPath = path.join(__dirname, '..', 'bin', 'index.js')

test('node bin/index.js --help', () => {
  return execa('node', [ binPath, '--help' ])
})

test('node bin/index.js --version', () => {
  return execa('node', [ binPath, '--version' ])
})

test('node bin/index.js', () => {
  return execa('node', [ binPath ])
    .then(() => {
      expect(true).toBeNull() // unexpected resolve
    })
    .catch((err) => {
      expect(err).toBeDefined()
      expect(err.code).toBe(1)
    })
})

test('node bin/index.js HEAD~1', () => {
  return execa('node', [ binPath, 'HEAD~1' ])
})
