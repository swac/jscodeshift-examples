// Transform Lodash named imports to direct imports of specific functions.
//
// Example:
//
// import { keyBy, groupBy } from 'lodash';
//
// becomes:
//
// import keyBy from 'lodash/keyBy';
// import groupBy from 'lodash/groupBy';

export default function transform(fileInfo, api) {
  const { jscodeshift } = api;
  return (
    jscodeshift(fileInfo.source)
      // Find all imports where the import is 'lodash'
      .find(jscodeshift.ImportDeclaration, {
        source: {
          value: "lodash"
        }
      })
      .forEach(path => {
        return jscodeshift(path).replaceWith(
          // Replace each imported function separately
          path.value.specifiers.map(specifier => {
            // Skip default imports
            if (specifier.type !== "ImportSpecifier") {
              return specifier;
            }

            // Return an import declaration that does a default import of the lodash
            // function we're importing
            return jscodeshift.importDeclaration(
              [
                jscodeshift.importDefaultSpecifier(
                  jscodeshift.identifier(specifier.local.name)
                )
              ],
              jscodeshift.literal(`lodash/${specifier.imported.name}`)
            );
          })
        );
      })
      .toSource()
  );
}
