import { PropType, CSSProperties } from 'vue';
import { ItemData, VScrollToOptions, VVirtualListColumn, VVirtualListRenderCol, VVirtualListRenderItemWithCols } from './type';
export interface CommonScrollToOptions {
    behavior?: ScrollBehavior;
    debounce?: boolean;
}
export interface ScrollTo {
    (x: number, y: number): void;
    (options: {
        left?: number;
        top?: number;
    } & CommonScrollToOptions): void;
    (options: {
        index: number;
    } & CommonScrollToOptions): void;
    (options: {
        key: string | number;
    } & CommonScrollToOptions): void;
    (options: {
        position: 'top' | 'bottom';
    } & CommonScrollToOptions): void;
    (options: VScrollToOptions): void;
}
export interface VirtualListInst {
    listElRef: HTMLElement;
    itemsElRef: HTMLElement | null;
    scrollTo: ScrollTo;
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    showScrollbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    columns: {
        type: PropType<VVirtualListColumn[]>;
        default: () => never[];
    };
    renderCol: PropType<VVirtualListRenderCol>;
    renderItemWithCols: PropType<VVirtualListRenderItemWithCols>;
    items: {
        type: PropType<ItemData[]>;
        default: () => never[];
    };
    itemSize: {
        type: NumberConstructor;
        required: true;
    };
    itemResizable: BooleanConstructor;
    itemsStyle: PropType<string | CSSProperties>;
    visibleItemsTag: {
        type: PropType<string | object>;
        default: string;
    };
    visibleItemsProps: ObjectConstructor;
    ignoreItemResize: BooleanConstructor;
    onScroll: PropType<(event: Event) => void>;
    onWheel: PropType<(event: WheelEvent) => void>;
    onResize: PropType<(entry: ResizeObserverEntry) => void>;
    defaultScrollKey: (StringConstructor | NumberConstructor)[];
    defaultScrollIndex: NumberConstructor;
    keyField: {
        type: StringConstructor;
        default: string;
    };
    paddingTop: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    paddingBottom: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}>, {
    listHeight: import("vue").Ref<number | undefined, number | undefined>;
    listStyle: {
        overflow: string;
    };
    keyToIndex: import("vue").ComputedRef<Map<any, any>>;
    itemsStyle: import("vue").ComputedRef<(string | CSSProperties | {
        boxSizing: string;
        width: string | undefined;
        height: string;
        minHeight: string;
        paddingTop: string;
        paddingBottom: string;
    } | undefined)[]>;
    visibleItemsStyle: import("vue").ComputedRef<{
        transform: string;
    }>;
    viewportItems: import("vue").ComputedRef<ItemData[]>;
    listElRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    itemsElRef: import("vue").Ref<Element | null, Element | null>;
    scrollTo: ScrollTo;
    handleListResize: (entry: ResizeObserverEntry) => void;
    handleListScroll: (e: UIEvent) => void;
    handleListWheel: (e: WheelEvent) => void;
    handleItemResize: (key: string | number, entry: ResizeObserverEntry) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    showScrollbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    columns: {
        type: PropType<VVirtualListColumn[]>;
        default: () => never[];
    };
    renderCol: PropType<VVirtualListRenderCol>;
    renderItemWithCols: PropType<VVirtualListRenderItemWithCols>;
    items: {
        type: PropType<ItemData[]>;
        default: () => never[];
    };
    itemSize: {
        type: NumberConstructor;
        required: true;
    };
    itemResizable: BooleanConstructor;
    itemsStyle: PropType<string | CSSProperties>;
    visibleItemsTag: {
        type: PropType<string | object>;
        default: string;
    };
    visibleItemsProps: ObjectConstructor;
    ignoreItemResize: BooleanConstructor;
    onScroll: PropType<(event: Event) => void>;
    onWheel: PropType<(event: WheelEvent) => void>;
    onResize: PropType<(entry: ResizeObserverEntry) => void>;
    defaultScrollKey: (StringConstructor | NumberConstructor)[];
    defaultScrollIndex: NumberConstructor;
    keyField: {
        type: StringConstructor;
        default: string;
    };
    paddingTop: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    paddingBottom: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}>> & Readonly<{}>, {
    columns: VVirtualListColumn[];
    itemResizable: boolean;
    ignoreItemResize: boolean;
    showScrollbar: boolean;
    items: ItemData[];
    visibleItemsTag: string | object;
    keyField: string;
    paddingTop: string | number;
    paddingBottom: string | number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
