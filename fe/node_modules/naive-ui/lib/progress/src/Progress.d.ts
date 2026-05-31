import type { CSSProperties, PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { ProgressGradient, ProgressStatus } from './public-types';
export declare const progressProps: {
    readonly processing: BooleanConstructor;
    readonly type: {
        readonly type: PropType<"line" | "circle" | "multiple-circle" | "dashboard">;
        readonly default: "line";
    };
    readonly gapDegree: NumberConstructor;
    readonly gapOffsetDegree: NumberConstructor;
    readonly status: {
        readonly type: PropType<ProgressStatus>;
        readonly default: "default";
    };
    readonly railColor: PropType<string | string[]>;
    readonly railStyle: PropType<string | CSSProperties | Array<string | CSSProperties>>;
    readonly color: PropType<string | string[] | ProgressGradient | ProgressGradient[]>;
    readonly viewBoxWidth: {
        readonly type: NumberConstructor;
        readonly default: 100;
    };
    readonly strokeWidth: {
        readonly type: NumberConstructor;
        readonly default: 7;
    };
    readonly percentage: PropType<number | number[]>;
    readonly unit: {
        readonly type: StringConstructor;
        readonly default: "%";
    };
    readonly showIndicator: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly indicatorPosition: {
        readonly type: PropType<"inside" | "outside">;
        readonly default: "outside";
    };
    readonly indicatorPlacement: {
        readonly type: PropType<"inside" | "outside">;
        readonly default: "outside";
    };
    readonly indicatorTextColor: StringConstructor;
    readonly circleGap: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly height: NumberConstructor;
    readonly borderRadius: PropType<string | number>;
    readonly fillBorderRadius: PropType<string | number>;
    readonly offsetDegree: NumberConstructor;
    readonly theme: PropType<import("../../_mixins").Theme<"Progress", {
        fontSize: string;
        fontSizeCircle: string;
        fontWeightCircle: string;
        railColor: string;
        railHeight: string;
        iconSizeCircle: string;
        iconSizeLine: string;
        iconColor: string;
        iconColorInfo: string;
        iconColorSuccess: string;
        iconColorWarning: string;
        iconColorError: string;
        textColorCircle: string;
        textColorLineInner: string;
        textColorLineOuter: string;
        fillColor: string;
        fillColorInfo: string;
        fillColorSuccess: string;
        fillColorWarning: string;
        fillColorError: string;
        lineBgProcessing: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Progress", {
        fontSize: string;
        fontSizeCircle: string;
        fontWeightCircle: string;
        railColor: string;
        railHeight: string;
        iconSizeCircle: string;
        iconSizeLine: string;
        iconColor: string;
        iconColorInfo: string;
        iconColorSuccess: string;
        iconColorWarning: string;
        iconColorError: string;
        textColorCircle: string;
        textColorLineInner: string;
        textColorLineOuter: string;
        fillColor: string;
        fillColorInfo: string;
        fillColorSuccess: string;
        fillColorWarning: string;
        fillColorError: string;
        lineBgProcessing: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Progress", {
        fontSize: string;
        fontSizeCircle: string;
        fontWeightCircle: string;
        railColor: string;
        railHeight: string;
        iconSizeCircle: string;
        iconSizeLine: string;
        iconColor: string;
        iconColorInfo: string;
        iconColorSuccess: string;
        iconColorWarning: string;
        iconColorError: string;
        textColorCircle: string;
        textColorLineInner: string;
        textColorLineOuter: string;
        fillColor: string;
        fillColorInfo: string;
        fillColorSuccess: string;
        fillColorWarning: string;
        fillColorError: string;
        lineBgProcessing: string;
    }, any>>>;
};
export type ProgressProps = ExtractPublicPropTypes<typeof progressProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly processing: BooleanConstructor;
    readonly type: {
        readonly type: PropType<"line" | "circle" | "multiple-circle" | "dashboard">;
        readonly default: "line";
    };
    readonly gapDegree: NumberConstructor;
    readonly gapOffsetDegree: NumberConstructor;
    readonly status: {
        readonly type: PropType<ProgressStatus>;
        readonly default: "default";
    };
    readonly railColor: PropType<string | string[]>;
    readonly railStyle: PropType<string | CSSProperties | Array<string | CSSProperties>>;
    readonly color: PropType<string | string[] | ProgressGradient | ProgressGradient[]>;
    readonly viewBoxWidth: {
        readonly type: NumberConstructor;
        readonly default: 100;
    };
    readonly strokeWidth: {
        readonly type: NumberConstructor;
        readonly default: 7;
    };
    readonly percentage: PropType<number | number[]>;
    readonly unit: {
        readonly type: StringConstructor;
        readonly default: "%";
    };
    readonly showIndicator: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly indicatorPosition: {
        readonly type: PropType<"inside" | "outside">;
        readonly default: "outside";
    };
    readonly indicatorPlacement: {
        readonly type: PropType<"inside" | "outside">;
        readonly default: "outside";
    };
    readonly indicatorTextColor: StringConstructor;
    readonly circleGap: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly height: NumberConstructor;
    readonly borderRadius: PropType<string | number>;
    readonly fillBorderRadius: PropType<string | number>;
    readonly offsetDegree: NumberConstructor;
    readonly theme: PropType<import("../../_mixins").Theme<"Progress", {
        fontSize: string;
        fontSizeCircle: string;
        fontWeightCircle: string;
        railColor: string;
        railHeight: string;
        iconSizeCircle: string;
        iconSizeLine: string;
        iconColor: string;
        iconColorInfo: string;
        iconColorSuccess: string;
        iconColorWarning: string;
        iconColorError: string;
        textColorCircle: string;
        textColorLineInner: string;
        textColorLineOuter: string;
        fillColor: string;
        fillColorInfo: string;
        fillColorSuccess: string;
        fillColorWarning: string;
        fillColorError: string;
        lineBgProcessing: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Progress", {
        fontSize: string;
        fontSizeCircle: string;
        fontWeightCircle: string;
        railColor: string;
        railHeight: string;
        iconSizeCircle: string;
        iconSizeLine: string;
        iconColor: string;
        iconColorInfo: string;
        iconColorSuccess: string;
        iconColorWarning: string;
        iconColorError: string;
        textColorCircle: string;
        textColorLineInner: string;
        textColorLineOuter: string;
        fillColor: string;
        fillColorInfo: string;
        fillColorSuccess: string;
        fillColorWarning: string;
        fillColorError: string;
        lineBgProcessing: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Progress", {
        fontSize: string;
        fontSizeCircle: string;
        fontWeightCircle: string;
        railColor: string;
        railHeight: string;
        iconSizeCircle: string;
        iconSizeLine: string;
        iconColor: string;
        iconColorInfo: string;
        iconColorSuccess: string;
        iconColorWarning: string;
        iconColorError: string;
        textColorCircle: string;
        textColorLineInner: string;
        textColorLineOuter: string;
        fillColor: string;
        fillColorInfo: string;
        fillColorSuccess: string;
        fillColorWarning: string;
        fillColorError: string;
        lineBgProcessing: string;
    }, any>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    mergedIndicatorPlacement: import("vue").ComputedRef<"inside" | "outside">;
    gapDeg: import("vue").ComputedRef<number | undefined>;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-fill-color': string;
        '--n-font-size': string;
        '--n-font-size-circle': string;
        '--n-font-weight-circle': string;
        '--n-icon-color': string;
        '--n-icon-size-circle': string;
        '--n-icon-size-line': string;
        '--n-line-bg-processing': string;
        '--n-rail-color': string;
        '--n-rail-height': string;
        '--n-text-color-circle': string;
        '--n-text-color-line-inner': string;
        '--n-text-color-line-outer': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly processing: BooleanConstructor;
    readonly type: {
        readonly type: PropType<"line" | "circle" | "multiple-circle" | "dashboard">;
        readonly default: "line";
    };
    readonly gapDegree: NumberConstructor;
    readonly gapOffsetDegree: NumberConstructor;
    readonly status: {
        readonly type: PropType<ProgressStatus>;
        readonly default: "default";
    };
    readonly railColor: PropType<string | string[]>;
    readonly railStyle: PropType<string | CSSProperties | Array<string | CSSProperties>>;
    readonly color: PropType<string | string[] | ProgressGradient | ProgressGradient[]>;
    readonly viewBoxWidth: {
        readonly type: NumberConstructor;
        readonly default: 100;
    };
    readonly strokeWidth: {
        readonly type: NumberConstructor;
        readonly default: 7;
    };
    readonly percentage: PropType<number | number[]>;
    readonly unit: {
        readonly type: StringConstructor;
        readonly default: "%";
    };
    readonly showIndicator: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly indicatorPosition: {
        readonly type: PropType<"inside" | "outside">;
        readonly default: "outside";
    };
    readonly indicatorPlacement: {
        readonly type: PropType<"inside" | "outside">;
        readonly default: "outside";
    };
    readonly indicatorTextColor: StringConstructor;
    readonly circleGap: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly height: NumberConstructor;
    readonly borderRadius: PropType<string | number>;
    readonly fillBorderRadius: PropType<string | number>;
    readonly offsetDegree: NumberConstructor;
    readonly theme: PropType<import("../../_mixins").Theme<"Progress", {
        fontSize: string;
        fontSizeCircle: string;
        fontWeightCircle: string;
        railColor: string;
        railHeight: string;
        iconSizeCircle: string;
        iconSizeLine: string;
        iconColor: string;
        iconColorInfo: string;
        iconColorSuccess: string;
        iconColorWarning: string;
        iconColorError: string;
        textColorCircle: string;
        textColorLineInner: string;
        textColorLineOuter: string;
        fillColor: string;
        fillColorInfo: string;
        fillColorSuccess: string;
        fillColorWarning: string;
        fillColorError: string;
        lineBgProcessing: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Progress", {
        fontSize: string;
        fontSizeCircle: string;
        fontWeightCircle: string;
        railColor: string;
        railHeight: string;
        iconSizeCircle: string;
        iconSizeLine: string;
        iconColor: string;
        iconColorInfo: string;
        iconColorSuccess: string;
        iconColorWarning: string;
        iconColorError: string;
        textColorCircle: string;
        textColorLineInner: string;
        textColorLineOuter: string;
        fillColor: string;
        fillColorInfo: string;
        fillColorSuccess: string;
        fillColorWarning: string;
        fillColorError: string;
        lineBgProcessing: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Progress", {
        fontSize: string;
        fontSizeCircle: string;
        fontWeightCircle: string;
        railColor: string;
        railHeight: string;
        iconSizeCircle: string;
        iconSizeLine: string;
        iconColor: string;
        iconColorInfo: string;
        iconColorSuccess: string;
        iconColorWarning: string;
        iconColorError: string;
        textColorCircle: string;
        textColorLineInner: string;
        textColorLineOuter: string;
        fillColor: string;
        fillColorInfo: string;
        fillColorSuccess: string;
        fillColorWarning: string;
        fillColorError: string;
        lineBgProcessing: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly type: "circle" | "line" | "multiple-circle" | "dashboard";
    readonly status: ProgressStatus;
    readonly processing: boolean;
    readonly strokeWidth: number;
    readonly unit: string;
    readonly viewBoxWidth: number;
    readonly showIndicator: boolean;
    readonly indicatorPosition: "inside" | "outside";
    readonly indicatorPlacement: "inside" | "outside";
    readonly circleGap: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
