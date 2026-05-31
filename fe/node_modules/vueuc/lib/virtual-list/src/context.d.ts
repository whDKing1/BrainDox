import { ComputedRef, InjectionKey, Ref } from 'vue';
import { VVirtualListColumn, VVirtualListRenderCol, VVirtualListRenderItemWithCols } from './type';
export declare const xScrollInjextionKey: InjectionKey<{
    startIndexRef: ComputedRef<number>;
    endIndexRef: ComputedRef<number>;
    columnsRef: Ref<VVirtualListColumn[]>;
    renderColRef: Ref<VVirtualListRenderCol | undefined>;
    renderItemWithColsRef: Ref<VVirtualListRenderItemWithCols | undefined>;
    getLeft: (index: number) => number;
}>;
