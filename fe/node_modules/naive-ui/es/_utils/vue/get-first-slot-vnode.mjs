import { warn } from "../naive/index.mjs";
import { flatten } from "./flatten.mjs";
export function getFirstSlotVNode(slots, slotName = 'default', props = undefined) {
  const slot = slots[slotName];
  if (!slot) {
    warn('getFirstSlotVNode', `slot[${slotName}] is empty`);
    return null;
  }
  const slotContent = flatten(slot(props));
  // vue will normalize the slot, so slot must be an array
  if (slotContent.length === 1) {
    return slotContent[0];
  } else {
    warn('getFirstSlotVNode', `slot[${slotName}] should have exactly one child`);
    return null;
  }
}
export function getFirstSlotVNodeWithTypedProps(slotName, slot, props) {
  if (!slot) {
    return null;
  }
  const slotContent = flatten(slot(props));
  // vue will normalize the slot, so slot must be an array
  if (slotContent.length === 1) {
    return slotContent[0];
  } else {
    warn('getFirstSlotVNode', `slot[${slotName}] should have exactly one child`);
    return null;
  }
}