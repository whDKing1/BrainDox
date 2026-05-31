import type { Key } from 'treemate';
import type { ExtractPropTypes, PropType, VNodeChild } from 'vue';
export declare const useMenuChildProps: {
    readonly internalKey: {
        readonly type: PropType<Key>;
        readonly required: true;
    };
    readonly root: BooleanConstructor;
    readonly isGroup: BooleanConstructor;
    readonly level: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    readonly title: PropType<string | (() => VNodeChild)>;
    readonly extra: PropType<string | (() => VNodeChild)>;
};
export type UseMenuChildProps = ExtractPropTypes<typeof useMenuChildProps>;
