"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSlot = getSlot;
exports.flatten = flatten;
exports.getFirstVNode = getFirstVNode;
const vue_1 = require("vue");
function getSlot(scope, slots, slotName = 'default') {
    const slot = slots[slotName];
    if (slot === undefined) {
        throw new Error(`[vueuc/${scope}]: slot[${slotName}] is empty.`);
    }
    return slot();
}
// o(n) flatten
function flatten(vNodes, filterCommentNode = true, result = []) {
    vNodes.forEach((vNode) => {
        if (vNode === null)
            return;
        if (typeof vNode !== 'object') {
            if (typeof vNode === 'string' || typeof vNode === 'number') {
                result.push((0, vue_1.createTextVNode)(String(vNode)));
            }
            return;
        }
        if (Array.isArray(vNode)) {
            flatten(vNode, filterCommentNode, result);
            return;
        }
        if (vNode.type === vue_1.Fragment) {
            if (vNode.children === null)
                return;
            if (Array.isArray(vNode.children)) {
                flatten(vNode.children, filterCommentNode, result);
            }
            // rawSlot
        }
        else if (vNode.type !== vue_1.Comment) {
            result.push(vNode);
        }
    });
    return result;
}
function getFirstVNode(scope, slots, slotName = 'default') {
    const slot = slots[slotName];
    if (slot === undefined) {
        throw new Error(`[vueuc/${scope}]: slot[${slotName}] is empty.`);
    }
    const content = flatten(slot());
    // vue will normalize the slot, so slot must be an array
    if (content.length === 1) {
        return content[0];
    }
    else {
        throw new Error(`[vueuc/${scope}]: slot[${slotName}] should have exactly one child.`);
    }
}
