import type { TreeMateOptions } from 'treemate';
import type { SelectBaseOption, SelectGroupOption, SelectIgnoredOption, SelectMixedOption } from './interface';
export declare function getIsGroup(option: SelectMixedOption): boolean;
export declare function getIgnored(option: SelectMixedOption): boolean;
export declare function patternMatched(pattern: string, value: string): boolean;
export declare function createTmOptions(valueField: string, childrenField: string): TreeMateOptions<SelectBaseOption, SelectGroupOption, SelectIgnoredOption>;
export declare function filterOptions(originalOpts: SelectMixedOption[], filter: (pattern: string, option: SelectBaseOption) => boolean, pattern: string, childrenField: string): SelectMixedOption[];
export declare function createValOptMap(options: SelectMixedOption[], valueField: string, childrenField: string): Map<string | number, SelectBaseOption>;
