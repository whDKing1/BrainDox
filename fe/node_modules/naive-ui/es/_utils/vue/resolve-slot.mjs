import { Comment, Fragment, isVNode } from 'vue';
export function ensureValidVNode(vnodes) {
  return vnodes.some(child => {
    if (!isVNode(child)) {
      return true;
    }
    if (child.type === Comment) {
      return false;
    }
    if (child.type === Fragment && !ensureValidVNode(child.children)) {
      return false;
    }
    return true;
  }) ? vnodes : null;
}
/**
 * We shouldn't use the following functions with slot flags `_: 1, 2, 3`
 */
export function resolveSlot(slot, fallback) {
  return slot && ensureValidVNode(slot()) || fallback();
}
export function resolveSlotWithTypedProps(slot, props, fallback) {
  return slot && ensureValidVNode(slot(props)) || fallback(props);
}
/**
 * Resolve slot with wrapper if content exists, no fallback
 */
export function resolveWrappedSlot(slot, wrapper) {
  const children = slot && ensureValidVNode(slot());
  return wrapper(children || null);
}
/*
 * Resolve slot with wrapper if content exists, no fallback
 */
export function resolveWrappedSlotWithProps(slot, props, wrapper) {
  const children = slot && ensureValidVNode(slot(props));
  return wrapper(children || null);
}
export function isSlotEmpty(slot) {
  return !(slot && ensureValidVNode(slot()));
}