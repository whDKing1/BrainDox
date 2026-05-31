import { Key, TreeNode } from './interface';
export declare function flatten<R, G, I>(treeNodes: Array<TreeNode<R, G, I>>, expandedKeys?: Key[]): Array<TreeNode<R, G, I>>;
