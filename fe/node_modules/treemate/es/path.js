export function getPath(key, { includeGroup = false, includeSelf = true }, treeMate) {
    var _a;
    const treeNodeMap = treeMate.treeNodeMap;
    let treeNode = key === null || key === undefined ? null : (_a = treeNodeMap.get(key)) !== null && _a !== void 0 ? _a : null;
    const mergedPath = {
        keyPath: [],
        treeNodePath: [],
        treeNode: treeNode
    };
    if (treeNode === null || treeNode === void 0 ? void 0 : treeNode.ignored) {
        mergedPath.treeNode = null;
        return mergedPath;
    }
    while (treeNode) {
        if (!treeNode.ignored && (includeGroup || !treeNode.isGroup)) {
            mergedPath.treeNodePath.push(treeNode);
        }
        treeNode = treeNode.parent;
    }
    mergedPath.treeNodePath.reverse();
    if (!includeSelf)
        mergedPath.treeNodePath.pop();
    mergedPath.keyPath = mergedPath.treeNodePath.map((treeNode) => treeNode.key);
    return mergedPath;
}
