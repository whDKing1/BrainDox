export const DESCRIPTION_ITEM_FLAG = 'DESCRIPTION_ITEM_FLAG';
export function isDescriptionsItem(vNode) {
  if (typeof vNode === 'object' && vNode && !Array.isArray(vNode)) {
    return vNode.type && vNode.type[DESCRIPTION_ITEM_FLAG];
  }
  return false;
}