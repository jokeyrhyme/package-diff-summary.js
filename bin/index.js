#!/usr/bin/env node

/* @flow */
/* eslint-disable no-console */

'use strict'

const os = require('os')

const meow = require('meow')

const cli = meow(`
  Usage
    $ package-diff-summary <revision>

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
  console.error(os.EOL + 'Error: no revision specified')
  cli.showHelp(1) // exits with process.exitCode = 1
}

const updateNotifier = require('update-notifier')
updateNotifier({ pkg: cli.pkg }).notify()

const { updateNodejsNotifier } = require('update-nodejs-notifier')
updateNodejsNotifier()

const main = require('../index.js').main

main(cli.input, cli.pkg, cli.flags)
