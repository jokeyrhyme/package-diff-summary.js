#!/usr/bin/env node

/* eslint-disable no-console */

'use strict'

const os = require('os')

const meow = require('meow')

const cli = meow(`
  Usage
    $ package-diff-summary <commit>

  Options
    -h, --help
    -v, --version
`, {
  alias: {
    h: 'help',
    v: 'version'
  }
})

if (!cli.input[0]) {
  console.error(os.EOL + 'Error: no commit specified')
  cli.showHelp(1) // exits with process.exitCode = 1
}
