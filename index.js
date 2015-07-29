'use strict';

/**
 * Dependencies
 */

const isCoreModule = require('is-core-module');
const detective = require('detective');
const dirname = require('path').dirname;
const uniq = require('array-uniq');
const join = require('path').join;
const fs = require('fs');


/**
 * Expose scan-dependencies
 */

module.exports = scan;


/**
 * Scan files for dependencies
 */

function scan (path) {
  let deps = detect(path);

  let isFile = /\/|\.js$/;
  let isJSON = /\.json$/;

  // include only modules
  let modules = deps.filter(function (dependency) {
    return !isFile.test(dependency);
  });

  // include only relative require()s
  let files = deps.filter(function (dependency) {
    return isFile.test(dependency) && !isJSON.test(dependency);
  });

  // base path of the current file
  let basePath = dirname(path);

  files.forEach(function (file) {
    let nextPath = join(basePath, file + '.js');

    let nextModules = scan(nextPath);

    nextModules.forEach(function (name) {
      modules.push(name);
    });
  });

  // skip core modules
  modules = modules.filter(function (name) {
    return !isCoreModule(name);
  });

  // dedup
  modules = uniq(modules);

  return modules;
}



/**
 * Detect dependencies
 */

function detect (path) {
  let source = fs.readFileSync(path, 'utf-8');
  let deps = detective(source);

  return deps;
}

