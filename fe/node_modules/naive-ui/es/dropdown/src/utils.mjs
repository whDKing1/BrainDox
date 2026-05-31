export function isSubmenuNode(rawNode, childrenField) {
  return rawNode.type === 'submenu' || rawNode.type === undefined && rawNode[childrenField] !== undefined;
}
export function isGroupNode(rawNode) {
  return rawNode.type === 'group';
}
export function isDividerNode(rawNode) {
  return rawNode.type === 'divider';
}
export function isRenderNode(rawNode) {
  return rawNode.type === 'render';
}