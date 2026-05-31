import type { PropType, SlotsType, VNode, VNodeChild } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const emptyProps: {
    description: StringConstructor;
    showDescription: {
        type: BooleanConstructor;
        default: boolean;
    };
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<"tiny" | "small" | "medium" | "large" | "huge">;
        default: string;
    };
    renderIcon: PropType<() => VNodeChild>;
    theme: PropType<import("../../_mixins").Theme<"Empty", {
        fontSizeTiny: string;
        fontSizeSmall: string;
        fontSizeMedium: string;
        fontSizeLarge: string;
        fontSizeHuge: string;
        textColor: string;
        iconColor: string;
        extraTextColor: string;
        iconSizeTiny: string;
        iconSizeSmall: string;
        iconSizeMedium: string;
        iconSizeLarge: string;
        iconSizeHuge: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Empty", {
        fontSizeTiny: string;
        fontSizeSmall: string;
        fontSizeMedium: string;
        fontSizeLarge: string;
        fontSizeHuge: string;
        textColor: string;
        iconColor: string;
        extraTextColor: string;
        iconSizeTiny: string;
        iconSizeSmall: string;
        iconSizeMedium: string;
        iconSizeLarge: string;
        iconSizeHuge: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Empty", {
        fontSizeTiny: string;
        fontSizeSmall: string;
        fontSizeMedium: string;
        fontSizeLarge: string;
        fontSizeHuge: string;
        textColor: string;
        iconColor: string;
        extraTextColor: string;
        iconSizeTiny: string;
        iconSizeSmall: string;
        iconSizeMedium: string;
        iconSizeLarge: string;
        iconSizeHuge: string;
    }, any>>>;
};
export type EmptyProps = ExtractPublicPropTypes<typeof emptyProps>;
export interface EmptySlots {
    default?: () => VNode[];
    extra?: () => VNode[];
    icon?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    description: StringConstructor;
    showDescription: {
        type: BooleanConstructor;
        default: boolean;
    };
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<"tiny" | "small" | "medium" | "large" | "huge">;
        default: string;
    };
    renderIcon: PropType<() => VNodeChild>;
    theme: PropType<import("../../_mixins").Theme<"Empty", {
        fontSizeTiny: string;
        fontSizeSmall: string;
        fontSizeMedium: string;
        fontSizeLarge: string;
        fontSizeHuge: string;
        textColor: string;
        iconColor: string;
        extraTextColor: string;
        iconSizeTiny: string;
        iconSizeSmall: string;
        iconSizeMedium: string;
        iconSizeLarge: string;
        iconSizeHuge: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Empty", {
        fontSizeTiny: string;
        fontSizeSmall: string;
        fontSizeMedium: string;
        fontSizeLarge: string;
        fontSizeHuge: string;
        textColor: string;
        iconColor: string;
        extraTextColor: string;
        iconSizeTiny: string;
        iconSizeSmall: string;
        iconSizeMedium: string;
        iconSizeLarge: string;
        iconSizeHuge: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Empty", {
        fontSizeTiny: string;
        fontSizeSmall: string;
        fontSizeMedium: string;
        fontSizeLarge: string;
        fontSizeHuge: string;
        textColor: string;
        iconColor: string;
        extraTextColor: string;
        iconSizeTiny: string;
        iconSizeSmall: string;
        iconSizeMedium: string;
        iconSizeLarge: string;
        iconSizeHuge: string;
    }, any>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    mergedRenderIcon: import("vue").ComputedRef<() => VNodeChild>;
    localizedDescription: import("vue").ComputedRef<string>;
    cssVars: import("vue").ComputedRef<{
        '--n-icon-size': string;
        '--n-font-size': string;
        '--n-bezier': string;
        '--n-text-color': string;
        '--n-icon-color': string;
        '--n-extra-text-color': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    description: StringConstructor;
    showDescription: {
        type: BooleanConstructor;
        default: boolean;
    };
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<"tiny" | "small" | "medium" | "large" | "huge">;
        default: string;
    };
    renderIcon: PropType<() => VNodeChild>;
    theme: PropType<import("../../_mixins").Theme<"Empty", {
        fontSizeTiny: string;
        fontSizeSmall: string;
        fontSizeMedium: string;
        fontSizeLarge: string;
        fontSizeHuge: string;
        textColor: string;
        iconColor: string;
        extraTextColor: string;
        iconSizeTiny: string;
        iconSizeSmall: string;
        iconSizeMedium: string;
        iconSizeLarge: string;
        iconSizeHuge: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Empty", {
        fontSizeTiny: string;
        fontSizeSmall: string;
        fontSizeMedium: string;
        fontSizeLarge: string;
        fontSizeHuge: string;
        textColor: string;
        iconColor: string;
        extraTextColor: string;
        iconSizeTiny: string;
        iconSizeSmall: string;
        iconSizeMedium: string;
        iconSizeLarge: string;
        iconSizeHuge: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Empty", {
        fontSizeTiny: string;
        fontSizeSmall: string;
        fontSizeMedium: string;
        fontSizeLarge: string;
        fontSizeHuge: string;
        textColor: string;
        iconColor: string;
        extraTextColor: string;
        iconSizeTiny: string;
        iconSizeSmall: string;
        iconSizeMedium: string;
        iconSizeLarge: string;
        iconSizeHuge: string;
    }, any>>>;
}>> & Readonly<{}>, {
    size: "tiny" | "small" | "medium" | "large" | "huge";
    showIcon: boolean;
    showDescription: boolean;
}, SlotsType<EmptySlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
