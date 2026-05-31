import type { CSSProperties, PropType, SlotsType, VNode } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const thingProps: {
    title: StringConstructor;
    titleExtra: StringConstructor;
    description: StringConstructor;
    descriptionClass: StringConstructor;
    descriptionStyle: PropType<string | CSSProperties>;
    content: StringConstructor;
    contentClass: StringConstructor;
    contentStyle: PropType<string | CSSProperties>;
    contentIndented: BooleanConstructor;
    theme: PropType<import("../../_mixins").Theme<"Thing", {
        fontSize: string;
        titleTextColor: string;
        textColor: string;
        titleFontWeight: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Thing", {
        fontSize: string;
        titleTextColor: string;
        textColor: string;
        titleFontWeight: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Thing", {
        fontSize: string;
        titleTextColor: string;
        textColor: string;
        titleFontWeight: string;
    }, any>>>;
};
export type ThingProps = ExtractPublicPropTypes<typeof thingProps>;
export interface ThingSlots {
    action?: () => VNode[];
    avatar?: () => VNode[];
    default?: () => VNode[];
    description?: () => VNode[];
    footer?: () => VNode[];
    'header-extra'?: () => VNode[];
    header?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    titleExtra: StringConstructor;
    description: StringConstructor;
    descriptionClass: StringConstructor;
    descriptionStyle: PropType<string | CSSProperties>;
    content: StringConstructor;
    contentClass: StringConstructor;
    contentStyle: PropType<string | CSSProperties>;
    contentIndented: BooleanConstructor;
    theme: PropType<import("../../_mixins").Theme<"Thing", {
        fontSize: string;
        titleTextColor: string;
        textColor: string;
        titleFontWeight: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Thing", {
        fontSize: string;
        titleTextColor: string;
        textColor: string;
        titleFontWeight: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Thing", {
        fontSize: string;
        titleTextColor: string;
        textColor: string;
        titleFontWeight: string;
    }, any>>>;
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    titleExtra: StringConstructor;
    description: StringConstructor;
    descriptionClass: StringConstructor;
    descriptionStyle: PropType<string | CSSProperties>;
    content: StringConstructor;
    contentClass: StringConstructor;
    contentStyle: PropType<string | CSSProperties>;
    contentIndented: BooleanConstructor;
    theme: PropType<import("../../_mixins").Theme<"Thing", {
        fontSize: string;
        titleTextColor: string;
        textColor: string;
        titleFontWeight: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Thing", {
        fontSize: string;
        titleTextColor: string;
        textColor: string;
        titleFontWeight: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Thing", {
        fontSize: string;
        titleTextColor: string;
        textColor: string;
        titleFontWeight: string;
    }, any>>>;
}>> & Readonly<{}>, {
    contentIndented: boolean;
}, SlotsType<ThingSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
