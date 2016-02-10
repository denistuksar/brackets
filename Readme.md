
# brackets

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Bracket notation for form input names

## Installation

    $ npm install @f/brackets

## Usage

Mostly this is useful for serializing form data to JSON. There is a [W3C spec](https://www.w3.org/TR/html-json-forms/) to which this kind of sort of complies, but the spec seems to have been abandoned for reasons unknown. The square notation is essentially a replacement for '.' in dotted paths. You specify `name[first]`, `name[last]`, and it will set the corresponding properties:

```js
brackets({}, 'name[first]', 'micro-js') // -> {name: {first: 'micro-js'}}
```

But it does a little more than dot notation, because it also lets you deal with lists, by using empty square brackets:

```js
brackets({}, 'colors[]', 'red')                   // -> {colors: ['red']}
brackets({colors: ['red']}, 'colors[]', 'green'), // -> {colors: ['red', 'green']}
```

If you'd like to set nested properties in lists, you can do that too, by just adding more bracketed properties after the `[]`:

```js
var tmp = brackets({}, 'groups[][name]', 'friends') // -> {groups: [{name: 'friends'}]}
brackets(tmp, 'groups[][id]', 1)                    // -> {groups: [{name: 'friends', id: 1}]}
```

Here's where things get a little messy though. You may be wondering, how does it know I didn't want to append to that list on the second set? The answer is that it checks to see if the deeper property you're trying to set exists already, and only then does it append a new item:

```js
brackets({}, 'groups[][name]', 'friends')                         // -> {groups: [{name: 'friends'}]}
brackets({groups: [{name: 'friends'}]}, 'groups[][id]', 1)        // -> {groups: [{name: 'friends', id: 1}]}
brackets({groups: [{name: 'friends'}]}, 'groups[][name]', 'work') // -> {groups: [{name: 'friends'}, {name: 'work'}]}
```

## Example

```js
var reduce = require('@f/reduce')
var brackets = require('@f/brackets')
var controls = require('@f/form-controls')
var serializable = require('@f/is-serializable')

function serialize (form) {
  return reduce(function (acc, ctrl) {
    return serializable(ctrl)
      ? brackets(acc, ctrl.name, ctrl.value)
      : acc
  }, {}, controls(form))
}
```

## API

### brackets(obj, path, value)

- `obj` - The object you want to set `path` to `value` within
- `path` - The path using square bracket notation you want to set `value` at
- `value` - The value you want to set at `path`

**Returns:** `obj`. This function is mutative, you will not receive a fresh copy of `obj`.

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/brackets.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/brackets
[git-image]: https://img.shields.io/github/tag/micro-js/brackets.svg
[git-url]: https://github.com/micro-js/brackets
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/brackets.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/brackets
