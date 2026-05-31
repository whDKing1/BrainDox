import type { ColumnKey, TableColumn } from './interface';
export declare function useResizable(): {
    getResizableWidth: (key: ColumnKey) => number | undefined;
    doUpdateResizableWidth: (column: TableColumn, width: number) => void;
    clearResizableWidth: () => void;
};
