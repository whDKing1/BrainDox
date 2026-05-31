import type { ExtractPublicPropTypes } from '../../_utils';
export declare const tabProps: {
    readonly label: import("vue").PropType<string | number | import("vue").VNode | (() => import("vue").VNodeChild)>;
    readonly disabled: BooleanConstructor;
    readonly name: {
        readonly type: import("vue").PropType<string | number>;
        readonly required: true;
    };
    readonly tabProps: import("vue").PropType<import("vue").HTMLAttributes>;
    readonly closable: {
        readonly type: import("vue").PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly tab: import("vue").PropType<string | number | import("vue").VNode | (() => import("vue").VNodeChild)>;
    readonly internalLeftPadded: BooleanConstructor;
    readonly internalAddable: BooleanConstructor;
    readonly internalCreatedByPane: BooleanConstructor;
};
export type TabProps = ExtractPublicPropTypes<typeof tabProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly label: import("vue").PropType<string | number | import("vue").VNode | (() => import("vue").VNodeChild)>;
    readonly disabled: BooleanConstructor;
    readonly name: {
        readonly type: import("vue").PropType<string | number>;
        readonly required: true;
    };
    readonly tabProps: import("vue").PropType<import("vue").HTMLAttributes>;
    readonly closable: {
        readonly type: import("vue").PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly tab: import("vue").PropType<string | number | import("vue").VNode | (() => import("vue").VNodeChild)>;
    readonly internalLeftPadded: BooleanConstructor;
    readonly internalAddable: BooleanConstructor;
    readonly internalCreatedByPane: BooleanConstructor;
}>, {
    trigger: import("vue").Ref<"hover" | "click", "hover" | "click">;
    mergedClosable: import("vue").ComputedRef<boolean>;
    style: import("vue").Ref<string | import("vue").CSSProperties | undefined, string | import("vue").CSSProperties | undefined>;
    addStyle: import("vue").Ref<string | import("vue").CSSProperties | undefined, string | import("vue").CSSProperties | undefined>;
    tabClass: import("vue").Ref<string | undefined, string | undefined>;
    addTabClass: import("vue").Ref<string | undefined, string | undefined>;
    clsPrefix: import("vue").Ref<string, string>;
    value: import("vue").Ref<string | number | null, string | number | null>;
    type: import("vue").Ref<import("./interface").TabsType, import("./interface").TabsType>;
    handleClose(e: MouseEvent): void;
    activateTab(): void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly label: import("vue").PropType<string | number | import("vue").VNode | (() => import("vue").VNodeChild)>;
    readonly disabled: BooleanConstructor;
    readonly name: {
        readonly type: import("vue").PropType<string | number>;
        readonly required: true;
    };
    readonly tabProps: import("vue").PropType<import("vue").HTMLAttributes>;
    readonly closable: {
        readonly type: import("vue").PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly tab: import("vue").PropType<string | number | import("vue").VNode | (() => import("vue").VNodeChild)>;
    readonly internalLeftPadded: BooleanConstructor;
    readonly internalAddable: BooleanConstructor;
    readonly internalCreatedByPane: BooleanConstructor;
}>> & Readonly<{}>, {
    readonly disabled: boolean;
    readonly closable: boolean | undefined;
    readonly internalLeftPadded: boolean;
    readonly internalAddable: boolean;
    readonly internalCreatedByPane: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
