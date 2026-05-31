import type { PropType, SlotsType, VNode } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const pageHeaderProps: {
    title: StringConstructor;
    subtitle: StringConstructor;
    extra: StringConstructor;
    onBack: PropType<() => void>;
    theme: PropType<import("../../_mixins").Theme<"PageHeader", {
        titleFontWeight: string;
        fontSize: string;
        titleTextColor: string;
        backColor: string;
        backColorHover: string;
        backColorPressed: string;
        subtitleTextColor: string;
        titleFontSize: string;
        backSize: string;
    }, unknown>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"PageHeader", {
        titleFontWeight: string;
        fontSize: string;
        titleTextColor: string;
        backColor: string;
        backColorHover: string;
        backColorPressed: string;
        subtitleTextColor: string;
        titleFontSize: string;
        backSize: string;
    }, unknown>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"PageHeader", {
        titleFontWeight: string;
        fontSize: string;
        titleTextColor: string;
        backColor: string;
        backColorHover: string;
        backColorPressed: string;
        subtitleTextColor: string;
        titleFontSize: string;
        backSize: string;
    }, unknown>>>;
};
export type PageHeaderProps = ExtractPublicPropTypes<typeof pageHeaderProps>;
export interface PageHeaderSlots {
    avatar?: () => VNode[];
    header?: () => VNode[];
    default?: () => VNode[];
    extra?: () => VNode[];
    footer?: () => VNode[];
    subtitle?: () => VNode[];
    title?: () => VNode[];
    back?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    subtitle: StringConstructor;
    extra: StringConstructor;
    onBack: PropType<() => void>;
    theme: PropType<import("../../_mixins").Theme<"PageHeader", {
        titleFontWeight: string;
        fontSize: string;
        titleTextColor: string;
        backColor: string;
        backColorHover: string;
        backColorPressed: string;
        subtitleTextColor: string;
        titleFontSize: string;
        backSize: string;
    }, unknown>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"PageHeader", {
        titleFontWeight: string;
        fontSize: string;
        titleTextColor: string;
        backColor: string;
        backColorHover: string;
        backColorPressed: string;
        subtitleTextColor: string;
        titleFontSize: string;
        backSize: string;
    }, unknown>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"PageHeader", {
        titleFontWeight: string;
        fontSize: string;
        titleTextColor: string;
        backColor: string;
        backColorHover: string;
        backColorPressed: string;
        subtitleTextColor: string;
        titleFontSize: string;
        backSize: string;
    }, unknown>>>;
}>, {
    rtlEnabled: import("vue").Ref<import("../../config-provider/src/internal-interface").RtlItem | undefined, import("../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    mergedClsPrefix: import("vue").Ref<string, string>;
    cssVars: import("vue").ComputedRef<{
        '--n-title-text-color': string;
        '--n-title-font-size': string;
        '--n-title-font-weight': string;
        '--n-font-size': string;
        '--n-back-size': string;
        '--n-subtitle-text-color': string;
        '--n-back-color': string;
        '--n-back-color-hover': string;
        '--n-back-color-pressed': string;
        '--n-bezier': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    subtitle: StringConstructor;
    extra: StringConstructor;
    onBack: PropType<() => void>;
    theme: PropType<import("../../_mixins").Theme<"PageHeader", {
        titleFontWeight: string;
        fontSize: string;
        titleTextColor: string;
        backColor: string;
        backColorHover: string;
        backColorPressed: string;
        subtitleTextColor: string;
        titleFontSize: string;
        backSize: string;
    }, unknown>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"PageHeader", {
        titleFontWeight: string;
        fontSize: string;
        titleTextColor: string;
        backColor: string;
        backColorHover: string;
        backColorPressed: string;
        subtitleTextColor: string;
        titleFontSize: string;
        backSize: string;
    }, unknown>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"PageHeader", {
        titleFontWeight: string;
        fontSize: string;
        titleTextColor: string;
        backColor: string;
        backColorHover: string;
        backColorPressed: string;
        subtitleTextColor: string;
        titleFontSize: string;
        backSize: string;
    }, unknown>>>;
}>> & Readonly<{}>, {}, SlotsType<PageHeaderSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
