"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = void 0;
function contains(parent, child) {
    const parentKey = parent.key;
    // eslint-disable-next-line no-unmodified-loop-condition
    while (child) {
        if (child.key === parentKey)
            return true;
        child = child.parent;
    }
    return false;
}
exports.contains = contains;
