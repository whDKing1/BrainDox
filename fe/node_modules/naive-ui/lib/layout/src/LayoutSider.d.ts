import type { CSSProperties, PropType } from 'vue';
import type { ScrollbarInst, ScrollbarProps } from '../../_internal';
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils';
export declare const layoutSiderProps: {
    readonly position: {
        readonly type: PropType<"static" | "absolute">;
        readonly default: "static";
    };
    readonly bordered: BooleanConstructor;
    readonly collapsedWidth: {
        readonly type: NumberConstructor;
        readonly default: 48;
    };
    readonly width: {
        readonly type: PropType<string | number>;
        readonly default: 272;
    };
    readonly contentClass: StringConstructor;
    readonly contentStyle: {
        readonly type: PropType<string | CSSProperties>;
        readonly default: "";
    };
    readonly collapseMode: {
        readonly type: PropType<"width" | "transform">;
        readonly default: "transform";
    };
    readonly collapsed: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly defaultCollapsed: BooleanConstructor;
    readonly showCollapsedContent: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showTrigger: {
        readonly type: PropType<boolean | "arrow-circle" | "bar">;
        readonly default: false;
    };
    readonly nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly inverted: BooleanConstructor;
    readonly scrollbarProps: PropType<Partial<ScrollbarProps> & {
        style: CSSProperties;
    }>;
    readonly triggerClass: StringConstructor;
    readonly triggerStyle: PropType<string | CSSProperties>;
    readonly collapsedTriggerClass: StringConstructor;
    readonly collapsedTriggerStyle: PropType<string | CSSProperties>;
    readonly 'onUpdate:collapsed': PropType<MaybeArray<(value: boolean) => void>>;
    readonly onUpdateCollapsed: PropType<MaybeArray<(value: boolean) => void>>;
    readonly onAfterEnter: PropType<() => void>;
    readonly onAfterLeave: PropType<() => void>;
    readonly onExpand: PropType<MaybeArray<() => void>>;
    readonly onCollapse: PropType<MaybeArray<() => void>>;
    readonly onScroll: PropType<(e: Event) => void>;
};
export type LayoutSiderProps = ExtractPublicPropTypes<typeof layoutSiderProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    position: {
        readonly type: PropType<"static" | "absolute">;
        readonly default: "static";
    };
    bordered: BooleanConstructor;
    collapsedWidth: {
        readonly type: NumberConstructor;
        readonly default: 48;
    };
    width: {
        readonly type: PropType<string | number>;
        readonly default: 272;
    };
    contentClass: StringConstructor;
    contentStyle: {
        readonly type: PropType<string | CSSProperties>;
        readonly default: "";
    };
    collapseMode: {
        readonly type: PropType<"width" | "transform">;
        readonly default: "transform";
    };
    collapsed: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    defaultCollapsed: BooleanConstructor;
    showCollapsedContent: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    showTrigger: {
        readonly type: PropType<boolean | "arrow-circle" | "bar">;
        readonly default: false;
    };
    nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    inverted: BooleanConstructor;
    scrollbarProps: PropType<Partial<ScrollbarProps> & {
        style: CSSProperties;
    }>;
    triggerClass: StringConstructor;
    triggerStyle: PropType<string | CSSProperties>;
    collapsedTriggerClass: StringConstructor;
    collapsedTriggerStyle: PropType<string | CSSProperties>;
    'onUpdate:collapsed': PropType<MaybeArray<(value: boolean) => void>>;
    onUpdateCollapsed: PropType<MaybeArray<(value: boolean) => void>>;
    onAfterEnter: PropType<() => void>;
    onAfterLeave: PropType<() => void>;
    onExpand: PropType<MaybeArray<() => void>>;
    onCollapse: PropType<MaybeArray<() => void>>;
    onScroll: PropType<(e: Event) => void>;
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
    mergedClsPrefix: import("vue").Ref<string, string>;
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
    styleMaxWidth: import("vue").ComputedRef<string>;
    mergedCollapsed: import("vue").ComputedRef<boolean>;
    scrollContainerStyle: import("vue").ComputedRef<CSSProperties>;
    siderPlacement: import("vue").ComputedRef<"left" | "right">;
    handleNativeElScroll: (e: Event) => void;
    handleTransitionend: (e: TransitionEvent) => void;
    handleTriggerClick: () => void;
    inlineThemeDisabled: boolean | undefined;
    cssVars: import("vue").ComputedRef<any>;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    position: {
        readonly type: PropType<"static" | "absolute">;
        readonly default: "static";
    };
    bordered: BooleanConstructor;
    collapsedWidth: {
        readonly type: NumberConstructor;
        readonly default: 48;
    };
    width: {
        readonly type: PropType<string | number>;
        readonly default: 272;
    };
    contentClass: StringConstructor;
    contentStyle: {
        readonly type: PropType<string | CSSProperties>;
        readonly default: "";
    };
    collapseMode: {
        readonly type: PropType<"width" | "transform">;
        readonly default: "transform";
    };
    collapsed: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    defaultCollapsed: BooleanConstructor;
    showCollapsedContent: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    showTrigger: {
        readonly type: PropType<boolean | "arrow-circle" | "bar">;
        readonly default: false;
    };
    nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    inverted: BooleanConstructor;
    scrollbarProps: PropType<Partial<ScrollbarProps> & {
        style: CSSProperties;
    }>;
    triggerClass: StringConstructor;
    triggerStyle: PropType<string | CSSProperties>;
    collapsedTriggerClass: StringConstructor;
    collapsedTriggerStyle: PropType<string | CSSProperties>;
    'onUpdate:collapsed': PropType<MaybeArray<(value: boolean) => void>>;
    onUpdateCollapsed: PropType<MaybeArray<(value: boolean) => void>>;
    onAfterEnter: PropType<() => void>;
    onAfterLeave: PropType<() => void>;
    onExpand: PropType<MaybeArray<() => void>>;
    onCollapse: PropType<MaybeArray<() => void>>;
    onScroll: PropType<(e: Event) => void>;
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
    bordered: boolean;
    width: string | number;
    contentStyle: string | CSSProperties;
    collapsed: boolean | undefined;
    nativeScrollbar: boolean;
    inverted: boolean;
    collapsedWidth: number;
    collapseMode: "transform" | "width";
    defaultCollapsed: boolean;
    showCollapsedContent: boolean;
    showTrigger: boolean | "bar" | "arrow-circle";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
