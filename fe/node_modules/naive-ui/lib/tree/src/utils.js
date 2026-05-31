"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyImage = void 0;
exports.useMergedCheckStrategy = useMergedCheckStrategy;
exports.isNodeDisabled = isNodeDisabled;
exports.keysWithFilter = keysWithFilter;
exports.filterTree = filterTree;
exports.treeGetClickTarget = treeGetClickTarget;
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
function useMergedCheckStrategy(props) {
    return (0, vue_1.computed)(() => (props.leafOnly ? 'child' : props.checkStrategy));
}
function isNodeDisabled(node, disabledField) {
    return !!node.rawNode[disabledField];
}
function traverse(nodes, childrenField, callback, callbackAfter) {
    nodes === null || nodes === void 0 ? void 0 : nodes.forEach((node) => {
        callback(node);
        traverse(node[childrenField], childrenField, callback, callbackAfter);
        callbackAfter(node);
    });
}
function keysWithFilter(nodes, pattern, keyField, childrenField, filter) {
    const keys = new Set();
    const highlightKeySet = new Set();
    const path = [];
    traverse(nodes, childrenField, (node) => {
        path.push(node);
        if (filter(pattern, node)) {
            highlightKeySet.add(node[keyField]);
            for (let i = path.length - 2; i >= 0; --i) {
                if (!keys.has(path[i][keyField])) {
                    keys.add(path[i][keyField]);
                }
                else {
                    return;
                }
            }
        }
    }, () => {
        path.pop();
    });
    return {
        expandedKeys: Array.from(keys),
        highlightKeySet
    };
}
const emptyImage = null;
exports.emptyImage = emptyImage;
if (_utils_1.isBrowser && Image) {
    const emptyImage = new Image();
    exports.emptyImage = emptyImage;
    emptyImage.src
        = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
}
function filterTree(tree, filter, pattern, keyField, childrenField) {
    const visitedTailKeys = new Set();
    const visitedNonTailKeys = new Set();
    const highlightKeySet = new Set();
    const expandedKeys = [];
    const filteredTree = [];
    const path = [];
    function visit(t) {
        t.forEach((n) => {
            path.push(n);
            if (filter(pattern, n)) {
                visitedTailKeys.add(n[keyField]);
                highlightKeySet.add(n[keyField]);
                for (let i = path.length - 2; i >= 0; --i) {
                    const key = path[i][keyField];
                    if (!visitedNonTailKeys.has(key)) {
                        visitedNonTailKeys.add(key);
                        if (visitedTailKeys.has(key)) {
                            visitedTailKeys.delete(key);
                        }
                    }
                    else {
                        break;
                    }
                }
            }
            const children = n[childrenField];
            if (children) {
                visit(children);
            }
            path.pop();
        });
    }
    visit(tree);
    function build(t, sibs) {
        t.forEach((n) => {
            const key = n[keyField];
            const isVisitedTail = visitedTailKeys.has(key);
            const isVisitedNonTail = visitedNonTailKeys.has(key);
            if (!isVisitedTail && !isVisitedNonTail)
                return;
            const children = n[childrenField];
            if (children) {
                if (isVisitedTail) {
                    // If it is visited path tail, use origin node
                    sibs.push(n);
                }
                else {
                    // It it is not visited path tail, use cloned node
                    expandedKeys.push(key);
                    const clonedNode = Object.assign(Object.assign({}, n), { [childrenField]: [] });
                    sibs.push(clonedNode);
                    build(children, clonedNode[childrenField]);
                }
            }
            else {
                sibs.push(n);
            }
        });
    }
    build(tree, filteredTree);
    return {
        filteredTree,
        highlightKeySet,
        expandedKeys
    };
}
function treeGetClickTarget(e) {
    if ((0, seemly_1.happensIn)(e, 'checkbox')) {
        return 'checkbox';
    }
    else if ((0, seemly_1.happensIn)(e, 'switcher')) {
        return 'switcher';
    }
    else {
        return 'node';
    }
}
