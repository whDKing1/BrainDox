import type { ExtractPublicPropTypes } from '../../_utils';
export declare const marqueeProps: {
    autoFill: BooleanConstructor;
    speed: {
        type: NumberConstructor;
        default: number;
    };
    theme: import("vue").PropType<import("../../_mixins").Theme<"Marquee", {}, any>>;
    themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Marquee", {}, any>>>;
    builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Marquee", {}, any>>>;
};
export type MarqueeProps = ExtractPublicPropTypes<typeof marqueeProps>;
