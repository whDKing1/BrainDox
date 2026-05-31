import type { CSSProperties, PropType, SlotsType, VNode } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { SplitOnUpdateSize } from './types';
export declare const splitProps: {
    readonly direction: {
        readonly type: PropType<"horizontal" | "vertical">;
        readonly default: "horizontal";
    };
    readonly resizeTriggerSize: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    readonly disabled: BooleanConstructor;
    readonly defaultSize: {
        readonly type: PropType<string | number>;
        readonly default: 0.5;
    };
    readonly 'onUpdate:size': PropType<SplitOnUpdateSize | SplitOnUpdateSize[]>;
    readonly onUpdateSize: PropType<SplitOnUpdateSize | SplitOnUpdateSize[]>;
    readonly size: PropType<string | number>;
    readonly min: {
        readonly type: PropType<string | number>;
        readonly default: 0;
    };
    readonly max: {
        readonly type: PropType<string | number>;
        readonly default: 1;
    };
    readonly pane1Class: StringConstructor;
    readonly pane1Style: PropType<CSSProperties | string>;
    readonly pane2Class: StringConstructor;
    readonly pane2Style: PropType<CSSProperties | string>;
    readonly onDragStart: PropType<(e: Event) => void>;
    readonly onDragMove: PropType<(e: Event) => void>;
    readonly onDragEnd: PropType<(e: Event) => void>;
    readonly watchProps: PropType<Array<"defaultSize">>;
    readonly theme: PropType<import("../../_mixins").Theme<"Split", {
        resizableTriggerColorHover: string;
        resizableTriggerColor: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Split", {
        resizableTriggerColorHover: string;
        resizableTriggerColor: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Split", {
        resizableTriggerColorHover: string;
        resizableTriggerColor: string;
    }, any>>>;
};
export type SplitProps = ExtractPublicPropTypes<typeof splitProps>;
export interface SplitSlots {
    default?: () => VNode[];
    1?: () => VNode[];
    2?: () => VNode[];
    'resize-trigger'?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly direction: {
        readonly type: PropType<"horizontal" | "vertical">;
        readonly default: "horizontal";
    };
    readonly resizeTriggerSize: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    readonly disabled: BooleanConstructor;
    readonly defaultSize: {
        readonly type: PropType<string | number>;
        readonly default: 0.5;
    };
    readonly 'onUpdate:size': PropType<SplitOnUpdateSize | SplitOnUpdateSize[]>;
    readonly onUpdateSize: PropType<SplitOnUpdateSize | SplitOnUpdateSize[]>;
    readonly size: PropType<string | number>;
    readonly min: {
        readonly type: PropType<string | number>;
        readonly default: 0;
    };
    readonly max: {
        readonly type: PropType<string | number>;
        readonly default: 1;
    };
    readonly pane1Class: StringConstructor;
    readonly pane1Style: PropType<CSSProperties | string>;
    readonly pane2Class: StringConstructor;
    readonly pane2Style: PropType<CSSProperties | string>;
    readonly onDragStart: PropType<(e: Event) => void>;
    readonly onDragMove: PropType<(e: Event) => void>;
    readonly onDragEnd: PropType<(e: Event) => void>;
    readonly watchProps: PropType<Array<"defaultSize">>;
    readonly theme: PropType<import("../../_mixins").Theme<"Split", {
        resizableTriggerColorHover: string;
        resizableTriggerColor: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Split", {
        resizableTriggerColorHover: string;
        resizableTriggerColor: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Split", {
        resizableTriggerColorHover: string;
        resizableTriggerColor: string;
    }, any>>>;
}>, {
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-resize-trigger-color': string;
        '--n-resize-trigger-color-hover': string;
    }> | undefined;
    resizeTriggerElRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    isDragging: import("vue").Ref<boolean, boolean>;
    mergedClsPrefix: import("vue").Ref<string, string>;
    resizeTriggerWrapperStyle: import("vue").ComputedRef<{
        width: string;
        height: string;
        cursor: string;
    }>;
    resizeTriggerStyle: import("vue").ComputedRef<{
        width: string;
        height: string;
    }>;
    handleMouseDown: (e: MouseEvent) => void;
    firstPaneStyle: import("vue").ComputedRef<{
        flex: string;
    } | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly direction: {
        readonly type: PropType<"horizontal" | "vertical">;
        readonly default: "horizontal";
    };
    readonly resizeTriggerSize: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    readonly disabled: BooleanConstructor;
    readonly defaultSize: {
        readonly type: PropType<string | number>;
        readonly default: 0.5;
    };
    readonly 'onUpdate:size': PropType<SplitOnUpdateSize | SplitOnUpdateSize[]>;
    readonly onUpdateSize: PropType<SplitOnUpdateSize | SplitOnUpdateSize[]>;
    readonly size: PropType<string | number>;
    readonly min: {
        readonly type: PropType<string | number>;
        readonly default: 0;
    };
    readonly max: {
        readonly type: PropType<string | number>;
        readonly default: 1;
    };
    readonly pane1Class: StringConstructor;
    readonly pane1Style: PropType<CSSProperties | string>;
    readonly pane2Class: StringConstructor;
    readonly pane2Style: PropType<CSSProperties | string>;
    readonly onDragStart: PropType<(e: Event) => void>;
    readonly onDragMove: PropType<(e: Event) => void>;
    readonly onDragEnd: PropType<(e: Event) => void>;
    readonly watchProps: PropType<Array<"defaultSize">>;
    readonly theme: PropType<import("../../_mixins").Theme<"Split", {
        resizableTriggerColorHover: string;
        resizableTriggerColor: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Split", {
        resizableTriggerColorHover: string;
        resizableTriggerColor: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Split", {
        resizableTriggerColorHover: string;
        resizableTriggerColor: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly disabled: boolean;
    readonly max: string | number;
    readonly defaultSize: string | number;
    readonly direction: "horizontal" | "vertical";
    readonly min: string | number;
    readonly resizeTriggerSize: number;
}, SlotsType<SplitSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
