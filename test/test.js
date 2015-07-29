'use strict';

/**
 * Dependencies
 */

const scan = require('../');

require('chai').should();


/**
 * Tests
 */

describe ('scan-dependencies', function () {

  it ('scan recursively and skip core modules', function () {
    let deps = scan(__dirname + '/fixtures/module/index.js');

    deps.should.deep.equal(['koa', 'express', 'pushover']);
  });

});
