export function toArray(arg) {
    if (Array.isArray(arg))
        return arg;
    return [arg];
}
// Do not use enum for lint plugin has error
export const TRAVERSE_COMMAND = {
    STOP: 'STOP'
};
export function traverseWithCb(treeNode, callback) {
    const command = callback(treeNode);
    if (treeNode.children !== undefined && command !== TRAVERSE_COMMAND.STOP) {
        treeNode.children.forEach((childNode) => traverseWithCb(childNode, callback));
    }
}
export function getNonLeafKeys(treeNodes, options = {}) {
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
export function isLeaf(rawNode, getChildren) {
    const { isLeaf } = rawNode;
    if (isLeaf !== undefined)
        return isLeaf;
    else if (!getChildren(rawNode))
        return true;
    return false;
}
export function defaultGetChildren(node) {
    return node.children;
}
export function defaultGetKey(node) {
    return node.key;
}
export function isIgnored() {
    return false;
}
export function isShallowLoaded(rawNode, getChildren) {
    const { isLeaf } = rawNode;
    if (isLeaf === false && !Array.isArray(getChildren(rawNode)))
        return false;
    return true;
}
export function isDisabled(rawNode) {
    return rawNode.disabled === true;
}
export function isExpilicitlyNotLoaded(rawNode, getChildren) {
    return (rawNode.isLeaf === false && !Array.isArray(getChildren(rawNode)));
}
export function isNodeInvalid(rawNode, getChildren) {
    if (rawNode.isLeaf === true) {
        const children = getChildren(rawNode);
        if (Array.isArray(children) && children.length > 0)
            return true;
    }
    return false;
}
export function unwrapCheckedKeys(result) {
    var _a;
    if (result === undefined || result === null)
        return [];
    if (Array.isArray(result))
        return result;
    return (_a = result.checkedKeys) !== null && _a !== void 0 ? _a : [];
}
export function unwrapIndeterminateKeys(result) {
    var _a;
    if (result === undefined || result === null || Array.isArray(result)) {
        return [];
    }
    return (_a = result.indeterminateKeys) !== null && _a !== void 0 ? _a : [];
}
export function merge(originalKeys, keysToAdd) {
    const set = new Set(originalKeys);
    keysToAdd.forEach((key) => {
        if (!set.has(key)) {
            set.add(key);
        }
    });
    return Array.from(set);
}
export function minus(originalKeys, keysToRemove) {
    const set = new Set(originalKeys);
    keysToRemove.forEach((key) => {
        if (set.has(key)) {
            set.delete(key);
        }
    });
    return Array.from(set);
}
export function isGroup(rawNode) {
    return (rawNode === null || rawNode === void 0 ? void 0 : rawNode.type) === 'group';
}
export function createIndexGetter(treeNodes) {
    const map = new Map();
    treeNodes.forEach((treeNode, i) => {
        map.set(treeNode.key, i);
    });
    return (key) => { var _a; return (_a = map.get(key)) !== null && _a !== void 0 ? _a : null; };
}
