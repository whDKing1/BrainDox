declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    autoFill: BooleanConstructor;
    speed: {
        type: NumberConstructor;
        default: number;
    };
    theme: import("vue").PropType<import("../../_mixins").Theme<"Marquee", {}, any>>;
    themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Marquee", {}, any>>>;
    builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Marquee", {}, any>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    animationCssVars: import("vue").ComputedRef<{
        '--n-play': "paused" | "running";
        '--n-direction': string;
        '--n-duration': string;
        '--n-delay': string;
        '--n-iteration-count': string;
        '--n-min-width': string;
    }>;
    containerElRef: import("vue").Ref<HTMLDivElement | null, HTMLDivElement | null>;
    repeatCountInOneGroup: import("vue").ComputedRef<number>;
    handleContainerResize: (entry: ResizeObserverEntry) => void;
    handleContentResize: (entry: ResizeObserverEntry) => void;
    handleAnimationIteration: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    autoFill: BooleanConstructor;
    speed: {
        type: NumberConstructor;
        default: number;
    };
    theme: import("vue").PropType<import("../../_mixins").Theme<"Marquee", {}, any>>;
    themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Marquee", {}, any>>>;
    builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Marquee", {}, any>>>;
}>> & Readonly<{}>, {
    autoFill: boolean;
    speed: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
