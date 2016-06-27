'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var BabelRootImport = function BabelRootImport() {
    _classCallCheck(this, BabelRootImport);

    return {
      'visitor': {
        ImportDeclaration: function ImportDeclaration(path, state) {
          var defaultPath = path.node.source.value;

          var rootPathSuffix = '';
          var rootPathPrefix = '';

          if (state && state.opts) {
            if (state.opts.rootPathSuffix && typeof state.opts.rootPathSuffix === 'string') {
              rootPathSuffix = '/' + state.opts.rootPathSuffix.replace(/^(\/)|(\/)$/g, '');
            }

            if (state.opts.rootPathPrefix && typeof state.opts.rootPathPrefix === 'string') {
              rootPathPrefix = state.opts.rootPathPrefix;
            } else {
              rootPathPrefix = '~';
            }
          }

          if ((0, _helper2.default)().hasRootPathPrefixInString(defaultPath, rootPathPrefix)) {
            var sourceDirectory = _path2.default.dirname(state.file.opts.filename);
            var importPath = (0, _helper2.default)().transformRelativeToRootPath(defaultPath, rootPathSuffix, rootPathPrefix);
            var relativePath = (0, _slash2.default)(_path2.default.relative(sourceDirectory, importPath));
            if (relativePath[0] !== '.') relativePath = './' + relativePath;

            path.node.source.value = relativePath;
          }
        }
      }
    };
  };

  return new BabelRootImport();
};

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _slash = require('slash');

var _slash2 = _interopRequireDefault(_slash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }