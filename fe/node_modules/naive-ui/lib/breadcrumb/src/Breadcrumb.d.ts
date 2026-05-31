import type { Ref } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export interface BreadcrumbInjection {
    separatorRef: Ref<string>;
    mergedClsPrefixRef: Ref<string>;
}
export declare const breadcrumbInjectionKey: import("vue").InjectionKey<BreadcrumbInjection>;
export declare const breadcrumbProps: {
    readonly separator: {
        readonly type: StringConstructor;
        readonly default: "/";
    };
    readonly theme: import("vue").PropType<import("../../_mixins").Theme<"Breadcrumb", {
        fontSize: string;
        itemLineHeight: string;
        itemTextColor: string;
        itemTextColorHover: string;
        itemTextColorPressed: string;
        itemTextColorActive: string;
        itemBorderRadius: string;
        itemColorHover: string;
        itemColorPressed: string;
        separatorColor: string;
        fontWeightActive: string;
    }, any>>;
    readonly themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Breadcrumb", {
        fontSize: string;
        itemLineHeight: string;
        itemTextColor: string;
        itemTextColorHover: string;
        itemTextColorPressed: string;
        itemTextColorActive: string;
        itemBorderRadius: string;
        itemColorHover: string;
        itemColorPressed: string;
        separatorColor: string;
        fontWeightActive: string;
    }, any>>>;
    readonly builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Breadcrumb", {
        fontSize: string;
        itemLineHeight: string;
        itemTextColor: string;
        itemTextColorHover: string;
        itemTextColorPressed: string;
        itemTextColorActive: string;
        itemBorderRadius: string;
        itemColorHover: string;
        itemColorPressed: string;
        separatorColor: string;
        fontWeightActive: string;
    }, any>>>;
};
export type BreadcrumbProps = ExtractPublicPropTypes<typeof breadcrumbProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly separator: {
        readonly type: StringConstructor;
        readonly default: "/";
    };
    readonly theme: import("vue").PropType<import("../../_mixins").Theme<"Breadcrumb", {
        fontSize: string;
        itemLineHeight: string;
        itemTextColor: string;
        itemTextColorHover: string;
        itemTextColorPressed: string;
        itemTextColorActive: string;
        itemBorderRadius: string;
        itemColorHover: string;
        itemColorPressed: string;
        separatorColor: string;
        fontWeightActive: string;
    }, any>>;
    readonly themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Breadcrumb", {
        fontSize: string;
        itemLineHeight: string;
        itemTextColor: string;
        itemTextColorHover: string;
        itemTextColorPressed: string;
        itemTextColorActive: string;
        itemBorderRadius: string;
        itemColorHover: string;
        itemColorPressed: string;
        separatorColor: string;
        fontWeightActive: string;
    }, any>>>;
    readonly builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Breadcrumb", {
        fontSize: string;
        itemLineHeight: string;
        itemTextColor: string;
        itemTextColorHover: string;
        itemTextColorPressed: string;
        itemTextColorActive: string;
        itemBorderRadius: string;
        itemColorHover: string;
        itemColorPressed: string;
        separatorColor: string;
        fontWeightActive: string;
    }, any>>>;
}>, {
    mergedClsPrefix: Ref<string, string>;
    cssVars: import("vue").ComputedRef<{
        '--n-font-size': string;
        '--n-bezier': string;
        '--n-item-text-color': string;
        '--n-item-text-color-hover': string;
        '--n-item-text-color-pressed': string;
        '--n-item-text-color-active': string;
        '--n-separator-color': string;
        '--n-item-color-hover': string;
        '--n-item-color-pressed': string;
        '--n-item-border-radius': string;
        '--n-font-weight-active': string;
        '--n-item-line-height': string;
    }> | undefined;
    themeClass: Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly separator: {
        readonly type: StringConstructor;
        readonly default: "/";
    };
    readonly theme: import("vue").PropType<import("../../_mixins").Theme<"Breadcrumb", {
        fontSize: string;
        itemLineHeight: string;
        itemTextColor: string;
        itemTextColorHover: string;
        itemTextColorPressed: string;
        itemTextColorActive: string;
        itemBorderRadius: string;
        itemColorHover: string;
        itemColorPressed: string;
        separatorColor: string;
        fontWeightActive: string;
    }, any>>;
    readonly themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Breadcrumb", {
        fontSize: string;
        itemLineHeight: string;
        itemTextColor: string;
        itemTextColorHover: string;
        itemTextColorPressed: string;
        itemTextColorActive: string;
        itemBorderRadius: string;
        itemColorHover: string;
        itemColorPressed: string;
        separatorColor: string;
        fontWeightActive: string;
    }, any>>>;
    readonly builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Breadcrumb", {
        fontSize: string;
        itemLineHeight: string;
        itemTextColor: string;
        itemTextColorHover: string;
        itemTextColorPressed: string;
        itemTextColorActive: string;
        itemBorderRadius: string;
        itemColorHover: string;
        itemColorPressed: string;
        separatorColor: string;
        fontWeightActive: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly separator: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
