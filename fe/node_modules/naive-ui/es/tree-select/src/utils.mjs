export function treeOption2SelectOption(tmNode, labelField) {
  const {
    rawNode
  } = tmNode;
  return Object.assign(Object.assign({}, rawNode), {
    label: rawNode[labelField],
    value: tmNode.key
  });
}
export function treeOption2SelectOptionWithPath(tmNode, path, separator, labelField) {
  const {
    rawNode
  } = tmNode;
  return Object.assign(Object.assign({}, rawNode), {
    value: tmNode.key,
    label: path.map(v => v.rawNode[labelField]).join(separator)
  });
}