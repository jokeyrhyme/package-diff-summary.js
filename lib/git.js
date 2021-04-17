/* @flow */
'use strict';

const execa = require('execa');

function gitShow(
  revision /* : string */,
  filePath /* : string */,
  cwd /* : string */
) /* : Promise<string> */ {
  return execa('git', ['show', `${revision}:${filePath}`], {
    cwd,
  }).then(({ stdout }) => stdout);
}

module.exports = {
  gitShow,
};
