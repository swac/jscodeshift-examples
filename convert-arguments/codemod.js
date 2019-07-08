const argumentNames = ["excludeZero", "excludeNegatives", "sorted"];

export default function(fileInfo, api) {
  const { jscodeshift } = api;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.CallExpression, {
      callee: {
        type: "Identifier",
        name: "getEvenNumbers"
      }
    })
    .replaceWith(path => {
      const { node } = path;
      console.log(node.arguments.length);
      return jscodeshift.callExpression(node.callee, [
        node.arguments[0],
        jscodeshift.objectExpression(
          node.arguments
            .slice(1)
            .map((arg, index) =>
              jscodeshift.property(
                "init",
                jscodeshift.identifier(argumentNames[index]),
                arg
              )
            )
        )
      ]);
    })
    .toSource({ trailingComma: true });
}
