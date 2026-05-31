import type { PropType, VNodeChild } from 'vue';
import type { MergedTheme } from '../../../_mixins';
import type { DataTableTheme } from '../../styles';
import type { InternalRowData, TableBaseColumn } from '../interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    row: {
        type: PropType<InternalRowData>;
        required: true;
    };
    index: {
        type: NumberConstructor;
        required: true;
    };
    column: {
        type: PropType<TableBaseColumn>;
        required: true;
    };
    isSummary: BooleanConstructor;
    mergedTheme: {
        type: PropType<MergedTheme<DataTableTheme>>;
        required: true;
    };
    renderCell: PropType<(value: any, rowData: object, column: any) => VNodeChild>;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    row: {
        type: PropType<InternalRowData>;
        required: true;
    };
    index: {
        type: NumberConstructor;
        required: true;
    };
    column: {
        type: PropType<TableBaseColumn>;
        required: true;
    };
    isSummary: BooleanConstructor;
    mergedTheme: {
        type: PropType<MergedTheme<DataTableTheme>>;
        required: true;
    };
    renderCell: PropType<(value: any, rowData: object, column: any) => VNodeChild>;
}>> & Readonly<{}>, {
    isSummary: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
