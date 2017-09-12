/* @flow */
'use strict';

const execa = require('execa');

function gitShow(
  revision /* : string */,
  filePath /* : string */
) /* : Promise<string> */ {
  return execa('git', ['show', `${revision}:${filePath}`]).then(
    ({ stdout }) => stdout
  );
}

module.exports = {
  gitShow,
};
