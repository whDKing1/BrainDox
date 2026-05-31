import { Ref } from 'vue';
import type { VVirtualListColumn, VVirtualListRenderCol, VVirtualListRenderItemWithCols } from './type';
export declare function setupXScroll({ columnsRef, renderColRef, renderItemWithColsRef }: {
    columnsRef: Ref<VVirtualListColumn[]>;
    renderColRef: Ref<VVirtualListRenderCol | undefined>;
    renderItemWithColsRef: Ref<VVirtualListRenderItemWithCols | undefined>;
}): {
    listWidthRef: Ref<number>;
    scrollLeftRef: Ref<number>;
};
