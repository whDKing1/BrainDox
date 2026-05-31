import type { SelectBaseOption } from '../../select/src/interface';
import type { CascaderOption, TmNode } from './interface';
declare function getRawNodePath(tmNodes: TmNode[]): CascaderOption[];
declare function getRawNodePath(tmNodes: TmNode[] | undefined): CascaderOption[] | null;
export { getRawNodePath };
declare function createSelectOptions(tmNodes: TmNode[], checkStrategyIsChild: boolean, labelField: string, separator: string): Array<SelectBaseOption & {
    rawNode: CascaderOption;
    path: CascaderOption[];
}>;
declare function getPathLabel(node: TmNode | null, separator: string, labelField: string): string;
export { createSelectOptions, getPathLabel };
