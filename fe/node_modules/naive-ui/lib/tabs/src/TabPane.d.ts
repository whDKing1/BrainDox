import type { HTMLAttributes, PropType, SlotsType, VNode, VNodeChild } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const tabPaneProps: {
    readonly tab: PropType<string | number | VNode | (() => VNodeChild)>;
    readonly name: {
        readonly type: PropType<string | number>;
        readonly required: true;
    };
    readonly disabled: BooleanConstructor;
    readonly displayDirective: {
        readonly type: PropType<"if" | "show" | "show:lazy">;
        readonly default: "if";
    };
    readonly closable: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly tabProps: PropType<HTMLAttributes>;
    /** @deprecated */
    readonly label: PropType<string | number | VNode | (() => VNodeChild)>;
};
export type TabPaneProps = ExtractPublicPropTypes<typeof tabPaneProps>;
export interface TabPaneSlots {
    default?: () => VNode[];
    tab?: () => VNode[];
    prefix?: () => VNode[];
    suffix?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly tab: PropType<string | number | VNode | (() => VNodeChild)>;
    readonly name: {
        readonly type: PropType<string | number>;
        readonly required: true;
    };
    readonly disabled: BooleanConstructor;
    readonly displayDirective: {
        readonly type: PropType<"if" | "show" | "show:lazy">;
        readonly default: "if";
    };
    readonly closable: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly tabProps: PropType<HTMLAttributes>;
    /** @deprecated */
    readonly label: PropType<string | number | VNode | (() => VNodeChild)>;
}>, {
    style: import("vue").Ref<string | import("vue").CSSProperties | undefined, string | import("vue").CSSProperties | undefined>;
    class: import("vue").Ref<string | undefined, string | undefined>;
    mergedClsPrefix: import("vue").Ref<string, string>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly tab: PropType<string | number | VNode | (() => VNodeChild)>;
    readonly name: {
        readonly type: PropType<string | number>;
        readonly required: true;
    };
    readonly disabled: BooleanConstructor;
    readonly displayDirective: {
        readonly type: PropType<"if" | "show" | "show:lazy">;
        readonly default: "if";
    };
    readonly closable: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly tabProps: PropType<HTMLAttributes>;
    /** @deprecated */
    readonly label: PropType<string | number | VNode | (() => VNodeChild)>;
}>> & Readonly<{}>, {
    readonly disabled: boolean;
    readonly closable: boolean | undefined;
    readonly displayDirective: "show" | "if" | "show:lazy";
}, SlotsType<TabPaneSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
