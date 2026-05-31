export function flatten(treeNodes, expandedKeys) {
    const expandedKeySet = expandedKeys ? new Set(expandedKeys) : undefined;
    const flattenedNodes = [];
    function traverse(treeNodes) {
        treeNodes.forEach((treeNode) => {
            flattenedNodes.push(treeNode);
            if (treeNode.isLeaf || !treeNode.children || treeNode.ignored)
                return;
            if (treeNode.isGroup) {
                // group node shouldn't be expanded
                traverse(treeNode.children);
            }
            else if (
            // normal non-leaf node
            expandedKeySet === undefined ||
                expandedKeySet.has(treeNode.key)) {
                traverse(treeNode.children);
            }
        });
    }
    traverse(treeNodes);
    return flattenedNodes;
}
