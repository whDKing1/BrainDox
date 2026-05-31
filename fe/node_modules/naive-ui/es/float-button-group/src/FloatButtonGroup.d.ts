import type { PropType, Ref } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export interface ButtonGroupInjection {
    shapeRef: Ref<'circle' | 'square'>;
}
export declare const floatButtonGroupProps: {
    readonly left: PropType<string | number>;
    readonly right: PropType<string | number>;
    readonly top: PropType<string | number>;
    readonly bottom: PropType<string | number>;
    readonly shape: {
        readonly type: PropType<"square" | "circle">;
        readonly default: "circle";
    };
    readonly position: {
        readonly type: PropType<"relative" | "absolute" | "fixed">;
        readonly default: "fixed";
    };
    readonly theme: PropType<import("../../_mixins").Theme<"FloatButtonGroup", {
        color: string;
        buttonBorderColor: string;
        borderRadiusSquare: string;
        boxShadow: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"FloatButtonGroup", {
        color: string;
        buttonBorderColor: string;
        borderRadiusSquare: string;
        boxShadow: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"FloatButtonGroup", {
        color: string;
        buttonBorderColor: string;
        borderRadiusSquare: string;
        boxShadow: string;
    }, any>>>;
};
export type FloatButtonGroupProps = ExtractPublicPropTypes<typeof floatButtonGroupProps>;
export declare const floatButtonGroupInjectionKey: import("vue").InjectionKey<ButtonGroupInjection>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly left: PropType<string | number>;
    readonly right: PropType<string | number>;
    readonly top: PropType<string | number>;
    readonly bottom: PropType<string | number>;
    readonly shape: {
        readonly type: PropType<"square" | "circle">;
        readonly default: "circle";
    };
    readonly position: {
        readonly type: PropType<"relative" | "absolute" | "fixed">;
        readonly default: "fixed";
    };
    readonly theme: PropType<import("../../_mixins").Theme<"FloatButtonGroup", {
        color: string;
        buttonBorderColor: string;
        borderRadiusSquare: string;
        boxShadow: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"FloatButtonGroup", {
        color: string;
        buttonBorderColor: string;
        borderRadiusSquare: string;
        boxShadow: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"FloatButtonGroup", {
        color: string;
        buttonBorderColor: string;
        borderRadiusSquare: string;
        boxShadow: string;
    }, any>>>;
}>, {
    cssVars: import("vue").ComputedRef<Record<string, string>> | undefined;
    mergedClsPrefix: Ref<string, string>;
    themeClass: Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly left: PropType<string | number>;
    readonly right: PropType<string | number>;
    readonly top: PropType<string | number>;
    readonly bottom: PropType<string | number>;
    readonly shape: {
        readonly type: PropType<"square" | "circle">;
        readonly default: "circle";
    };
    readonly position: {
        readonly type: PropType<"relative" | "absolute" | "fixed">;
        readonly default: "fixed";
    };
    readonly theme: PropType<import("../../_mixins").Theme<"FloatButtonGroup", {
        color: string;
        buttonBorderColor: string;
        borderRadiusSquare: string;
        boxShadow: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"FloatButtonGroup", {
        color: string;
        buttonBorderColor: string;
        borderRadiusSquare: string;
        boxShadow: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"FloatButtonGroup", {
        color: string;
        buttonBorderColor: string;
        borderRadiusSquare: string;
        boxShadow: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly position: "fixed" | "absolute" | "relative";
    readonly shape: "circle" | "square";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
