'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function () {
  var BabelRootImportHelper = function () {
    function BabelRootImportHelper() {
      _classCallCheck(this, BabelRootImportHelper);

      this.root = (0, _slash2.default)(global.rootPath || process.cwd());
    }

    _createClass(BabelRootImportHelper, [{
      key: 'transformRelativeToRootPath',
      value: function transformRelativeToRootPath(importPath, rootPathSuffix, rootPathPrefix) {
        var withoutRootPathPrefix = '';
        if (this.hasRootPathPrefixInString(importPath, rootPathPrefix)) {
          if (importPath.substring(0, 1) === '/') {
            withoutRootPathPrefix = importPath.substring(1, importPath.length);
          } else {
            withoutRootPathPrefix = importPath.substring(2, importPath.length);
          }
          return (0, _slash2.default)('' + this.root + (rootPathSuffix ? rootPathSuffix : '') + '/' + withoutRootPathPrefix);
        }

        if (typeof importPath === 'string') {
          return importPath;
        }

        throw new Error('ERROR: No path passed');
      }
    }, {
      key: 'hasRootPathPrefixInString',
      value: function hasRootPathPrefixInString(importPath) {
        var rootPathPrefix = arguments.length <= 1 || arguments[1] === undefined ? '~' : arguments[1];

        var containsRootPathPrefix = false;

        if (typeof importPath === 'string') {
          if (importPath.substring(0, 1) === rootPathPrefix) {
            containsRootPathPrefix = true;
          }

          var firstTwoCharactersOfString = importPath.substring(0, 2);
          if (firstTwoCharactersOfString === rootPathPrefix + '/') {
            containsRootPathPrefix = true;
          }
        }

        return containsRootPathPrefix;
      }
    }]);

    return BabelRootImportHelper;
  }();

  return new BabelRootImportHelper();
};

var _slash = require('slash');

var _slash2 = _interopRequireDefault(_slash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }