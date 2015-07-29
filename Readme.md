# scan-dependencies [![Circle CI](https://circleci.com/gh/vdemedes/scan-dependencies.svg?style=svg)](https://circleci.com/gh/vdemedes/scan-dependencies)

Search recursively for `require()` calls to build a complete dependency tree.
It skips core modules and reports only 3rd-party ones.


### Installation

```
$ npm install scan-dependencies --save
```


### Usage

```javascript
const scan = require('scan-dependencies');

// specify an entrypoint
// it will walk recursively starting from it
let deps = scan('entrypoint.js');

/*
deps = [
  'koa',
  'express',
  'request'
]
 */
```


### Tests

[![Circle CI](https://circleci.com/gh/vdemedes/scan-dependencies.svg?style=svg)](https://circleci.com/gh/vdemedes/scan-dependencies)

```
$ make test
```


### License

scan-dependencies is released under the MIT license.
