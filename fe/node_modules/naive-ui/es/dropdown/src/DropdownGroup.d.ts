import type { TreeNode } from 'treemate';
import type { PropType } from 'vue';
import type { DropdownGroupOption, DropdownIgnoredOption, DropdownOption } from './interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    tmNode: {
        type: PropType<TreeNode<DropdownOption, DropdownGroupOption, DropdownIgnoredOption>>;
        required: true;
    };
    parentKey: {
        type: PropType<string | number | null>;
        default: null;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    tmNode: {
        type: PropType<TreeNode<DropdownOption, DropdownGroupOption, DropdownIgnoredOption>>;
        required: true;
    };
    parentKey: {
        type: PropType<string | number | null>;
        default: null;
    };
}>> & Readonly<{}>, {
    parentKey: string | number | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
