import { getCheckedKeys } from './check';
import { toArray, isDisabled, isLeaf, isGroup, isNodeInvalid, unwrapCheckedKeys, isShallowLoaded, unwrapIndeterminateKeys, getNonLeafKeys, isIgnored, defaultGetChildren, defaultGetKey } from './utils';
import { getPath } from './path';
import { moveMethods, getFirstAvailableNode } from './move';
import { flatten } from './flatten';
import { contains } from './contains';
function createTreeNodes(rawNodes, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren, parent = null, level = 0) {
    const treeNodes = [];
    rawNodes.forEach((rawNode, index) => {
        var _a;
        if (process.env.NODE_ENV !== 'production' &&
            isNodeInvalid(rawNode, getChildren)) {
            console.error('[treemate]: node', rawNode, 'is invalid');
        }
        const treeNode = Object.create(nodeProto);
        treeNode.rawNode = rawNode;
        treeNode.siblings = treeNodes;
        treeNode.level = level;
        treeNode.index = index;
        treeNode.isFirstChild = index === 0;
        treeNode.isLastChild = index + 1 === rawNodes.length;
        treeNode.parent = parent;
        if (!treeNode.ignored) {
            const rawChildren = getChildren(rawNode);
            if (Array.isArray(rawChildren)) {
                treeNode.children = createTreeNodes(rawChildren, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren, treeNode, level + 1);
            }
        }
        treeNodes.push(treeNode);
        treeNodeMap.set(treeNode.key, treeNode);
        if (!levelTreeNodeMap.has(level))
            levelTreeNodeMap.set(level, []);
        (_a = levelTreeNodeMap.get(level)) === null || _a === void 0 ? void 0 : _a.push(treeNode);
    });
    return treeNodes;
}
export function createTreeMate(rawNodes, options = {}) {
    var _a;
    const treeNodeMap = new Map();
    const levelTreeNodeMap = new Map();
    const { getDisabled = isDisabled, getIgnored = isIgnored, getIsGroup = isGroup, getKey = defaultGetKey } = options;
    const _getChildren = (_a = options.getChildren) !== null && _a !== void 0 ? _a : defaultGetChildren;
    const getChildren = options.ignoreEmptyChildren
        ? (node) => {
            const children = _getChildren(node);
            if (Array.isArray(children)) {
                if (!children.length)
                    return null;
                return children;
            }
            return children;
        }
        : _getChildren;
    const nodeProto = Object.assign({
        get key() {
            // do not pass parent or related things to it
            // the key need to be specified explicitly
            return getKey(this.rawNode);
        },
        get disabled() {
            return getDisabled(this.rawNode);
        },
        get isGroup() {
            return getIsGroup(this.rawNode);
        },
        get isLeaf() {
            return isLeaf(this.rawNode, getChildren);
        },
        get shallowLoaded() {
            return isShallowLoaded(this.rawNode, getChildren);
        },
        get ignored() {
            return getIgnored(this.rawNode);
        },
        contains(node) {
            return contains(this, node);
        }
    }, moveMethods);
    const treeNodes = createTreeNodes(rawNodes, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren);
    function getNode(key) {
        if (key === null || key === undefined)
            return null;
        const tmNode = treeNodeMap.get(key);
        if (tmNode && !tmNode.isGroup && !tmNode.ignored) {
            return tmNode;
        }
        return null;
    }
    function _getNode(key) {
        if (key === null || key === undefined)
            return null;
        const tmNode = treeNodeMap.get(key);
        if (tmNode && !tmNode.ignored) {
            return tmNode;
        }
        return null;
    }
    function getPrev(key, options) {
        const node = _getNode(key);
        if (!node)
            return null;
        return node.getPrev(options);
    }
    function getNext(key, options) {
        const node = _getNode(key);
        if (!node)
            return null;
        return node.getNext(options);
    }
    function getParent(key) {
        const node = _getNode(key);
        if (!node)
            return null;
        return node.getParent();
    }
    function getChild(key) {
        const node = _getNode(key);
        if (!node)
            return null;
        return node.getChild();
    }
    const treemate = {
        treeNodes,
        treeNodeMap,
        levelTreeNodeMap,
        maxLevel: Math.max(...levelTreeNodeMap.keys()),
        getChildren,
        getFlattenedNodes(expandedKeys) {
            return flatten(treeNodes, expandedKeys);
        },
        getNode,
        getPrev,
        getNext,
        getParent,
        getChild,
        getFirstAvailableNode() {
            return getFirstAvailableNode(treeNodes);
        },
        getPath(key, options = {}) {
            return getPath(key, options, treemate);
        },
        getCheckedKeys(checkedKeys, options = {}) {
            const { cascade = true, leafOnly = false, checkStrategy = 'all', allowNotLoaded = false } = options;
            return getCheckedKeys({
                checkedKeys: unwrapCheckedKeys(checkedKeys),
                indeterminateKeys: unwrapIndeterminateKeys(checkedKeys),
                cascade,
                leafOnly,
                checkStrategy,
                allowNotLoaded
            }, treemate);
        },
        check(keysToCheck, checkedKeys, options = {}) {
            const { cascade = true, leafOnly = false, checkStrategy = 'all', allowNotLoaded = false } = options;
            return getCheckedKeys({
                checkedKeys: unwrapCheckedKeys(checkedKeys),
                indeterminateKeys: unwrapIndeterminateKeys(checkedKeys),
                keysToCheck: keysToCheck === undefined || keysToCheck === null
                    ? []
                    : toArray(keysToCheck),
                cascade,
                leafOnly,
                checkStrategy,
                allowNotLoaded
            }, treemate);
        },
        uncheck(keysToUncheck, checkedKeys, options = {}) {
            const { cascade = true, leafOnly = false, checkStrategy = 'all', allowNotLoaded = false } = options;
            return getCheckedKeys({
                checkedKeys: unwrapCheckedKeys(checkedKeys),
                indeterminateKeys: unwrapIndeterminateKeys(checkedKeys),
                keysToUncheck: keysToUncheck === null || keysToUncheck === undefined
                    ? []
                    : toArray(keysToUncheck),
                cascade,
                leafOnly,
                checkStrategy,
                allowNotLoaded
            }, treemate);
        },
        getNonLeafKeys(options = {}) {
            return getNonLeafKeys(treeNodes, options);
        }
    };
    return treemate;
}
