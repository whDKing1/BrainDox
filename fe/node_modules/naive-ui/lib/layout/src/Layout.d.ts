import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import type { ScrollbarInst, ScrollbarProps } from '../../_internal';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const layoutProps: {
    readonly embedded: BooleanConstructor;
    readonly position: {
        readonly type: PropType<"static" | "absolute">;
        readonly default: "static";
    };
    readonly nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly scrollbarProps: PropType<Partial<ScrollbarProps>>;
    readonly onScroll: PropType<(e: Event) => void>;
    readonly contentClass: StringConstructor;
    readonly contentStyle: {
        readonly type: PropType<string | CSSProperties>;
        readonly default: "";
    };
    readonly hasSider: BooleanConstructor;
    readonly siderPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "left";
    };
};
export type LayoutProps = ExtractPublicPropTypes<typeof layoutProps>;
export declare const layoutInjectionKey: import("vue").InjectionKey<ExtractPropTypes<{
    readonly embedded: BooleanConstructor;
    readonly position: {
        readonly type: PropType<"static" | "absolute">;
        readonly default: "static";
    };
    readonly nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly scrollbarProps: PropType<Partial<ScrollbarProps>>;
    readonly onScroll: PropType<(e: Event) => void>;
    readonly contentClass: StringConstructor;
    readonly contentStyle: {
        readonly type: PropType<string | CSSProperties>;
        readonly default: "";
    };
    readonly hasSider: BooleanConstructor;
    readonly siderPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "left";
    };
}>>;
export declare function createLayoutComponent(isContent: boolean): import("vue").DefineComponent<ExtractPropTypes<{
    embedded: BooleanConstructor;
    position: {
        readonly type: PropType<"static" | "absolute">;
        readonly default: "static";
    };
    nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    scrollbarProps: PropType<Partial<ScrollbarProps>>;
    onScroll: PropType<(e: Event) => void>;
    contentClass: StringConstructor;
    contentStyle: {
        readonly type: PropType<string | CSSProperties>;
        readonly default: "";
    };
    hasSider: BooleanConstructor;
    siderPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "left";
    };
    theme: PropType<import("../../_mixins").Theme<"Layout", {
        textColor: string;
        textColorInverted: string;
        color: string;
        colorEmbedded: string;
        headerColor: string;
        headerColorInverted: string;
        footerColor: string;
        footerColorInverted: string;
        headerBorderColor: string;
        headerBorderColorInverted: string;
        footerBorderColor: string;
        footerBorderColorInverted: string;
        siderBorderColor: string;
        siderBorderColorInverted: string;
        siderColor: string;
        siderColorInverted: string;
        siderToggleButtonBorder: string;
        siderToggleButtonColor: string;
        siderToggleButtonIconColor: string;
        siderToggleButtonIconColorInverted: string;
        siderToggleBarColor: string;
        siderToggleBarColorHover: string;
        __invertScrollbar: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Layout", {
        textColor: string;
        textColorInverted: string;
        color: string;
        colorEmbedded: string;
        headerColor: string;
        headerColorInverted: string;
        footerColor: string;
        footerColorInverted: string;
        headerBorderColor: string;
        headerBorderColorInverted: string;
        footerBorderColor: string;
        footerBorderColorInverted: string;
        siderBorderColor: string;
        siderBorderColorInverted: string;
        siderColor: string;
        siderColorInverted: string;
        siderToggleButtonBorder: string;
        siderToggleButtonColor: string;
        siderToggleButtonIconColor: string;
        siderToggleButtonIconColorInverted: string;
        siderToggleBarColor: string;
        siderToggleBarColorHover: string;
        __invertScrollbar: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Layout", {
        textColor: string;
        textColorInverted: string;
        color: string;
        colorEmbedded: string;
        headerColor: string;
        headerColorInverted: string;
        footerColor: string;
        footerColorInverted: string;
        headerBorderColor: string;
        headerBorderColorInverted: string;
        footerBorderColor: string;
        footerBorderColorInverted: string;
        siderBorderColor: string;
        siderBorderColorInverted: string;
        siderColor: string;
        siderColorInverted: string;
        siderToggleButtonBorder: string;
        siderToggleButtonColor: string;
        siderToggleButtonIconColor: string;
        siderToggleButtonIconColorInverted: string;
        siderToggleBarColor: string;
        siderToggleBarColorHover: string;
        __invertScrollbar: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
    }>>>;
}>, {
    scrollTo: ((options: ScrollToOptions) => void) & ((x: number, y: number) => void);
    mergedClsPrefix: import("vue").Ref<string, string>;
    scrollableElRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    scrollbarInstRef: import("vue").Ref<{
        $el: HTMLElement;
        containerRef: HTMLElement | null;
        contentRef: HTMLElement | null;
        containerScrollTop: number;
        syncUnifiedContainer: () => void;
        scrollTo: import("../../_internal/scrollbar/src/Scrollbar").ScrollTo;
        scrollBy: import("../../_internal/scrollbar/src/Scrollbar").ScrollBy;
        sync: () => void;
        handleMouseEnterWrapper: () => void;
        handleMouseLeaveWrapper: () => void;
    } | null, ScrollbarInst | {
        $el: HTMLElement;
        containerRef: HTMLElement | null;
        contentRef: HTMLElement | null;
        containerScrollTop: number;
        syncUnifiedContainer: () => void;
        scrollTo: import("../../_internal/scrollbar/src/Scrollbar").ScrollTo;
        scrollBy: import("../../_internal/scrollbar/src/Scrollbar").ScrollBy;
        sync: () => void;
        handleMouseEnterWrapper: () => void;
        handleMouseLeaveWrapper: () => void;
    } | null>;
    hasSiderStyle: CSSProperties;
    mergedTheme: import("vue").ComputedRef<{
        common: import("../..").ThemeCommonVars;
        self: {
            textColor: string;
            textColorInverted: string;
            color: string;
            colorEmbedded: string;
            headerColor: string;
            headerColorInverted: string;
            footerColor: string;
            footerColorInverted: string;
            headerBorderColor: string;
            headerBorderColorInverted: string;
            footerBorderColor: string;
            footerBorderColorInverted: string;
            siderBorderColor: string;
            siderBorderColorInverted: string;
            siderColor: string;
            siderColorInverted: string;
            siderToggleButtonBorder: string;
            siderToggleButtonColor: string;
            siderToggleButtonIconColor: string;
            siderToggleButtonIconColorInverted: string;
            siderToggleBarColor: string;
            siderToggleBarColorHover: string;
            __invertScrollbar: string;
        };
        peers: {
            Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
                height: string;
                width: string;
                borderRadius: string;
                color: string;
                colorHover: string;
                railInsetHorizontalBottom: string;
                railInsetHorizontalTop: string;
                railInsetVerticalRight: string;
                railInsetVerticalLeft: string;
                railColor: string;
            }, any>;
        };
        peerOverrides: {
            Scrollbar?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
        };
    }>;
    handleNativeElScroll: (e: Event) => void;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-color': string;
        '--n-text-color': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    embedded: BooleanConstructor;
    position: {
        readonly type: PropType<"static" | "absolute">;
        readonly default: "static";
    };
    nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    scrollbarProps: PropType<Partial<ScrollbarProps>>;
    onScroll: PropType<(e: Event) => void>;
    contentClass: StringConstructor;
    contentStyle: {
        readonly type: PropType<string | CSSProperties>;
        readonly default: "";
    };
    hasSider: BooleanConstructor;
    siderPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "left";
    };
    theme: PropType<import("../../_mixins").Theme<"Layout", {
        textColor: string;
        textColorInverted: string;
        color: string;
        colorEmbedded: string;
        headerColor: string;
        headerColorInverted: string;
        footerColor: string;
        footerColorInverted: string;
        headerBorderColor: string;
        headerBorderColorInverted: string;
        footerBorderColor: string;
        footerBorderColorInverted: string;
        siderBorderColor: string;
        siderBorderColorInverted: string;
        siderColor: string;
        siderColorInverted: string;
        siderToggleButtonBorder: string;
        siderToggleButtonColor: string;
        siderToggleButtonIconColor: string;
        siderToggleButtonIconColorInverted: string;
        siderToggleBarColor: string;
        siderToggleBarColorHover: string;
        __invertScrollbar: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Layout", {
        textColor: string;
        textColorInverted: string;
        color: string;
        colorEmbedded: string;
        headerColor: string;
        headerColorInverted: string;
        footerColor: string;
        footerColorInverted: string;
        headerBorderColor: string;
        headerBorderColorInverted: string;
        footerBorderColor: string;
        footerBorderColorInverted: string;
        siderBorderColor: string;
        siderBorderColorInverted: string;
        siderColor: string;
        siderColorInverted: string;
        siderToggleButtonBorder: string;
        siderToggleButtonColor: string;
        siderToggleButtonIconColor: string;
        siderToggleButtonIconColorInverted: string;
        siderToggleBarColor: string;
        siderToggleBarColorHover: string;
        __invertScrollbar: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Layout", {
        textColor: string;
        textColorInverted: string;
        color: string;
        colorEmbedded: string;
        headerColor: string;
        headerColorInverted: string;
        footerColor: string;
        footerColorInverted: string;
        headerBorderColor: string;
        headerBorderColorInverted: string;
        footerBorderColor: string;
        footerBorderColorInverted: string;
        siderBorderColor: string;
        siderBorderColorInverted: string;
        siderColor: string;
        siderColorInverted: string;
        siderToggleButtonBorder: string;
        siderToggleButtonColor: string;
        siderToggleButtonIconColor: string;
        siderToggleButtonIconColorInverted: string;
        siderToggleBarColor: string;
        siderToggleBarColorHover: string;
        __invertScrollbar: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
    }>>>;
}>> & Readonly<{}>, {
    position: "absolute" | "static";
    contentStyle: string | CSSProperties;
    embedded: boolean;
    nativeScrollbar: boolean;
    hasSider: boolean;
    siderPlacement: "left" | "right";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: import("vue").DefineComponent<ExtractPropTypes<{
    embedded: BooleanConstructor;
    position: {
        readonly type: PropType<"static" | "absolute">;
        readonly default: "static";
    };
    nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    scrollbarProps: PropType<Partial<ScrollbarProps>>;
    onScroll: PropType<(e: Event) => void>;
    contentClass: StringConstructor;
    contentStyle: {
        readonly type: PropType<string | CSSProperties>;
        readonly default: "";
    };
    hasSider: BooleanConstructor;
    siderPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "left";
    };
    theme: PropType<import("../../_mixins").Theme<"Layout", {
        textColor: string;
        textColorInverted: string;
        color: string;
        colorEmbedded: string;
        headerColor: string;
        headerColorInverted: string;
        footerColor: string;
        footerColorInverted: string;
        headerBorderColor: string;
        headerBorderColorInverted: string;
        footerBorderColor: string;
        footerBorderColorInverted: string;
        siderBorderColor: string;
        siderBorderColorInverted: string;
        siderColor: string;
        siderColorInverted: string;
        siderToggleButtonBorder: string;
        siderToggleButtonColor: string;
        siderToggleButtonIconColor: string;
        siderToggleButtonIconColorInverted: string;
        siderToggleBarColor: string;
        siderToggleBarColorHover: string;
        __invertScrollbar: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Layout", {
        textColor: string;
        textColorInverted: string;
        color: string;
        colorEmbedded: string;
        headerColor: string;
        headerColorInverted: string;
        footerColor: string;
        footerColorInverted: string;
        headerBorderColor: string;
        headerBorderColorInverted: string;
        footerBorderColor: string;
        footerBorderColorInverted: string;
        siderBorderColor: string;
        siderBorderColorInverted: string;
        siderColor: string;
        siderColorInverted: string;
        siderToggleButtonBorder: string;
        siderToggleButtonColor: string;
        siderToggleButtonIconColor: string;
        siderToggleButtonIconColorInverted: string;
        siderToggleBarColor: string;
        siderToggleBarColorHover: string;
        __invertScrollbar: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Layout", {
        textColor: string;
        textColorInverted: string;
        color: string;
        colorEmbedded: string;
        headerColor: string;
        headerColorInverted: string;
        footerColor: string;
        footerColorInverted: string;
        headerBorderColor: string;
        headerBorderColorInverted: string;
        footerBorderColor: string;
        footerBorderColorInverted: string;
        siderBorderColor: string;
        siderBorderColorInverted: string;
        siderColor: string;
        siderColorInverted: string;
        siderToggleButtonBorder: string;
        siderToggleButtonColor: string;
        siderToggleButtonIconColor: string;
        siderToggleButtonIconColorInverted: string;
        siderToggleBarColor: string;
        siderToggleBarColorHover: string;
        __invertScrollbar: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
    }>>>;
}>, {
    scrollTo: ((options: ScrollToOptions) => void) & ((x: number, y: number) => void);
    mergedClsPrefix: import("vue").Ref<string, string>;
    scrollableElRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    scrollbarInstRef: import("vue").Ref<{
        $el: HTMLElement;
        containerRef: HTMLElement | null;
        contentRef: HTMLElement | null;
        containerScrollTop: number;
        syncUnifiedContainer: () => void;
        scrollTo: import("../../_internal/scrollbar/src/Scrollbar").ScrollTo;
        scrollBy: import("../../_internal/scrollbar/src/Scrollbar").ScrollBy;
        sync: () => void;
        handleMouseEnterWrapper: () => void;
        handleMouseLeaveWrapper: () => void;
    } | null, ScrollbarInst | {
        $el: HTMLElement;
        containerRef: HTMLElement | null;
        contentRef: HTMLElement | null;
        containerScrollTop: number;
        syncUnifiedContainer: () => void;
        scrollTo: import("../../_internal/scrollbar/src/Scrollbar").ScrollTo;
        scrollBy: import("../../_internal/scrollbar/src/Scrollbar").ScrollBy;
        sync: () => void;
        handleMouseEnterWrapper: () => void;
        handleMouseLeaveWrapper: () => void;
    } | null>;
    hasSiderStyle: CSSProperties;
    mergedTheme: import("vue").ComputedRef<{
        common: import("../..").ThemeCommonVars;
        self: {
            textColor: string;
            textColorInverted: string;
            color: string;
            colorEmbedded: string;
            headerColor: string;
            headerColorInverted: string;
            footerColor: string;
            footerColorInverted: string;
            headerBorderColor: string;
            headerBorderColorInverted: string;
            footerBorderColor: string;
            footerBorderColorInverted: string;
            siderBorderColor: string;
            siderBorderColorInverted: string;
            siderColor: string;
            siderColorInverted: string;
            siderToggleButtonBorder: string;
            siderToggleButtonColor: string;
            siderToggleButtonIconColor: string;
            siderToggleButtonIconColorInverted: string;
            siderToggleBarColor: string;
            siderToggleBarColorHover: string;
            __invertScrollbar: string;
        };
        peers: {
            Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
                height: string;
                width: string;
                borderRadius: string;
                color: string;
                colorHover: string;
                railInsetHorizontalBottom: string;
                railInsetHorizontalTop: string;
                railInsetVerticalRight: string;
                railInsetVerticalLeft: string;
                railColor: string;
            }, any>;
        };
        peerOverrides: {
            Scrollbar?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
        };
    }>;
    handleNativeElScroll: (e: Event) => void;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-color': string;
        '--n-text-color': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    embedded: BooleanConstructor;
    position: {
        readonly type: PropType<"static" | "absolute">;
        readonly default: "static";
    };
    nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    scrollbarProps: PropType<Partial<ScrollbarProps>>;
    onScroll: PropType<(e: Event) => void>;
    contentClass: StringConstructor;
    contentStyle: {
        readonly type: PropType<string | CSSProperties>;
        readonly default: "";
    };
    hasSider: BooleanConstructor;
    siderPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "left";
    };
    theme: PropType<import("../../_mixins").Theme<"Layout", {
        textColor: string;
        textColorInverted: string;
        color: string;
        colorEmbedded: string;
        headerColor: string;
        headerColorInverted: string;
        footerColor: string;
        footerColorInverted: string;
        headerBorderColor: string;
        headerBorderColorInverted: string;
        footerBorderColor: string;
        footerBorderColorInverted: string;
        siderBorderColor: string;
        siderBorderColorInverted: string;
        siderColor: string;
        siderColorInverted: string;
        siderToggleButtonBorder: string;
        siderToggleButtonColor: string;
        siderToggleButtonIconColor: string;
        siderToggleButtonIconColorInverted: string;
        siderToggleBarColor: string;
        siderToggleBarColorHover: string;
        __invertScrollbar: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Layout", {
        textColor: string;
        textColorInverted: string;
        color: string;
        colorEmbedded: string;
        headerColor: string;
        headerColorInverted: string;
        footerColor: string;
        footerColorInverted: string;
        headerBorderColor: string;
        headerBorderColorInverted: string;
        footerBorderColor: string;
        footerBorderColorInverted: string;
        siderBorderColor: string;
        siderBorderColorInverted: string;
        siderColor: string;
        siderColorInverted: string;
        siderToggleButtonBorder: string;
        siderToggleButtonColor: string;
        siderToggleButtonIconColor: string;
        siderToggleButtonIconColorInverted: string;
        siderToggleBarColor: string;
        siderToggleBarColorHover: string;
        __invertScrollbar: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Layout", {
        textColor: string;
        textColorInverted: string;
        color: string;
        colorEmbedded: string;
        headerColor: string;
        headerColorInverted: string;
        footerColor: string;
        footerColorInverted: string;
        headerBorderColor: string;
        headerBorderColorInverted: string;
        footerBorderColor: string;
        footerBorderColorInverted: string;
        siderBorderColor: string;
        siderBorderColorInverted: string;
        siderColor: string;
        siderColorInverted: string;
        siderToggleButtonBorder: string;
        siderToggleButtonColor: string;
        siderToggleButtonIconColor: string;
        siderToggleButtonIconColorInverted: string;
        siderToggleBarColor: string;
        siderToggleBarColorHover: string;
        __invertScrollbar: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
    }>>>;
}>> & Readonly<{}>, {
    position: "absolute" | "static";
    contentStyle: string | CSSProperties;
    embedded: boolean;
    nativeScrollbar: boolean;
    hasSider: boolean;
    siderPlacement: "left" | "right";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
