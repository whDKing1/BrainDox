"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstSlotVNode = getFirstSlotVNode;
exports.getFirstSlotVNodeWithTypedProps = getFirstSlotVNodeWithTypedProps;
const naive_1 = require("../naive");
const flatten_1 = require("./flatten");
function getFirstSlotVNode(slots, slotName = 'default', props = undefined) {
    const slot = slots[slotName];
    if (!slot) {
        (0, naive_1.warn)('getFirstSlotVNode', `slot[${slotName}] is empty`);
        return null;
    }
    const slotContent = (0, flatten_1.flatten)(slot(props));
    // vue will normalize the slot, so slot must be an array
    if (slotContent.length === 1) {
        return slotContent[0];
    }
    else {
        (0, naive_1.warn)('getFirstSlotVNode', `slot[${slotName}] should have exactly one child`);
        return null;
    }
}
function getFirstSlotVNodeWithTypedProps(slotName, slot, props) {
    if (!slot) {
        return null;
    }
    const slotContent = (0, flatten_1.flatten)(slot(props));
    // vue will normalize the slot, so slot must be an array
    if (slotContent.length === 1) {
        return slotContent[0];
    }
    else {
        (0, naive_1.warn)('getFirstSlotVNode', `slot[${slotName}] should have exactly one child`);
        return null;
    }
}
