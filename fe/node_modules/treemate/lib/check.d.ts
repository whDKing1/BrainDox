import { Key, TreeMate, MergedKeys } from './interface';
export declare class SubtreeNotLoadedError extends Error {
    constructor();
}
export declare function getCheckedKeys<R, G, I>(options: {
    checkedKeys: Key[];
    indeterminateKeys: Key[];
    keysToCheck?: Key[];
    keysToUncheck?: Key[];
    cascade: boolean;
    leafOnly: boolean;
    checkStrategy: string;
    allowNotLoaded: boolean;
}, treeMate: TreeMate<R, G, I>): MergedKeys;
export declare function getExtendedCheckedKeySet<R, G, I>(checkedKeys: Key[], treeMate: TreeMate<R, G, I>, allowNotLoaded: boolean, isUnchecking: boolean): Set<Key>;
