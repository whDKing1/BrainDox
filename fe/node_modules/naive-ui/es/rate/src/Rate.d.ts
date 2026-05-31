import type { PropType } from 'vue';
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils';
import type { RateOnUpdateValue } from './interface';
import type { RateSize } from './public-types';
export declare const rateProps: {
    readonly allowHalf: BooleanConstructor;
    readonly count: {
        readonly type: NumberConstructor;
        readonly default: 5;
    };
    readonly value: NumberConstructor;
    readonly defaultValue: {
        readonly type: PropType<number | null>;
        readonly default: null;
    };
    readonly readonly: BooleanConstructor;
    readonly size: PropType<RateSize>;
    readonly clearable: BooleanConstructor;
    readonly color: StringConstructor;
    readonly onClear: PropType<() => void>;
    readonly 'onUpdate:value': PropType<MaybeArray<RateOnUpdateValue>>;
    readonly onUpdateValue: PropType<MaybeArray<RateOnUpdateValue>>;
    readonly theme: PropType<import("../../_mixins").Theme<"Rate", {
        itemColor: string;
        itemColorActive: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Rate", {
        itemColor: string;
        itemColorActive: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Rate", {
        itemColor: string;
        itemColorActive: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
    }, any>>>;
};
export type RateProps = ExtractPublicPropTypes<typeof rateProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly allowHalf: BooleanConstructor;
    readonly count: {
        readonly type: NumberConstructor;
        readonly default: 5;
    };
    readonly value: NumberConstructor;
    readonly defaultValue: {
        readonly type: PropType<number | null>;
        readonly default: null;
    };
    readonly readonly: BooleanConstructor;
    readonly size: PropType<RateSize>;
    readonly clearable: BooleanConstructor;
    readonly color: StringConstructor;
    readonly onClear: PropType<() => void>;
    readonly 'onUpdate:value': PropType<MaybeArray<RateOnUpdateValue>>;
    readonly onUpdateValue: PropType<MaybeArray<RateOnUpdateValue>>;
    readonly theme: PropType<import("../../_mixins").Theme<"Rate", {
        itemColor: string;
        itemColorActive: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Rate", {
        itemColor: string;
        itemColorActive: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Rate", {
        itemColor: string;
        itemColorActive: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
    }, any>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    mergedValue: import("vue").ComputedRef<number | null>;
    hoverIndex: import("vue").Ref<number | null, number | null>;
    handleMouseMove: (index: number, e: MouseEvent) => void;
    handleClick: (index: number, e: MouseEvent) => void;
    handleMouseLeave: () => void;
    handleMouseEnterSomeStar: () => void;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-item-color': string;
        '--n-item-color-active': string;
        '--n-item-size': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly allowHalf: BooleanConstructor;
    readonly count: {
        readonly type: NumberConstructor;
        readonly default: 5;
    };
    readonly value: NumberConstructor;
    readonly defaultValue: {
        readonly type: PropType<number | null>;
        readonly default: null;
    };
    readonly readonly: BooleanConstructor;
    readonly size: PropType<RateSize>;
    readonly clearable: BooleanConstructor;
    readonly color: StringConstructor;
    readonly onClear: PropType<() => void>;
    readonly 'onUpdate:value': PropType<MaybeArray<RateOnUpdateValue>>;
    readonly onUpdateValue: PropType<MaybeArray<RateOnUpdateValue>>;
    readonly theme: PropType<import("../../_mixins").Theme<"Rate", {
        itemColor: string;
        itemColorActive: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Rate", {
        itemColor: string;
        itemColorActive: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Rate", {
        itemColor: string;
        itemColorActive: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly clearable: boolean;
    readonly defaultValue: number | null;
    readonly readonly: boolean;
    readonly allowHalf: boolean;
    readonly count: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
