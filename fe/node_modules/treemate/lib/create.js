"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTreeMate = void 0;
const check_1 = require("./check");
const utils_1 = require("./utils");
const path_1 = require("./path");
const move_1 = require("./move");
const flatten_1 = require("./flatten");
const contains_1 = require("./contains");
function createTreeNodes(rawNodes, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren, parent = null, level = 0) {
    const treeNodes = [];
    rawNodes.forEach((rawNode, index) => {
        var _a;
        if (process.env.NODE_ENV !== 'production' &&
            (0, utils_1.isNodeInvalid)(rawNode, getChildren)) {
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
function createTreeMate(rawNodes, options = {}) {
    var _a;
    const treeNodeMap = new Map();
    const levelTreeNodeMap = new Map();
    const { getDisabled = utils_1.isDisabled, getIgnored = utils_1.isIgnored, getIsGroup = utils_1.isGroup, getKey = utils_1.defaultGetKey } = options;
    const _getChildren = (_a = options.getChildren) !== null && _a !== void 0 ? _a : utils_1.defaultGetChildren;
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
            return (0, utils_1.isLeaf)(this.rawNode, getChildren);
        },
        get shallowLoaded() {
            return (0, utils_1.isShallowLoaded)(this.rawNode, getChildren);
        },
        get ignored() {
            return getIgnored(this.rawNode);
        },
        contains(node) {
            return (0, contains_1.contains)(this, node);
        }
    }, move_1.moveMethods);
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
            return (0, flatten_1.flatten)(treeNodes, expandedKeys);
        },
        getNode,
        getPrev,
        getNext,
        getParent,
        getChild,
        getFirstAvailableNode() {
            return (0, move_1.getFirstAvailableNode)(treeNodes);
        },
        getPath(key, options = {}) {
            return (0, path_1.getPath)(key, options, treemate);
        },
        getCheckedKeys(checkedKeys, options = {}) {
            const { cascade = true, leafOnly = false, checkStrategy = 'all', allowNotLoaded = false } = options;
            return (0, check_1.getCheckedKeys)({
                checkedKeys: (0, utils_1.unwrapCheckedKeys)(checkedKeys),
                indeterminateKeys: (0, utils_1.unwrapIndeterminateKeys)(checkedKeys),
                cascade,
                leafOnly,
                checkStrategy,
                allowNotLoaded
            }, treemate);
        },
        check(keysToCheck, checkedKeys, options = {}) {
            const { cascade = true, leafOnly = false, checkStrategy = 'all', allowNotLoaded = false } = options;
            return (0, check_1.getCheckedKeys)({
                checkedKeys: (0, utils_1.unwrapCheckedKeys)(checkedKeys),
                indeterminateKeys: (0, utils_1.unwrapIndeterminateKeys)(checkedKeys),
                keysToCheck: keysToCheck === undefined || keysToCheck === null
                    ? []
                    : (0, utils_1.toArray)(keysToCheck),
                cascade,
                leafOnly,
                checkStrategy,
                allowNotLoaded
            }, treemate);
        },
        uncheck(keysToUncheck, checkedKeys, options = {}) {
            const { cascade = true, leafOnly = false, checkStrategy = 'all', allowNotLoaded = false } = options;
            return (0, check_1.getCheckedKeys)({
                checkedKeys: (0, utils_1.unwrapCheckedKeys)(checkedKeys),
                indeterminateKeys: (0, utils_1.unwrapIndeterminateKeys)(checkedKeys),
                keysToUncheck: keysToUncheck === null || keysToUncheck === undefined
                    ? []
                    : (0, utils_1.toArray)(keysToUncheck),
                cascade,
                leafOnly,
                checkStrategy,
                allowNotLoaded
            }, treemate);
        },
        getNonLeafKeys(options = {}) {
            return (0, utils_1.getNonLeafKeys)(treeNodes, options);
        }
    };
    return treemate;
}
exports.createTreeMate = createTreeMate;
