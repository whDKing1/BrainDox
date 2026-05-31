import type { ComputedRef, Ref } from 'vue';
import type { ColumnKey, DataTableSetupProps, MainTableRef, TableColumn } from './interface';
export declare function useScroll(props: DataTableSetupProps, { mainTableInstRef, mergedCurrentPageRef, bodyWidthRef, maxHeightRef, mergedTableLayoutRef }: {
    maxHeightRef: Ref<string | number | undefined>;
    bodyWidthRef: Ref<null | number>;
    mainTableInstRef: Ref<MainTableRef | null>;
    mergedCurrentPageRef: ComputedRef<number>;
    mergedTableLayoutRef: Ref<'auto' | 'fixed'>;
}): {
    styleScrollXRef: ComputedRef<string | undefined>;
    fixedColumnLeftMapRef: ComputedRef<Record<ColumnKey, {
        start: number;
        end: number;
    } | undefined>>;
    fixedColumnRightMapRef: ComputedRef<Record<ColumnKey, {
        start: number;
        end: number;
    } | undefined>>;
    leftFixedColumnsRef: ComputedRef<TableColumn<any>[]>;
    rightFixedColumnsRef: ComputedRef<TableColumn<any>[]>;
    leftActiveFixedColKeyRef: Ref<ColumnKey | null, ColumnKey | null>;
    leftActiveFixedChildrenColKeysRef: Ref<ColumnKey[], ColumnKey[]>;
    rightActiveFixedColKeyRef: Ref<ColumnKey | null, ColumnKey | null>;
    rightActiveFixedChildrenColKeysRef: Ref<ColumnKey[], ColumnKey[]>;
    syncScrollState: () => void;
    handleTableBodyScroll: (e: Event) => void;
    handleTableHeaderScroll: () => void;
    setHeaderScrollLeft: (left: number) => void;
    explicitlyScrollableRef: ComputedRef<boolean>;
    xScrollableRef: ComputedRef<boolean>;
};
