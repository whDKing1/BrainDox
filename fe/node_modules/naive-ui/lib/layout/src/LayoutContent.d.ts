declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    embedded: BooleanConstructor;
    position: {
        readonly type: import("vue").PropType<"static" | "absolute">;
        readonly default: "static";
    };
    nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    scrollbarProps: import("vue").PropType<Partial<import("../../_internal").ScrollbarProps>>;
    onScroll: import("vue").PropType<(e: Event) => void>;
    contentClass: StringConstructor;
    contentStyle: {
        readonly type: import("vue").PropType<string | import("vue").CSSProperties>;
        readonly default: "";
    };
    hasSider: BooleanConstructor;
    siderPlacement: {
        readonly type: import("vue").PropType<"left" | "right">;
        readonly default: "left";
    };
    theme: import("vue").PropType<import("../../_mixins").Theme<"Layout", {
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
    themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Layout", {
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
    builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Layout", {
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
    } | null, import("../../_internal").ScrollbarInst | {
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
    hasSiderStyle: import("vue").CSSProperties;
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
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    embedded: BooleanConstructor;
    position: {
        readonly type: import("vue").PropType<"static" | "absolute">;
        readonly default: "static";
    };
    nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    scrollbarProps: import("vue").PropType<Partial<import("../../_internal").ScrollbarProps>>;
    onScroll: import("vue").PropType<(e: Event) => void>;
    contentClass: StringConstructor;
    contentStyle: {
        readonly type: import("vue").PropType<string | import("vue").CSSProperties>;
        readonly default: "";
    };
    hasSider: BooleanConstructor;
    siderPlacement: {
        readonly type: import("vue").PropType<"left" | "right">;
        readonly default: "left";
    };
    theme: import("vue").PropType<import("../../_mixins").Theme<"Layout", {
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
    themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Layout", {
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
    builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Layout", {
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
    contentStyle: string | import("vue").CSSProperties;
    embedded: boolean;
    nativeScrollbar: boolean;
    hasSider: boolean;
    siderPlacement: "left" | "right";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
