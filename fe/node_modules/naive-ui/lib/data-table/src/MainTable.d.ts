import type { MainTableBodyRef, MainTableHeaderRef } from './interface';
declare const _default: import("vue").DefineComponent<{}, {
    getHeaderElement: () => HTMLElement | null;
    getBodyElement: () => HTMLElement | null;
    scrollTo: import("../../scrollbar/src/Scrollbar").ScrollTo;
    maxHeight: import("vue").Ref<string | number | undefined, string | number | undefined>;
    mergedClsPrefix: import("vue").Ref<string, string>;
    selfElRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    headerInstRef: import("vue").Ref<{
        $el: HTMLElement | null;
        virtualListRef: import("vueuc").VVirtualListInst | null;
    } | null, MainTableHeaderRef | {
        $el: HTMLElement | null;
        virtualListRef: import("vueuc").VVirtualListInst | null;
    } | null>;
    bodyInstRef: import("vue").Ref<{
        getScrollContainer: () => HTMLElement | null;
        scrollTo: import("../../scrollbar/src/Scrollbar").ScrollTo;
    } | null, MainTableBodyRef | {
        getScrollContainer: () => HTMLElement | null;
        scrollTo: import("../../scrollbar/src/Scrollbar").ScrollTo;
    } | null>;
    bodyStyle: import("vue").ComputedRef<{
        maxHeight: string | undefined;
        minHeight: string | undefined;
    }>;
    flexHeight: import("vue").Ref<boolean, boolean>;
    handleBodyResize: (entry: ResizeObserverEntry) => void;
    scrollX: import("vue").Ref<string | number | undefined, string | number | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
