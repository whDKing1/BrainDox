import type { Component, PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export type Depth = 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5' | undefined;
export declare const iconProps: {
    readonly depth: PropType<Depth>;
    readonly size: PropType<number | string>;
    readonly color: StringConstructor;
    readonly component: PropType<Component>;
    readonly theme: PropType<import("../../_mixins").Theme<"Icon", {
        color: string;
        opacity1Depth: string;
        opacity2Depth: string;
        opacity3Depth: string;
        opacity4Depth: string;
        opacity5Depth: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Icon", {
        color: string;
        opacity1Depth: string;
        opacity2Depth: string;
        opacity3Depth: string;
        opacity4Depth: string;
        opacity5Depth: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Icon", {
        color: string;
        opacity1Depth: string;
        opacity2Depth: string;
        opacity3Depth: string;
        opacity4Depth: string;
        opacity5Depth: string;
    }, any>>>;
};
export type IconProps = ExtractPublicPropTypes<typeof iconProps>;
export declare const NIcon: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly depth: PropType<Depth>;
    readonly size: PropType<number | string>;
    readonly color: StringConstructor;
    readonly component: PropType<Component>;
    readonly theme: PropType<import("../../_mixins").Theme<"Icon", {
        color: string;
        opacity1Depth: string;
        opacity2Depth: string;
        opacity3Depth: string;
        opacity4Depth: string;
        opacity5Depth: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Icon", {
        color: string;
        opacity1Depth: string;
        opacity2Depth: string;
        opacity3Depth: string;
        opacity4Depth: string;
        opacity5Depth: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Icon", {
        color: string;
        opacity1Depth: string;
        opacity2Depth: string;
        opacity3Depth: string;
        opacity4Depth: string;
        opacity5Depth: string;
    }, any>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    mergedStyle: import("vue").ComputedRef<{
        fontSize: string | undefined;
        color: string | undefined;
    }>;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-color': string;
        '--n-opacity': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly depth: PropType<Depth>;
    readonly size: PropType<number | string>;
    readonly color: StringConstructor;
    readonly component: PropType<Component>;
    readonly theme: PropType<import("../../_mixins").Theme<"Icon", {
        color: string;
        opacity1Depth: string;
        opacity2Depth: string;
        opacity3Depth: string;
        opacity4Depth: string;
        opacity5Depth: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Icon", {
        color: string;
        opacity1Depth: string;
        opacity2Depth: string;
        opacity3Depth: string;
        opacity4Depth: string;
        opacity5Depth: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Icon", {
        color: string;
        opacity1Depth: string;
        opacity2Depth: string;
        opacity3Depth: string;
        opacity4Depth: string;
        opacity5Depth: string;
    }, any>>>;
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
