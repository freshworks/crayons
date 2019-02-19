'use strict';

/* eslint global-require: 0 */

var fs = require('fs');
var path = require('path');

var test = require('tape');

test('main', function (t) {
  require('../');
  t.ok(true, 'parses');
  t.end();
});

test('targets', function (t) {
  var targetsPath = path.join(__dirname, '../target');
  var targets = fs.readdirSync(targetsPath);

  targets.forEach(function (target) {
    t.test(target, function (st) {
      require(path.join(targetsPath, target));
      st.ok(true, 'parses');
      st.end();
    });
  });
  t.end();
});
