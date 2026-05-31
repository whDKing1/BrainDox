import type { CSSProperties, PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { SpaceSize } from './public-types';
type Align = 'stretch' | 'baseline' | 'start' | 'end' | 'center' | 'flex-end' | 'flex-start';
export type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
export declare const spaceProps: {
    readonly align: PropType<Align>;
    readonly justify: {
        readonly type: PropType<Justify>;
        readonly default: "start";
    };
    readonly inline: BooleanConstructor;
    readonly vertical: BooleanConstructor;
    readonly reverse: BooleanConstructor;
    readonly size: PropType<SpaceSize>;
    readonly wrapItem: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly itemClass: StringConstructor;
    readonly itemStyle: PropType<string | CSSProperties>;
    readonly wrap: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly internalUseGap: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Space", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Space", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Space", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>>;
};
export type SpaceProps = ExtractPublicPropTypes<typeof spaceProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly align: PropType<Align>;
    readonly justify: {
        readonly type: PropType<Justify>;
        readonly default: "start";
    };
    readonly inline: BooleanConstructor;
    readonly vertical: BooleanConstructor;
    readonly reverse: BooleanConstructor;
    readonly size: PropType<SpaceSize>;
    readonly wrapItem: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly itemClass: StringConstructor;
    readonly itemStyle: PropType<string | CSSProperties>;
    readonly wrap: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly internalUseGap: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Space", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Space", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Space", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>>;
}>, {
    useGap: boolean;
    rtlEnabled: import("vue").Ref<import("../../config-provider/src/internal-interface").RtlItem | undefined, import("../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    mergedClsPrefix: import("vue").Ref<string, string>;
    margin: import("vue").ComputedRef<{
        horizontal: number;
        vertical: number;
    }>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly align: PropType<Align>;
    readonly justify: {
        readonly type: PropType<Justify>;
        readonly default: "start";
    };
    readonly inline: BooleanConstructor;
    readonly vertical: BooleanConstructor;
    readonly reverse: BooleanConstructor;
    readonly size: PropType<SpaceSize>;
    readonly wrapItem: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly itemClass: StringConstructor;
    readonly itemStyle: PropType<string | CSSProperties>;
    readonly wrap: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly internalUseGap: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Space", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Space", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Space", {
        gapSmall: string;
        gapMedium: string;
        gapLarge: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly reverse: boolean;
    readonly vertical: boolean;
    readonly inline: boolean;
    readonly justify: Justify;
    readonly wrap: boolean;
    readonly wrapItem: boolean;
    readonly internalUseGap: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
