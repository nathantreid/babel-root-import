import BabelRootImportHelper from './helper';
import Path from 'path';
import slash from 'slash';

export default function () {
  class BabelRootImport {
    constructor() {
      return {
        'visitor': {
          ImportDeclaration(path, state) {
            const defaultPath = path.node.source.value;

            let rootPathSuffix = '';
            let rootPathPrefix = '';

            if (state && state.opts) {
              if (state.opts.rootPathSuffix && typeof state.opts.rootPathSuffix === 'string') {
                rootPathSuffix = `/${state.opts.rootPathSuffix.replace(/^(\/)|(\/)$/g, '')}`;
              }

              if (state.opts.rootPathPrefix && typeof state.opts.rootPathPrefix === 'string') {
                rootPathPrefix = state.opts.rootPathPrefix;
              } else {
                rootPathPrefix = '~';
              }
            }

            if (BabelRootImportHelper().hasRootPathPrefixInString(defaultPath, rootPathPrefix)) {
              const sourceDirectory = Path.dirname(state.file.opts.filename);
              const importPath = BabelRootImportHelper().transformRelativeToRootPath(defaultPath, rootPathSuffix, rootPathPrefix);
              let relativePath = slash(Path.relative(sourceDirectory, importPath));
              if (relativePath[0] !== '.')
                relativePath = './' + relativePath;

              path.node.source.value = relativePath;
            }
          }
        }
      };
    }
  }

  return new BabelRootImport();
}
