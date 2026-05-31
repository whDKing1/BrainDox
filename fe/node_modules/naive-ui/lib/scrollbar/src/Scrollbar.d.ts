import type { PropType } from 'vue';
import type { ScrollbarInst as InternalScrollbarInst } from '../../_internal';
import type { ExtractPublicPropTypes } from '../../_utils';
export interface ScrollTo {
    (x: number, y: number): void;
    (options: {
        left?: number;
        top?: number;
        behavior?: ScrollBehavior;
    }): void;
}
export type ScrollBy = ScrollTo;
export interface ScrollbarInst {
    scrollTo: ScrollTo;
    scrollBy: ScrollBy;
}
export declare const scrollbarProps: {
    readonly trigger: PropType<"none" | "hover">;
    readonly xScrollable: BooleanConstructor;
    readonly onScroll: PropType<(e: Event) => void>;
    readonly contentClass: StringConstructor;
    readonly contentStyle: PropType<string | Record<string, any>>;
    readonly size: NumberConstructor;
    readonly yPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "right";
    };
    readonly xPlacement: {
        readonly type: PropType<"top" | "bottom">;
        readonly default: "bottom";
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Scrollbar", {
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
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Scrollbar", {
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
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Scrollbar", {
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
declare const Scrollbar: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly trigger: PropType<"none" | "hover">;
    readonly xScrollable: BooleanConstructor;
    readonly onScroll: PropType<(e: Event) => void>;
    readonly contentClass: StringConstructor;
    readonly contentStyle: PropType<string | Record<string, any>>;
    readonly size: NumberConstructor;
    readonly yPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "right";
    };
    readonly xPlacement: {
        readonly type: PropType<"top" | "bottom">;
        readonly default: "bottom";
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Scrollbar", {
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
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Scrollbar", {
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
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Scrollbar", {
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
    } | null, InternalScrollbarInst | {
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
    scrollTo: ScrollTo;
    scrollBy: ScrollBy;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly trigger: PropType<"none" | "hover">;
    readonly xScrollable: BooleanConstructor;
    readonly onScroll: PropType<(e: Event) => void>;
    readonly contentClass: StringConstructor;
    readonly contentStyle: PropType<string | Record<string, any>>;
    readonly size: NumberConstructor;
    readonly yPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "right";
    };
    readonly xPlacement: {
        readonly type: PropType<"top" | "bottom">;
        readonly default: "bottom";
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Scrollbar", {
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
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Scrollbar", {
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
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Scrollbar", {
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
    readonly xScrollable: boolean;
    readonly yPlacement: "left" | "right";
    readonly xPlacement: "top" | "bottom";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default Scrollbar;
