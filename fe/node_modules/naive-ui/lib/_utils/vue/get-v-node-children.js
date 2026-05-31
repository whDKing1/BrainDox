"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVNodeChildren = getVNodeChildren;
function getVNodeChildren(vNode, slotName = 'default', fallback = []) {
    const { children } = vNode;
    if (children !== null
        && typeof children === 'object'
        && !Array.isArray(children)) {
        const slot = children[slotName];
        if (typeof slot === 'function') {
            return slot();
        }
    }
    return fallback;
}
