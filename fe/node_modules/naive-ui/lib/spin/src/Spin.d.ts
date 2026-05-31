import type { CSSProperties, PropType, SlotsType, VNode } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const spinProps: {
    strokeWidth: {
        type: NumberConstructor;
        default: number;
    };
    stroke: {
        type: StringConstructor;
        default: undefined;
    };
    scale: {
        type: NumberConstructor;
        default: number;
    };
    radius: {
        type: NumberConstructor;
        default: number;
    };
    contentClass: StringConstructor;
    contentStyle: PropType<CSSProperties | string>;
    description: StringConstructor;
    size: {
        type: PropType<"small" | "medium" | "large" | number>;
        default: string;
    };
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    rotate: {
        type: BooleanConstructor;
        default: boolean;
    };
    spinning: {
        type: BooleanConstructor;
        validator: () => boolean;
        default: undefined;
    };
    delay: NumberConstructor;
    theme: PropType<import("../../_mixins").Theme<"Spin", {
        fontSize: string;
        textColor: string;
        sizeTiny: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
        sizeHuge: string;
        color: string;
        opacitySpinning: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Spin", {
        fontSize: string;
        textColor: string;
        sizeTiny: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
        sizeHuge: string;
        color: string;
        opacitySpinning: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Spin", {
        fontSize: string;
        textColor: string;
        sizeTiny: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
        sizeHuge: string;
        color: string;
        opacitySpinning: string;
    }, any>>>;
};
export type SpinProps = ExtractPublicPropTypes<typeof spinProps>;
export interface SpinSlots {
    default?: () => VNode[];
    description?: () => VNode[];
    icon?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    strokeWidth: {
        type: NumberConstructor;
        default: number;
    };
    stroke: {
        type: StringConstructor;
        default: undefined;
    };
    scale: {
        type: NumberConstructor;
        default: number;
    };
    radius: {
        type: NumberConstructor;
        default: number;
    };
    contentClass: StringConstructor;
    contentStyle: PropType<CSSProperties | string>;
    description: StringConstructor;
    size: {
        type: PropType<"small" | "medium" | "large" | number>;
        default: string;
    };
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    rotate: {
        type: BooleanConstructor;
        default: boolean;
    };
    spinning: {
        type: BooleanConstructor;
        validator: () => boolean;
        default: undefined;
    };
    delay: NumberConstructor;
    theme: PropType<import("../../_mixins").Theme<"Spin", {
        fontSize: string;
        textColor: string;
        sizeTiny: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
        sizeHuge: string;
        color: string;
        opacitySpinning: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Spin", {
        fontSize: string;
        textColor: string;
        sizeTiny: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
        sizeHuge: string;
        color: string;
        opacitySpinning: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Spin", {
        fontSize: string;
        textColor: string;
        sizeTiny: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
        sizeHuge: string;
        color: string;
        opacitySpinning: string;
    }, any>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    active: import("vue").Ref<boolean, boolean>;
    mergedStrokeWidth: import("vue").ComputedRef<number>;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-opacity-spinning': string;
        '--n-size': string;
        '--n-color': string;
        '--n-text-color': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    strokeWidth: {
        type: NumberConstructor;
        default: number;
    };
    stroke: {
        type: StringConstructor;
        default: undefined;
    };
    scale: {
        type: NumberConstructor;
        default: number;
    };
    radius: {
        type: NumberConstructor;
        default: number;
    };
    contentClass: StringConstructor;
    contentStyle: PropType<CSSProperties | string>;
    description: StringConstructor;
    size: {
        type: PropType<"small" | "medium" | "large" | number>;
        default: string;
    };
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    rotate: {
        type: BooleanConstructor;
        default: boolean;
    };
    spinning: {
        type: BooleanConstructor;
        validator: () => boolean;
        default: undefined;
    };
    delay: NumberConstructor;
    theme: PropType<import("../../_mixins").Theme<"Spin", {
        fontSize: string;
        textColor: string;
        sizeTiny: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
        sizeHuge: string;
        color: string;
        opacitySpinning: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Spin", {
        fontSize: string;
        textColor: string;
        sizeTiny: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
        sizeHuge: string;
        color: string;
        opacitySpinning: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Spin", {
        fontSize: string;
        textColor: string;
        sizeTiny: string;
        sizeSmall: string;
        sizeMedium: string;
        sizeLarge: string;
        sizeHuge: string;
        color: string;
        opacitySpinning: string;
    }, any>>>;
}>> & Readonly<{}>, {
    size: number | "small" | "medium" | "large";
    show: boolean;
    stroke: string;
    strokeWidth: number;
    scale: number;
    radius: number;
    rotate: boolean;
    spinning: boolean;
}, SlotsType<SpinSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
