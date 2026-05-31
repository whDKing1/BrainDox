import type { ExtractPublicPropTypes } from '../../_utils';
export declare const iconWrapperProps: {
    readonly size: {
        readonly type: NumberConstructor;
        readonly default: 24;
    };
    readonly borderRadius: {
        readonly type: NumberConstructor;
        readonly default: 6;
    };
    readonly color: StringConstructor;
    readonly iconColor: StringConstructor;
    readonly theme: import("vue").PropType<import("../../_mixins").Theme<"IconWrapper", {
        color: string;
        iconColor: string;
    }, any>>;
    readonly themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"IconWrapper", {
        color: string;
        iconColor: string;
    }, any>>>;
    readonly builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"IconWrapper", {
        color: string;
        iconColor: string;
    }, any>>>;
};
export type IconWrapperProps = ExtractPublicPropTypes<typeof iconWrapperProps>;
export declare const NIconWrapper: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly size: {
        readonly type: NumberConstructor;
        readonly default: 24;
    };
    readonly borderRadius: {
        readonly type: NumberConstructor;
        readonly default: 6;
    };
    readonly color: StringConstructor;
    readonly iconColor: StringConstructor;
    readonly theme: import("vue").PropType<import("../../_mixins").Theme<"IconWrapper", {
        color: string;
        iconColor: string;
    }, any>>;
    readonly themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"IconWrapper", {
        color: string;
        iconColor: string;
    }, any>>>;
    readonly builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"IconWrapper", {
        color: string;
        iconColor: string;
    }, any>>>;
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly size: {
        readonly type: NumberConstructor;
        readonly default: 24;
    };
    readonly borderRadius: {
        readonly type: NumberConstructor;
        readonly default: 6;
    };
    readonly color: StringConstructor;
    readonly iconColor: StringConstructor;
    readonly theme: import("vue").PropType<import("../../_mixins").Theme<"IconWrapper", {
        color: string;
        iconColor: string;
    }, any>>;
    readonly themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"IconWrapper", {
        color: string;
        iconColor: string;
    }, any>>>;
    readonly builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"IconWrapper", {
        color: string;
        iconColor: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly borderRadius: number;
    readonly size: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
