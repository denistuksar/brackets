/**
 * Modules
 */

var reduce = require('@f/reduce-array')
var has = require('@f/has')

/**
 * Expose brackets
 */

module.exports = brackets

/**
 * Brackets
 */

function brackets (obj, path, value) {
  return reduce(function (acc, key, idx, parts) {
    if (idx === parts.length - 1) {
      if (key === '') acc.push(value)
      else acc[key] = value
      return obj
    } else if (key === '') {
      var end = acc[acc.length - 1]

      if (!end || hasPath(end, parts, idx + 1)) {
        end = {}
        acc.push(end)
      }

      return end
    } else {
      return has(key, acc)
        ? acc[key]
        : (acc[key] = isArrayKey(parts[idx + 1]) ? [] : {})
    }
  }, obj, parse(path))
}

/**
 * Helpers
 */

function hasPath (obj, keys, n) {
  var p = obj

  for (var i = n; i < keys.length; i++) {
    var key = keys[i]
    if (!has(key, p)) return false
    p = p[key]
  }

  return true
}

function isArrayKey (key) {
  return key === '' || typeof key === 'number'
}

function parse (path) {
  var parts = path.split('[')

  // Cleaner to implement with map of course, but this
  // avoids allocating the extra array
  for (var i = 0; i < parts.length; i++) {
    var s = parts[i]
    parts[i] = s[s.length - 1] === ']' ? s.slice(0, -1) : s
    parts[i] = /^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i]
  }

  return parts
}
