"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSubmenuNode = isSubmenuNode;
exports.isGroupNode = isGroupNode;
exports.isDividerNode = isDividerNode;
exports.isRenderNode = isRenderNode;
function isSubmenuNode(rawNode, childrenField) {
    return (rawNode.type === 'submenu'
        || (rawNode.type === undefined && rawNode[childrenField] !== undefined));
}
function isGroupNode(rawNode) {
    return rawNode.type === 'group';
}
function isDividerNode(rawNode) {
    return rawNode.type === 'divider';
}
function isRenderNode(rawNode) {
    return rawNode.type === 'render';
}
