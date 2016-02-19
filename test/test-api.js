'use strict';

var findImports = require('../index');

var filePaths = findImports(__dirname + '/fixtures/less1.less');
console.log(filePaths);