/**
 * Imports
 */

var brackets = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should work', function (t) {
  t.deepEqual(brackets({}, 'test', 1), {test: 1})
  t.deepEqual(brackets({}, 'test[asdf]', 1), {test: {asdf: 1}})
  t.deepEqual(brackets({}, 'test[][asdf]', 1), {test: [{asdf: 1}]})
  t.deepEqual(brackets({}, 'test[]', 2), {test: [2]})
  t.deepEqual(brackets({test: [{t: 1}]}, 'test[][t]', 2), {test: [{t: 1}, {t: 2}]})
  t.deepEqual(brackets({test: [{t: 1}]}, 'test[][q]', 2), {test: [{t: 1, q: 2}]})

  t.end()
})
