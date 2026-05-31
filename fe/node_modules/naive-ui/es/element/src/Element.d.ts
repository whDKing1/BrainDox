import type { ExtractPublicPropTypes } from '../../_utils';
export declare const elementProps: {
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly theme: import("vue").PropType<import("../../_mixins").Theme<"Element", Record<string, unknown>, any>>;
    readonly themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Element", Record<string, unknown>, any>>>;
    readonly builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Element", Record<string, unknown>, any>>>;
};
export type ElementProps = ExtractPublicPropTypes<typeof elementProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly theme: import("vue").PropType<import("../../_mixins").Theme<"Element", Record<string, unknown>, any>>;
    readonly themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Element", Record<string, unknown>, any>>>;
    readonly builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Element", Record<string, unknown>, any>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    cssVars: import("vue").ComputedRef<Record<string, string>> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly theme: import("vue").PropType<import("../../_mixins").Theme<"Element", Record<string, unknown>, any>>;
    readonly themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Element", Record<string, unknown>, any>>>;
    readonly builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Element", Record<string, unknown>, any>>>;
}>> & Readonly<{}>, {
    readonly tag: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
