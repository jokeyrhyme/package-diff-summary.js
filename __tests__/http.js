/* @flow */
'use strict';

const http = require('../lib/http.js');

test('isUrlHealthy("https://www.npmjs.com/package/does-not-exist")', () => {
  const name = 'does-not-exist-' + Math.random() * 1e6;
  const pkgUrl = 'https://www.npmjs.com/package/' + name;
  return http.isUrlHealthy(pkgUrl).then(result => expect(result).toBe(false));
});

test('isUrlHealthy("http://google.com")', () => {
  return http
    .isUrlHealthy('http://google.com')
    .then(result => expect(result).toBe(true));
});
