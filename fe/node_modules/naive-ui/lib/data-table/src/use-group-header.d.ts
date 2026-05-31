import type { ComputedRef, CSSProperties } from 'vue';
import type { ColumnKey, DataTableSetupProps, TableBaseColumn, TableColumn, TableExpandColumn, TableSelectionColumn } from './interface';
export interface RowItem {
    colSpan: number;
    rowSpan: number;
    column: TableColumn;
    colIndex: number;
    isLast: boolean;
}
export interface ColItem {
    key: string | number;
    style: CSSProperties;
    column: TableSelectionColumn | TableExpandColumn | TableBaseColumn;
    index: number;
    /**
     * The width property is only applied to horizontally virtual scroll table
     */
    width: number;
}
export declare function useGroupHeader(props: DataTableSetupProps, getResizableWidth: (key: ColumnKey) => number | undefined): {
    rowsRef: ComputedRef<RowItem[][]>;
    colsRef: ComputedRef<ColItem[]>;
    hasEllipsisRef: ComputedRef<boolean>;
    dataRelatedColsRef: ComputedRef<Array<TableSelectionColumn | TableBaseColumn | TableExpandColumn>>;
};
