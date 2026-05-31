"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIndexGetter = exports.isGroup = exports.minus = exports.merge = exports.unwrapIndeterminateKeys = exports.unwrapCheckedKeys = exports.isNodeInvalid = exports.isExpilicitlyNotLoaded = exports.isDisabled = exports.isShallowLoaded = exports.isIgnored = exports.defaultGetKey = exports.defaultGetChildren = exports.isLeaf = exports.getNonLeafKeys = exports.traverseWithCb = exports.TRAVERSE_COMMAND = exports.toArray = void 0;
function toArray(arg) {
    if (Array.isArray(arg))
        return arg;
    return [arg];
}
exports.toArray = toArray;
// Do not use enum for lint plugin has error
exports.TRAVERSE_COMMAND = {
    STOP: 'STOP'
};
function traverseWithCb(treeNode, callback) {
    const command = callback(treeNode);
    if (treeNode.children !== undefined && command !== exports.TRAVERSE_COMMAND.STOP) {
        treeNode.children.forEach((childNode) => traverseWithCb(childNode, callback));
    }
}
exports.traverseWithCb = traverseWithCb;
function getNonLeafKeys(treeNodes, options = {}) {
    const { preserveGroup = false } = options;
    const keys = [];
    const cb = preserveGroup
        ? (node) => {
            if (!node.isLeaf) {
                keys.push(node.key);
                traverse(node.children);
            }
        }
        : (node) => {
            if (!node.isLeaf) {
                if (!node.isGroup)
                    keys.push(node.key);
                traverse(node.children);
            }
        };
    function traverse(nodes) {
        nodes.forEach(cb);
    }
    traverse(treeNodes);
    return keys;
}
exports.getNonLeafKeys = getNonLeafKeys;
function isLeaf(rawNode, getChildren) {
    const { isLeaf } = rawNode;
    if (isLeaf !== undefined)
        return isLeaf;
    else if (!getChildren(rawNode))
        return true;
    return false;
}
exports.isLeaf = isLeaf;
function defaultGetChildren(node) {
    return node.children;
}
exports.defaultGetChildren = defaultGetChildren;
function defaultGetKey(node) {
    return node.key;
}
exports.defaultGetKey = defaultGetKey;
function isIgnored() {
    return false;
}
exports.isIgnored = isIgnored;
function isShallowLoaded(rawNode, getChildren) {
    const { isLeaf } = rawNode;
    if (isLeaf === false && !Array.isArray(getChildren(rawNode)))
        return false;
    return true;
}
exports.isShallowLoaded = isShallowLoaded;
function isDisabled(rawNode) {
    return rawNode.disabled === true;
}
exports.isDisabled = isDisabled;
function isExpilicitlyNotLoaded(rawNode, getChildren) {
    return (rawNode.isLeaf === false && !Array.isArray(getChildren(rawNode)));
}
exports.isExpilicitlyNotLoaded = isExpilicitlyNotLoaded;
function isNodeInvalid(rawNode, getChildren) {
    if (rawNode.isLeaf === true) {
        const children = getChildren(rawNode);
        if (Array.isArray(children) && children.length > 0)
            return true;
    }
    return false;
}
exports.isNodeInvalid = isNodeInvalid;
function unwrapCheckedKeys(result) {
    var _a;
    if (result === undefined || result === null)
        return [];
    if (Array.isArray(result))
        return result;
    return (_a = result.checkedKeys) !== null && _a !== void 0 ? _a : [];
}
exports.unwrapCheckedKeys = unwrapCheckedKeys;
function unwrapIndeterminateKeys(result) {
    var _a;
    if (result === undefined || result === null || Array.isArray(result)) {
        return [];
    }
    return (_a = result.indeterminateKeys) !== null && _a !== void 0 ? _a : [];
}
exports.unwrapIndeterminateKeys = unwrapIndeterminateKeys;
function merge(originalKeys, keysToAdd) {
    const set = new Set(originalKeys);
    keysToAdd.forEach((key) => {
        if (!set.has(key)) {
            set.add(key);
        }
    });
    return Array.from(set);
}
exports.merge = merge;
function minus(originalKeys, keysToRemove) {
    const set = new Set(originalKeys);
    keysToRemove.forEach((key) => {
        if (set.has(key)) {
            set.delete(key);
        }
    });
    return Array.from(set);
}
exports.minus = minus;
function isGroup(rawNode) {
    return (rawNode === null || rawNode === void 0 ? void 0 : rawNode.type) === 'group';
}
exports.isGroup = isGroup;
function createIndexGetter(treeNodes) {
    const map = new Map();
    treeNodes.forEach((treeNode, i) => {
        map.set(treeNode.key, i);
    });
    return (key) => { var _a; return (_a = map.get(key)) !== null && _a !== void 0 ? _a : null; };
}
exports.createIndexGetter = createIndexGetter;
