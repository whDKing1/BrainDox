import type { CSSProperties, PropType, Ref } from 'vue';
import type { VResizeObserverOnResize } from 'vueuc';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const gridProps: {
    readonly layoutShiftDisabled: BooleanConstructor;
    readonly responsive: {
        readonly type: PropType<"self" | "screen">;
        readonly default: "self";
    };
    readonly cols: {
        readonly type: PropType<number | string>;
        readonly default: 24;
    };
    readonly itemResponsive: BooleanConstructor;
    readonly collapsed: BooleanConstructor;
    readonly collapsedRows: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly itemStyle: PropType<CSSProperties | string>;
    readonly xGap: {
        readonly type: PropType<number | string>;
        readonly default: 0;
    };
    readonly yGap: {
        readonly type: PropType<number | string>;
        readonly default: 0;
    };
};
export interface NGridInjection {
    isSsrRef: Ref<boolean>;
    itemStyleRef: Ref<CSSProperties | string | undefined>;
    xGapRef: Ref<string | undefined>;
    overflowRef: Ref<boolean>;
    layoutShiftDisabledRef: Ref<boolean>;
}
export type GridProps = ExtractPublicPropTypes<typeof gridProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly layoutShiftDisabled: BooleanConstructor;
    readonly responsive: {
        readonly type: PropType<"self" | "screen">;
        readonly default: "self";
    };
    readonly cols: {
        readonly type: PropType<number | string>;
        readonly default: 24;
    };
    readonly itemResponsive: BooleanConstructor;
    readonly collapsed: BooleanConstructor;
    readonly collapsedRows: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly itemStyle: PropType<CSSProperties | string>;
    readonly xGap: {
        readonly type: PropType<number | string>;
        readonly default: 0;
    };
    readonly yGap: {
        readonly type: PropType<number | string>;
        readonly default: 0;
    };
}>, {
    isSsr: boolean;
    contentEl: Ref<HTMLElement | undefined, HTMLElement | undefined>;
    mergedClsPrefix: Ref<string, string>;
    style: import("vue").ComputedRef<CSSProperties>;
    isResponsive: import("vue").ComputedRef<boolean>;
    responsiveQuery: import("vue").ComputedRef<number | ("s" | "xs" | "m" | "l" | "xl" | "xxl")[] | undefined>;
    responsiveCols: import("vue").ComputedRef<number>;
    handleResize: import("vue").ComputedRef<VResizeObserverOnResize | undefined>;
    overflow: Ref<boolean, boolean>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly layoutShiftDisabled: BooleanConstructor;
    readonly responsive: {
        readonly type: PropType<"self" | "screen">;
        readonly default: "self";
    };
    readonly cols: {
        readonly type: PropType<number | string>;
        readonly default: 24;
    };
    readonly itemResponsive: BooleanConstructor;
    readonly collapsed: BooleanConstructor;
    readonly collapsedRows: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly itemStyle: PropType<CSSProperties | string>;
    readonly xGap: {
        readonly type: PropType<number | string>;
        readonly default: 0;
    };
    readonly yGap: {
        readonly type: PropType<number | string>;
        readonly default: 0;
    };
}>> & Readonly<{}>, {
    readonly responsive: "self" | "screen";
    readonly collapsed: boolean;
    readonly layoutShiftDisabled: boolean;
    readonly cols: string | number;
    readonly itemResponsive: boolean;
    readonly collapsedRows: number;
    readonly xGap: string | number;
    readonly yGap: string | number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
