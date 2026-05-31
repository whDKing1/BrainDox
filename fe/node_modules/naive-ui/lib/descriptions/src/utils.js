"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DESCRIPTION_ITEM_FLAG = void 0;
exports.isDescriptionsItem = isDescriptionsItem;
exports.DESCRIPTION_ITEM_FLAG = 'DESCRIPTION_ITEM_FLAG';
function isDescriptionsItem(vNode) {
    if (typeof vNode === 'object' && vNode && !Array.isArray(vNode)) {
        return vNode.type && vNode.type[exports.DESCRIPTION_ITEM_FLAG];
    }
    return false;
}
