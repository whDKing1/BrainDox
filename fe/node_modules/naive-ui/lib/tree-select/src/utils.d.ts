import type { SelectBaseOption } from '../../select/src/interface';
import type { TreeSelectTmNode } from './interface';
export declare function treeOption2SelectOption(tmNode: TreeSelectTmNode, labelField: string): SelectBaseOption;
export declare function treeOption2SelectOptionWithPath(tmNode: TreeSelectTmNode, path: TreeSelectTmNode[], separator: string, labelField: string): SelectBaseOption;
