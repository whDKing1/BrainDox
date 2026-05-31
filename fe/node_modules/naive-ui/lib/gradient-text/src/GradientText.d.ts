import type { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
type Gradient = string | {
    deg?: string | number;
    from: string;
    to: string;
};
export declare const gradientTextProps: {
    readonly size: PropType<string | number>;
    readonly fontSize: PropType<string | number>;
    readonly type: {
        readonly type: PropType<"info" | "success" | "warning" | "error" | "primary" | "danger">;
        readonly default: "primary";
    };
    readonly color: PropType<Gradient>;
    readonly gradient: PropType<Gradient>;
    readonly theme: PropType<import("../../_mixins").Theme<"GradientText", {
        fontWeight: string;
        rotate: string;
        colorStartPrimary: string;
        colorEndPrimary: string;
        colorStartInfo: string;
        colorEndInfo: string;
        colorStartWarning: string;
        colorEndWarning: string;
        colorStartError: string;
        colorEndError: string;
        colorStartSuccess: string;
        colorEndSuccess: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"GradientText", {
        fontWeight: string;
        rotate: string;
        colorStartPrimary: string;
        colorEndPrimary: string;
        colorStartInfo: string;
        colorEndInfo: string;
        colorStartWarning: string;
        colorEndWarning: string;
        colorStartError: string;
        colorEndError: string;
        colorStartSuccess: string;
        colorEndSuccess: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"GradientText", {
        fontWeight: string;
        rotate: string;
        colorStartPrimary: string;
        colorEndPrimary: string;
        colorStartInfo: string;
        colorEndInfo: string;
        colorStartWarning: string;
        colorEndWarning: string;
        colorStartError: string;
        colorEndError: string;
        colorStartSuccess: string;
        colorEndSuccess: string;
    }, any>>>;
};
export type GradientTextProps = ExtractPublicPropTypes<typeof gradientTextProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly size: PropType<string | number>;
    readonly fontSize: PropType<string | number>;
    readonly type: {
        readonly type: PropType<"info" | "success" | "warning" | "error" | "primary" | "danger">;
        readonly default: "primary";
    };
    readonly color: PropType<Gradient>;
    readonly gradient: PropType<Gradient>;
    readonly theme: PropType<import("../../_mixins").Theme<"GradientText", {
        fontWeight: string;
        rotate: string;
        colorStartPrimary: string;
        colorEndPrimary: string;
        colorStartInfo: string;
        colorEndInfo: string;
        colorStartWarning: string;
        colorEndWarning: string;
        colorStartError: string;
        colorEndError: string;
        colorStartSuccess: string;
        colorEndSuccess: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"GradientText", {
        fontWeight: string;
        rotate: string;
        colorStartPrimary: string;
        colorEndPrimary: string;
        colorStartInfo: string;
        colorEndInfo: string;
        colorStartWarning: string;
        colorEndWarning: string;
        colorStartError: string;
        colorEndError: string;
        colorStartSuccess: string;
        colorEndSuccess: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"GradientText", {
        fontWeight: string;
        rotate: string;
        colorStartPrimary: string;
        colorEndPrimary: string;
        colorStartInfo: string;
        colorEndInfo: string;
        colorStartWarning: string;
        colorEndWarning: string;
        colorStartError: string;
        colorEndError: string;
        colorStartSuccess: string;
        colorEndSuccess: string;
    }, any>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    compatibleType: import("vue").ComputedRef<"info" | "warning" | "error" | "success" | "primary">;
    styleFontSize: import("vue").ComputedRef<string | number | undefined>;
    styleBgImage: import("vue").ComputedRef<string | undefined>;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-rotate': string;
        '--n-color-start': string;
        '--n-color-end': string;
        '--n-font-weight': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly size: PropType<string | number>;
    readonly fontSize: PropType<string | number>;
    readonly type: {
        readonly type: PropType<"info" | "success" | "warning" | "error" | "primary" | "danger">;
        readonly default: "primary";
    };
    readonly color: PropType<Gradient>;
    readonly gradient: PropType<Gradient>;
    readonly theme: PropType<import("../../_mixins").Theme<"GradientText", {
        fontWeight: string;
        rotate: string;
        colorStartPrimary: string;
        colorEndPrimary: string;
        colorStartInfo: string;
        colorEndInfo: string;
        colorStartWarning: string;
        colorEndWarning: string;
        colorStartError: string;
        colorEndError: string;
        colorStartSuccess: string;
        colorEndSuccess: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"GradientText", {
        fontWeight: string;
        rotate: string;
        colorStartPrimary: string;
        colorEndPrimary: string;
        colorStartInfo: string;
        colorEndInfo: string;
        colorStartWarning: string;
        colorEndWarning: string;
        colorStartError: string;
        colorEndError: string;
        colorStartSuccess: string;
        colorEndSuccess: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"GradientText", {
        fontWeight: string;
        rotate: string;
        colorStartPrimary: string;
        colorEndPrimary: string;
        colorStartInfo: string;
        colorEndInfo: string;
        colorStartWarning: string;
        colorEndWarning: string;
        colorStartError: string;
        colorEndError: string;
        colorStartSuccess: string;
        colorEndSuccess: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly type: "info" | "warning" | "error" | "success" | "primary" | "danger";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
