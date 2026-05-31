import type { CSSProperties, HTMLAttributes, PropType } from 'vue';
import type { ExtractInternalPropTypes, ExtractPublicPropTypes } from '../../../_utils';
export interface ScrollTo {
    (x: number, y: number): void;
    (options: {
        left?: number;
        top?: number;
        behavior?: ScrollBehavior;
        debounce?: boolean;
    }): void;
    (options: {
        el: HTMLElement;
        behavior?: ScrollBehavior;
        debounce?: boolean;
    }): void;
    (options: {
        index: number;
        elSize: number;
        behavior?: ScrollBehavior;
        debounce?: boolean;
    }): void;
    (options: {
        position: 'top' | 'bottom';
        behavior?: ScrollBehavior;
        debounce?: boolean;
    }): void;
}
export interface ScrollBy {
    (x: number, y: number): void;
    (options: {
        left?: number;
        top?: number;
        behavior?: ScrollBehavior;
    }): void;
}
export interface ScrollbarInstMethods {
    syncUnifiedContainer: () => void;
    scrollTo: ScrollTo;
    scrollBy: ScrollBy;
    sync: () => void;
    handleMouseEnterWrapper: () => void;
    handleMouseLeaveWrapper: () => void;
}
export interface ScrollbarInst extends ScrollbarInstMethods {
    $el: HTMLElement;
    containerRef: HTMLElement | null;
    contentRef: HTMLElement | null;
    containerScrollTop: number;
}
declare const scrollbarProps: {
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly scrollable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly xScrollable: BooleanConstructor;
    readonly trigger: {
        readonly type: PropType<"none" | "hover">;
        readonly default: "hover";
    };
    readonly useUnifiedContainer: BooleanConstructor;
    readonly triggerDisplayManually: BooleanConstructor;
    readonly container: PropType<() => HTMLElement | null | undefined>;
    readonly content: PropType<() => HTMLElement | null | undefined>;
    readonly containerClass: StringConstructor;
    readonly containerStyle: PropType<string | CSSProperties>;
    readonly contentClass: PropType<string | Array<string | undefined>>;
    readonly contentStyle: PropType<string | CSSProperties>;
    readonly horizontalRailStyle: PropType<string | CSSProperties>;
    readonly verticalRailStyle: PropType<string | CSSProperties>;
    readonly onScroll: PropType<(e: Event) => void>;
    readonly onWheel: PropType<(e: WheelEvent) => void>;
    readonly onResize: PropType<(e: ResizeObserverEntry) => void>;
    readonly internalOnUpdateScrollLeft: PropType<(scrollLeft: number) => void>;
    readonly internalHoistYRail: BooleanConstructor;
    readonly internalExposeWidthCssVar: BooleanConstructor;
    readonly yPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "right";
    };
    readonly xPlacement: {
        readonly type: PropType<"top" | "bottom">;
        readonly default: "bottom";
    };
    readonly theme: PropType<import("../../../_mixins").Theme<"Scrollbar", {
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
    }, any>>;
    readonly themeOverrides: PropType<import("../../../_mixins/use-theme").ExtractThemeOverrides<import("../../../_mixins").Theme<"Scrollbar", {
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
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../../_mixins/use-theme").ExtractThemeOverrides<import("../../../_mixins").Theme<"Scrollbar", {
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
    }, any>>>;
};
export type ScrollbarProps = ExtractPublicPropTypes<typeof scrollbarProps>;
export type ScrollbarInternalProps = ExtractInternalPropTypes<typeof scrollbarProps>;
declare const Scrollbar: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly scrollable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly xScrollable: BooleanConstructor;
    readonly trigger: {
        readonly type: PropType<"none" | "hover">;
        readonly default: "hover";
    };
    readonly useUnifiedContainer: BooleanConstructor;
    readonly triggerDisplayManually: BooleanConstructor;
    readonly container: PropType<() => HTMLElement | null | undefined>;
    readonly content: PropType<() => HTMLElement | null | undefined>;
    readonly containerClass: StringConstructor;
    readonly containerStyle: PropType<string | CSSProperties>;
    readonly contentClass: PropType<string | Array<string | undefined>>;
    readonly contentStyle: PropType<string | CSSProperties>;
    readonly horizontalRailStyle: PropType<string | CSSProperties>;
    readonly verticalRailStyle: PropType<string | CSSProperties>;
    readonly onScroll: PropType<(e: Event) => void>;
    readonly onWheel: PropType<(e: WheelEvent) => void>;
    readonly onResize: PropType<(e: ResizeObserverEntry) => void>;
    readonly internalOnUpdateScrollLeft: PropType<(scrollLeft: number) => void>;
    readonly internalHoistYRail: BooleanConstructor;
    readonly internalExposeWidthCssVar: BooleanConstructor;
    readonly yPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "right";
    };
    readonly xPlacement: {
        readonly type: PropType<"top" | "bottom">;
        readonly default: "bottom";
    };
    readonly theme: PropType<import("../../../_mixins").Theme<"Scrollbar", {
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
    }, any>>;
    readonly themeOverrides: PropType<import("../../../_mixins/use-theme").ExtractThemeOverrides<import("../../../_mixins").Theme<"Scrollbar", {
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
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../../_mixins/use-theme").ExtractThemeOverrides<import("../../../_mixins").Theme<"Scrollbar", {
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
    }, any>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    rtlEnabled: import("vue").Ref<import("../../../config-provider/src/internal-interface").RtlItem | undefined, import("../../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    containerScrollTop: import("vue").Ref<number, number>;
    wrapperRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    containerRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    contentRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    yRailRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    xRailRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    needYBar: import("vue").ComputedRef<boolean>;
    needXBar: import("vue").ComputedRef<boolean>;
    yBarSizePx: import("vue").ComputedRef<string>;
    xBarSizePx: import("vue").ComputedRef<string>;
    yBarTopPx: import("vue").ComputedRef<string>;
    xBarLeftPx: import("vue").ComputedRef<string>;
    isShowXBar: import("vue").ComputedRef<boolean>;
    isShowYBar: import("vue").ComputedRef<boolean>;
    isIos: boolean;
    handleScroll: (e: Event) => void;
    handleContentResize: () => void;
    handleContainerResize: (e: ResizeObserverEntry) => void;
    handleYScrollMouseDown: (e: MouseEvent) => void;
    handleXScrollMouseDown: (e: MouseEvent) => void;
    containerWidth: import("vue").Ref<number | null, number | null>;
    cssVars: import("vue").ComputedRef<{
        '--n-scrollbar-bezier': string;
        '--n-scrollbar-color': string;
        '--n-scrollbar-color-hover': string;
        '--n-scrollbar-border-radius': string;
        '--n-scrollbar-width': string;
        '--n-scrollbar-height': string;
        '--n-scrollbar-rail-top-horizontal-top': string;
        '--n-scrollbar-rail-right-horizontal-top': string;
        '--n-scrollbar-rail-bottom-horizontal-top': string;
        '--n-scrollbar-rail-left-horizontal-top': string;
        '--n-scrollbar-rail-top-horizontal-bottom': string;
        '--n-scrollbar-rail-right-horizontal-bottom': string;
        '--n-scrollbar-rail-bottom-horizontal-bottom': string;
        '--n-scrollbar-rail-left-horizontal-bottom': string;
        '--n-scrollbar-rail-top-vertical-right': string;
        '--n-scrollbar-rail-right-vertical-right': string;
        '--n-scrollbar-rail-bottom-vertical-right': string;
        '--n-scrollbar-rail-left-vertical-right': string;
        '--n-scrollbar-rail-top-vertical-left': string;
        '--n-scrollbar-rail-right-vertical-left': string;
        '--n-scrollbar-rail-bottom-vertical-left': string;
        '--n-scrollbar-rail-left-vertical-left': string;
        '--n-scrollbar-rail-color': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
    syncUnifiedContainer: () => void;
    scrollTo: ScrollTo;
    scrollBy: ScrollBy;
    sync: () => void;
    handleMouseEnterWrapper: () => void;
    handleMouseLeaveWrapper: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly scrollable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly xScrollable: BooleanConstructor;
    readonly trigger: {
        readonly type: PropType<"none" | "hover">;
        readonly default: "hover";
    };
    readonly useUnifiedContainer: BooleanConstructor;
    readonly triggerDisplayManually: BooleanConstructor;
    readonly container: PropType<() => HTMLElement | null | undefined>;
    readonly content: PropType<() => HTMLElement | null | undefined>;
    readonly containerClass: StringConstructor;
    readonly containerStyle: PropType<string | CSSProperties>;
    readonly contentClass: PropType<string | Array<string | undefined>>;
    readonly contentStyle: PropType<string | CSSProperties>;
    readonly horizontalRailStyle: PropType<string | CSSProperties>;
    readonly verticalRailStyle: PropType<string | CSSProperties>;
    readonly onScroll: PropType<(e: Event) => void>;
    readonly onWheel: PropType<(e: WheelEvent) => void>;
    readonly onResize: PropType<(e: ResizeObserverEntry) => void>;
    readonly internalOnUpdateScrollLeft: PropType<(scrollLeft: number) => void>;
    readonly internalHoistYRail: BooleanConstructor;
    readonly internalExposeWidthCssVar: BooleanConstructor;
    readonly yPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "right";
    };
    readonly xPlacement: {
        readonly type: PropType<"top" | "bottom">;
        readonly default: "bottom";
    };
    readonly theme: PropType<import("../../../_mixins").Theme<"Scrollbar", {
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
    }, any>>;
    readonly themeOverrides: PropType<import("../../../_mixins/use-theme").ExtractThemeOverrides<import("../../../_mixins").Theme<"Scrollbar", {
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
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../../_mixins/use-theme").ExtractThemeOverrides<import("../../../_mixins").Theme<"Scrollbar", {
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
    }, any>>>;
}>> & Readonly<{}>, {
    readonly duration: number;
    readonly scrollable: boolean;
    readonly xScrollable: boolean;
    readonly trigger: "none" | "hover";
    readonly useUnifiedContainer: boolean;
    readonly triggerDisplayManually: boolean;
    readonly internalHoistYRail: boolean;
    readonly internalExposeWidthCssVar: boolean;
    readonly yPlacement: "left" | "right";
    readonly xPlacement: "top" | "bottom";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
type NativeScrollbarProps = Omit<HTMLAttributes, keyof ScrollbarInternalProps>;
type MergedProps = Partial<ScrollbarInternalProps & NativeScrollbarProps>;
export default Scrollbar;
export declare const XScrollbar: new () => {
    $props: MergedProps;
};
