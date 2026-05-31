import type { PropType } from 'vue';
import type { RenderExpandIcon, RowData } from '../interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    expanded: BooleanConstructor;
    loading: BooleanConstructor;
    onClick: {
        type: PropType<() => void>;
        required: true;
    };
    renderExpandIcon: {
        type: PropType<RenderExpandIcon>;
    };
    rowData: {
        type: PropType<RowData>;
        required: true;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    expanded: BooleanConstructor;
    loading: BooleanConstructor;
    onClick: {
        type: PropType<() => void>;
        required: true;
    };
    renderExpandIcon: {
        type: PropType<RenderExpandIcon>;
    };
    rowData: {
        type: PropType<RowData>;
        required: true;
    };
}>> & Readonly<{}>, {
    loading: boolean;
    expanded: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
