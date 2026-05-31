import type { TreeMate } from 'treemate';
import type { Ref } from 'vue';
import type { DataTableSetupProps, Expandable, InternalRowData, RowKey } from './interface';
export declare function useExpand(props: DataTableSetupProps, treeMateRef: Ref<TreeMate<InternalRowData, InternalRowData, InternalRowData>>): {
    stickyExpandedRowsRef: Ref<boolean, boolean>;
    mergedExpandedRowKeysRef: import("vue").ComputedRef<import("treemate").Key[]>;
    renderExpandRef: import("vue").ComputedRef<import("./interface").RenderExpand<any> | undefined>;
    expandableRef: import("vue").ComputedRef<Expandable<any> | undefined>;
    doUpdateExpandedRowKeys: (expandedKeys: RowKey[]) => void;
};
