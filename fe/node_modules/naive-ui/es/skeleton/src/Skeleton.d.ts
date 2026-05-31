import type { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { SkeletonSize } from './public-types';
export declare const skeletonProps: {
    readonly text: BooleanConstructor;
    readonly round: BooleanConstructor;
    readonly circle: BooleanConstructor;
    readonly height: PropType<string | number>;
    readonly width: PropType<string | number>;
    readonly size: PropType<SkeletonSize>;
    readonly repeat: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly animated: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly sharp: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Skeleton", {
        color: string;
        colorEnd: string;
        borderRadius: string;
        heightSmall: string;
        heightMedium: string;
        heightLarge: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Skeleton", {
        color: string;
        colorEnd: string;
        borderRadius: string;
        heightSmall: string;
        heightMedium: string;
        heightLarge: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Skeleton", {
        color: string;
        colorEnd: string;
        borderRadius: string;
        heightSmall: string;
        heightMedium: string;
        heightLarge: string;
    }, any>>>;
};
export type SkeletonProps = ExtractPublicPropTypes<typeof skeletonProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly text: BooleanConstructor;
    readonly round: BooleanConstructor;
    readonly circle: BooleanConstructor;
    readonly height: PropType<string | number>;
    readonly width: PropType<string | number>;
    readonly size: PropType<SkeletonSize>;
    readonly repeat: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly animated: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly sharp: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Skeleton", {
        color: string;
        colorEnd: string;
        borderRadius: string;
        heightSmall: string;
        heightMedium: string;
        heightLarge: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Skeleton", {
        color: string;
        colorEnd: string;
        borderRadius: string;
        heightSmall: string;
        heightMedium: string;
        heightLarge: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Skeleton", {
        color: string;
        colorEnd: string;
        borderRadius: string;
        heightSmall: string;
        heightMedium: string;
        heightLarge: string;
    }, any>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    style: import("vue").ComputedRef<{
        display: string;
        verticalAlign: string;
        borderRadius: string;
        width: string | undefined;
        height: string | undefined;
        animation: string;
        '--n-bezier': string;
        '--n-color-start': string;
        '--n-color-end': string;
    }>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly text: BooleanConstructor;
    readonly round: BooleanConstructor;
    readonly circle: BooleanConstructor;
    readonly height: PropType<string | number>;
    readonly width: PropType<string | number>;
    readonly size: PropType<SkeletonSize>;
    readonly repeat: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly animated: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly sharp: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Skeleton", {
        color: string;
        colorEnd: string;
        borderRadius: string;
        heightSmall: string;
        heightMedium: string;
        heightLarge: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Skeleton", {
        color: string;
        colorEnd: string;
        borderRadius: string;
        heightSmall: string;
        heightMedium: string;
        heightLarge: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Skeleton", {
        color: string;
        colorEnd: string;
        borderRadius: string;
        heightSmall: string;
        heightMedium: string;
        heightLarge: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly circle: boolean;
    readonly round: boolean;
    readonly text: boolean;
    readonly repeat: number;
    readonly animated: boolean;
    readonly sharp: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
