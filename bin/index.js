#!/usr/bin/env node

/* @flow */
/* eslint-disable no-console */

'use strict';

const os = require('os');

const meow = require('meow');

const cli = meow(
  `
  Usage
    $ package-diff-summary <revision>

  Options
    -h, --help
    -v, --version
`,
  {
    alias: {
      h: 'help',
      v: 'version',
    },
  }
);

const previousVersion = cli.input[0];
if (!previousVersion) {
  console.error(os.EOL + 'Error: no revision specified');
  cli.showHelp(1); // exits with process.exitCode = 1
}

const updateNotifier = require('update-notifier');
updateNotifier({ pkg: cli.pkg }).notify();

const { updateNodejsNotifier } = require('update-nodejs-notifier');
updateNodejsNotifier();

const { enginesNotify } = require('package-engines-notifier');
if (!enginesNotify({ pkg: cli.pkg })) {
  const main = require('../index.js').main;

  if (!process.env.GITHUB_OAUTH_TOKEN) {
    console.log(`
    TIP: set the GITHUB_OAUTH_TOKEN environment variable to improve accuracy
`);
  }

  main({ previousVersion, cwd: process.cwd() }).then((text) => {
    console.log(text);
  });
}
