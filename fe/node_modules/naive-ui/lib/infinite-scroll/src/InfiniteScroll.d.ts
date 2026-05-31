import type { PropType } from 'vue';
import type { ScrollbarInst } from '../../_internal';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { ScrollbarProps } from '../../scrollbar/src/Scrollbar';
export declare const infiniteScrollProps: {
    readonly distance: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly onLoad: PropType<() => Promise<void> | void>;
    readonly scrollbarProps: PropType<ScrollbarProps>;
};
export type InfiniteScrollProps = ExtractPublicPropTypes<typeof infiniteScrollProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly distance: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly onLoad: PropType<() => Promise<void> | void>;
    readonly scrollbarProps: PropType<ScrollbarProps>;
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
    handleScroll: () => void;
    handleWheel: (e: WheelEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly distance: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly onLoad: PropType<() => Promise<void> | void>;
    readonly scrollbarProps: PropType<ScrollbarProps>;
}>> & Readonly<{}>, {
    readonly distance: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
