import type { PropType, Ref, SlotsType, VNode } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const listProps: {
    size: {
        type: PropType<"small" | "medium" | "large">;
        default: string;
    };
    bordered: BooleanConstructor;
    clickable: BooleanConstructor;
    hoverable: BooleanConstructor;
    showDivider: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: PropType<import("../../_mixins").Theme<"List", {
        textColor: string;
        color: string;
        colorHover: string;
        colorModal: string;
        colorHoverModal: string;
        colorPopover: string;
        colorHoverPopover: string;
        borderColor: string;
        borderColorModal: string;
        borderColorPopover: string;
        borderRadius: string;
        fontSize: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"List", {
        textColor: string;
        color: string;
        colorHover: string;
        colorModal: string;
        colorHoverModal: string;
        colorPopover: string;
        colorHoverPopover: string;
        borderColor: string;
        borderColorModal: string;
        borderColorPopover: string;
        borderRadius: string;
        fontSize: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"List", {
        textColor: string;
        color: string;
        colorHover: string;
        colorModal: string;
        colorHoverModal: string;
        colorPopover: string;
        colorHoverPopover: string;
        borderColor: string;
        borderColorModal: string;
        borderColorPopover: string;
        borderRadius: string;
        fontSize: string;
    }, any>>>;
};
export type ListProps = ExtractPublicPropTypes<typeof listProps>;
export interface ListSlots {
    default?: () => VNode[];
    footer?: () => VNode[];
    header?: () => VNode[];
}
interface ListInjection {
    showDividerRef: Ref<boolean>;
    mergedClsPrefixRef: Ref<string>;
}
export declare const listInjectionKey: import("vue").InjectionKey<ListInjection>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    size: {
        type: PropType<"small" | "medium" | "large">;
        default: string;
    };
    bordered: BooleanConstructor;
    clickable: BooleanConstructor;
    hoverable: BooleanConstructor;
    showDivider: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: PropType<import("../../_mixins").Theme<"List", {
        textColor: string;
        color: string;
        colorHover: string;
        colorModal: string;
        colorHoverModal: string;
        colorPopover: string;
        colorHoverPopover: string;
        borderColor: string;
        borderColorModal: string;
        borderColorPopover: string;
        borderRadius: string;
        fontSize: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"List", {
        textColor: string;
        color: string;
        colorHover: string;
        colorModal: string;
        colorHoverModal: string;
        colorPopover: string;
        colorHoverPopover: string;
        borderColor: string;
        borderColorModal: string;
        borderColorPopover: string;
        borderRadius: string;
        fontSize: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"List", {
        textColor: string;
        color: string;
        colorHover: string;
        colorModal: string;
        colorHoverModal: string;
        colorPopover: string;
        colorHoverPopover: string;
        borderColor: string;
        borderColorModal: string;
        borderColorPopover: string;
        borderRadius: string;
        fontSize: string;
    }, any>>>;
}>, {
    mergedClsPrefix: Ref<string, string>;
    rtlEnabled: Ref<import("../../config-provider/src/internal-interface").RtlItem | undefined, import("../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    cssVars: import("vue").ComputedRef<{
        '--n-font-size': string;
        '--n-bezier': string;
        '--n-text-color': string;
        '--n-color': string;
        '--n-border-radius': string;
        '--n-border-color': string;
        '--n-border-color-modal': string;
        '--n-border-color-popover': string;
        '--n-color-modal': string;
        '--n-color-popover': string;
        '--n-color-hover': string;
        '--n-color-hover-modal': string;
        '--n-color-hover-popover': string;
    }> | undefined;
    themeClass: Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    size: {
        type: PropType<"small" | "medium" | "large">;
        default: string;
    };
    bordered: BooleanConstructor;
    clickable: BooleanConstructor;
    hoverable: BooleanConstructor;
    showDivider: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: PropType<import("../../_mixins").Theme<"List", {
        textColor: string;
        color: string;
        colorHover: string;
        colorModal: string;
        colorHoverModal: string;
        colorPopover: string;
        colorHoverPopover: string;
        borderColor: string;
        borderColorModal: string;
        borderColorPopover: string;
        borderRadius: string;
        fontSize: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"List", {
        textColor: string;
        color: string;
        colorHover: string;
        colorModal: string;
        colorHoverModal: string;
        colorPopover: string;
        colorHoverPopover: string;
        borderColor: string;
        borderColorModal: string;
        borderColorPopover: string;
        borderRadius: string;
        fontSize: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"List", {
        textColor: string;
        color: string;
        colorHover: string;
        colorModal: string;
        colorHoverModal: string;
        colorPopover: string;
        colorHoverPopover: string;
        borderColor: string;
        borderColorModal: string;
        borderColorPopover: string;
        borderRadius: string;
        fontSize: string;
    }, any>>>;
}>> & Readonly<{}>, {
    size: "small" | "medium" | "large";
    bordered: boolean;
    clickable: boolean;
    hoverable: boolean;
    showDivider: boolean;
}, SlotsType<ListSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
