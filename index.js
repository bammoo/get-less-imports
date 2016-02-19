'use strict';

var fs = require('fs');
var path = require('path');

var RE_IMPORT = /@import(?:\s+\((.*)\))?\s+['"](.*)['"]/;
var RE_IMPORT_G = /@import(?:\s+\((.*)\))?\s+['"](.*)['"]/g;
var RE_COMMENT = /(?:\/\*(?:[\s\S]*?)\*\/)|(\/\/(?:.*)$)/gm;

/**
 * Recursivley finds all @import paths of a LESS file, using a nice RegEx
 * @param {string} filePath - The path of the LESS file.
 * @param {Object} result
 * @returns {Object}
 */
function findImports(filePath, result) {
  var importPaths = getImportPaths(filePath);
  var importPathsAbs = resolveImportPaths(filePath, importPaths);
  if( importPathsAbs.length )
    result.full[filePath] = importPathsAbs;
  importPathsAbs.forEach(function(path){
    if (result.simple.indexOf(path) === -1) {
      result.simple.push(path);
      findImports(path, result);
    }
  });
  return result;
}

function parseImpt(contents) {
  contents = contents.replace(RE_COMMENT, '');
  var match = contents.match(RE_IMPORT_G) || []
  return match.map(function (dep) {
    var m = dep.match(RE_IMPORT);
    return m[2]
  })
  .filter(function (v) {
    return !!v
  });
}

/**
 * Finds all the @import paths in a LESS file.
 * @param {string} filePath - The path of the LESS file.
 */
function getImportPaths(filePath){
  var importPaths = [];
  try{
    var contents = fs.readFileSync(filePath).toString('utf8');
    importPaths = parseImpt(contents);
  }
  catch(exception){}
  return importPaths;
}
/**
 * Resolves @import paths to absolute file paths.
 * @param {string} filePath - The path of the LESS file.
 * @param {Array.<string>} importPaths - The array of @import paths.
 * @returns {Array.<string>}
 */
function resolveImportPaths(filePath, importPaths){
  var dir = path.dirname(filePath);
  return importPaths.map(function(relativePath){
    if(!path.extname(relativePath)){
      relativePath += '.less';
    }
    return path.resolve(dir, relativePath);
  });
}

module.exports = function (filePath){
  var result = {
    simple: [],
    full: {}
  }
  return findImports(filePath, result);
};