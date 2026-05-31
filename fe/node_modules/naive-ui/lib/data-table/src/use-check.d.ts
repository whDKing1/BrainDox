import type { TreeMate } from 'treemate';
import type { ComputedRef } from 'vue';
import type { DataTableSetupProps, InternalRowData, RowData, RowKey, TableSelectionColumn, TmNode } from './interface';
export declare function useCheck(props: DataTableSetupProps, data: {
    selectionColumnRef: ComputedRef<TableSelectionColumn | null>;
    paginatedDataRef: ComputedRef<TmNode[]>;
    treeMateRef: ComputedRef<TreeMate<InternalRowData>>;
}): {
    mergedCheckedRowKeySetRef: ComputedRef<Set<import("treemate").Key>>;
    mergedCheckedRowKeysRef: ComputedRef<import("treemate").Key[]>;
    mergedInderminateRowKeySetRef: ComputedRef<Set<import("treemate").Key>>;
    someRowsCheckedRef: ComputedRef<boolean>;
    allRowsCheckedRef: ComputedRef<boolean>;
    headerCheckboxDisabledRef: ComputedRef<boolean>;
    doUpdateCheckedRowKeys: (keys: RowKey[], row: RowData | undefined, action: "check" | "uncheck" | "checkAll" | "uncheckAll") => void;
    doCheckAll: (checkWholeTable?: boolean) => void;
    doUncheckAll: (checkWholeTable?: boolean) => void;
    doCheck: (rowKey: RowKey | RowKey[], single: boolean | undefined, rowInfo: RowData) => void;
    doUncheck: (rowKey: RowKey | RowKey[], rowInfo: RowData) => void;
};
