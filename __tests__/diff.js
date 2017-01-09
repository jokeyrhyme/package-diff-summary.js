/* @flow */
'use strict'

const diff = require('../lib/diff.js')

test('deltaToMarkdown()', () => {
  const delta = {
    dependencies: [
      { name: 'added', version: '1.2.3', operation: 'new' },
      { name: 'dropped', version: '', operation: 'delete' },
      { name: 'rolledback', version: '1.2.3', operation: 'edit' },
      { name: 'updated', version: '2.3.4', operation: 'edit' },
      { name: 'execa', version: '2.3.4', operation: 'edit' },
    ]
  }
  const oldPkg = {
    dependencies: {
      dropped: '1.2.3',
      rolledback: '2.3.4',
      updated: '1.2.3',
      execa: '1.2.3'
    }
  }
  return diff.deltaToMarkdown(delta, oldPkg)
    .then((result) => expect(result).toMatchSnapshot())
})

test('diffPackages()', () => {
  const oldPkg = {
    dependencies: {
      dropped: '1.2.3',
      rolledback: '2.3.4',
      updated: '1.2.3'
    }
  }
  const pkg = {
    dependencies: {
      added: '1.2.3',
      rolledback: '1.2.3',
      updated: '2.3.4'
    }
  }
  const result = diff.diffPackages(oldPkg, pkg)
  expect(result).toMatchSnapshot()
})
