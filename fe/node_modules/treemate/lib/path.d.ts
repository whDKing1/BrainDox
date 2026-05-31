import { GetPathOptions, Key, MergedPath, TreeMate } from './interface';
export declare function getPath<R, G, I, T extends boolean>(key: Key | null | undefined, { includeGroup, includeSelf }: GetPathOptions<T>, treeMate: TreeMate<R, G, I>): T extends true ? MergedPath<R, G> : MergedPath<R, R>;
