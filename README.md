# Intro
> Get .less files' @imports recursively, fast than [`less.parse`][less-url]

## Install

```sh
$ npm i -S get-less-imports
```


## Usage

```js
var findImports = require('../index');
var paths = findImports(__dirname + '/fixtures/less1.less');
console.log(paths)
/*
{ simple:
   [ '../fixtures/less02.less',
     '../fixtures/less003.less',
     '../fixtures/less0004.less',
     '../fixtures/less0002.less' ],
  full:
   { '../fixtures/less1.less': [ '../fixtures/less02.less' ],
     '../fixtures/less02.less': [ '../fixtures/less003.less' ],
     '../fixtures/less003.less':
      [ '../fixtures/less0004.less',
        '../fixtures/less0002.less' ] 
    } 
}
*/
```

See [gulp-watch-less2][url-github-gulp-watch-less2] for real world usage.

## License

MIT &copy; [John Xiao][profile-url]  


[profile-url]: https://github.com/bammoo
[less-url]: https://github.com/less/less.js
[url-github-gulp-watch-less2]: https://github.com/bammoo/gulp-watch-less2