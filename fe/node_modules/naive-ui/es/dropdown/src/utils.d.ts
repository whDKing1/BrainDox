import type { DropdownMixedOption, DropdownRenderOption } from './interface';
export declare function isSubmenuNode(rawNode: DropdownMixedOption, childrenField: string): boolean;
export declare function isGroupNode(rawNode: DropdownMixedOption): boolean;
export declare function isDividerNode(rawNode: DropdownMixedOption): boolean;
export declare function isRenderNode(rawNode: DropdownMixedOption): rawNode is DropdownRenderOption;
