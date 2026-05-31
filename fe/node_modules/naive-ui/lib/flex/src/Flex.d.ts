import type { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { FlexAlign, FlexJustify } from './type';
export declare const flexProps: {
    readonly align: PropType<FlexAlign>;
    readonly justify: {
        readonly type: PropType<FlexJustify>;
        readonly default: "start";
    };
    readonly inline: BooleanConstructor;
    readonly vertical: BooleanConstructor;
    readonly reverse: BooleanConstructor;
    readonly size: {
        readonly type: PropType<"small" | "medium" | "large" | number | [number, number]>;
        readonly default: "medium";
    };
    readonly wrap: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Flex", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Flex", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Flex", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>>;
};
export type FlexProps = ExtractPublicPropTypes<typeof flexProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly align: PropType<FlexAlign>;
    readonly justify: {
        readonly type: PropType<FlexJustify>;
        readonly default: "start";
    };
    readonly inline: BooleanConstructor;
    readonly vertical: BooleanConstructor;
    readonly reverse: BooleanConstructor;
    readonly size: {
        readonly type: PropType<"small" | "medium" | "large" | number | [number, number]>;
        readonly default: "medium";
    };
    readonly wrap: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Flex", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Flex", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Flex", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>>;
}>, {
    rtlEnabled: import("vue").Ref<import("../../config-provider/src/internal-interface").RtlItem | undefined, import("../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    mergedClsPrefix: import("vue").Ref<string, string>;
    margin: import("vue").ComputedRef<{
        horizontal: number;
        vertical: number;
    }>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly align: PropType<FlexAlign>;
    readonly justify: {
        readonly type: PropType<FlexJustify>;
        readonly default: "start";
    };
    readonly inline: BooleanConstructor;
    readonly vertical: BooleanConstructor;
    readonly reverse: BooleanConstructor;
    readonly size: {
        readonly type: PropType<"small" | "medium" | "large" | number | [number, number]>;
        readonly default: "medium";
    };
    readonly wrap: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Flex", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Flex", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Flex", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly reverse: boolean;
    readonly size: number | "small" | "medium" | "large" | [number, number];
    readonly vertical: boolean;
    readonly inline: boolean;
    readonly justify: import("csstype").Property.JustifyContent;
    readonly wrap: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
