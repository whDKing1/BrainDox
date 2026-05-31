import { TreeNode } from './interface';
export declare function getFirstAvailableNode<R, G, I>(nodes: Array<TreeNode<R, G, I>>): TreeNode<R> | null;
export declare const moveMethods: Pick<TreeNode, 'getChild' | 'getNext' | 'getParent' | 'getPrev'>;
