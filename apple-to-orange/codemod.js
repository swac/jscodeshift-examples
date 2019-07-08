export default function(fileInfo, api) {
  return api
    .jscodeshift(fileInfo.source)
    .findVariableDeclarators("apple")
    .renameTo("orange")
    .toSource();
}
