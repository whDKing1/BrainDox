import type { PropType } from 'vue';
import type { TmNode } from './interface';
export declare const menuItemGroupProps: {
    readonly tmNode: {
        readonly type: PropType<TmNode>;
        readonly required: true;
    };
    readonly tmNodes: {
        readonly type: PropType<TmNode[]>;
        readonly required: true;
    };
    readonly internalKey: {
        readonly type: PropType<import("treemate").Key>;
        readonly required: true;
    };
    readonly root: BooleanConstructor;
    readonly isGroup: BooleanConstructor;
    readonly level: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    readonly title: PropType<string | (() => import("vue").VNodeChild)>;
    readonly extra: PropType<string | (() => import("vue").VNodeChild)>;
};
export declare const menuItemGroupPropKeys: ("title" | "root" | "extra" | "tmNodes" | "level" | "isGroup" | "tmNode" | "internalKey")[];
export declare const NMenuOptionGroup: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly tmNode: {
        readonly type: PropType<TmNode>;
        readonly required: true;
    };
    readonly tmNodes: {
        readonly type: PropType<TmNode[]>;
        readonly required: true;
    };
    readonly internalKey: {
        readonly type: PropType<import("treemate").Key>;
        readonly required: true;
    };
    readonly root: BooleanConstructor;
    readonly isGroup: BooleanConstructor;
    readonly level: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    readonly title: PropType<string | (() => import("vue").VNodeChild)>;
    readonly extra: PropType<string | (() => import("vue").VNodeChild)>;
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly tmNode: {
        readonly type: PropType<TmNode>;
        readonly required: true;
    };
    readonly tmNodes: {
        readonly type: PropType<TmNode[]>;
        readonly required: true;
    };
    readonly internalKey: {
        readonly type: PropType<import("treemate").Key>;
        readonly required: true;
    };
    readonly root: BooleanConstructor;
    readonly isGroup: BooleanConstructor;
    readonly level: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    readonly title: PropType<string | (() => import("vue").VNodeChild)>;
    readonly extra: PropType<string | (() => import("vue").VNodeChild)>;
}>> & Readonly<{}>, {
    readonly root: boolean;
    readonly isGroup: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
