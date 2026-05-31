import { PropType } from 'vue';
import { ItemData } from './type';
export declare const VirtualListRow: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    index: {
        type: NumberConstructor;
        required: true;
    };
    item: {
        type: PropType<ItemData>;
        required: true;
    };
}>, {
    startIndex: import("vue").ComputedRef<number>;
    endIndex: import("vue").ComputedRef<number>;
    columns: import("vue").Ref<import("./type").VVirtualListColumn[], import("./type").VVirtualListColumn[]>;
    renderCol: import("vue").Ref<import("./type").VVirtualListRenderCol | undefined, import("./type").VVirtualListRenderCol | undefined>;
    renderItemWithCols: import("vue").Ref<import("./type").VVirtualListRenderItemWithCols | undefined, import("./type").VVirtualListRenderItemWithCols | undefined>;
    getLeft: (index: number) => number;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    index: {
        type: NumberConstructor;
        required: true;
    };
    item: {
        type: PropType<ItemData>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
