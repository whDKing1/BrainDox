import type { ComputedRef } from 'vue';
import type { ColumnKey, DataTableSetupProps, InternalRowData, SortOrder, SortState, TableBaseColumn, TableExpandColumn, TableSelectionColumn, TmNode } from './interface';
export declare function useSorter(props: DataTableSetupProps, { dataRelatedColsRef, filteredDataRef }: {
    dataRelatedColsRef: ComputedRef<Array<TableSelectionColumn | TableBaseColumn | TableExpandColumn>>;
    filteredDataRef: ComputedRef<TmNode[]>;
}): {
    clearSorter: () => void;
    sort: (columnKey: ColumnKey, order?: SortOrder) => void;
    sortedDataRef: ComputedRef<TmNode[]>;
    mergedSortStateRef: ComputedRef<{
        columnKey: ColumnKey;
        order: SortOrder;
        sorter: boolean | "default" | import("./interface").Sorter<InternalRowData>;
    }[]>;
    deriveNextSorter: (sortState: SortState | null) => void;
};
