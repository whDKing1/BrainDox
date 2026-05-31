import { RawNode, TreeMate, TreeMateOptions } from './interface';
export declare function createTreeMate<R = RawNode, G = R, I = R>(rawNodes: Array<R | G | I>, options?: TreeMateOptions<R, G, I>): TreeMate<R, G, I>;
