import type { PropType } from 'vue';
import type { RenderSorter, SortOrder } from '../interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    render: {
        type: PropType<RenderSorter>;
        required: true;
    };
    order: {
        type: PropType<SortOrder>;
        default: boolean;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    render: {
        type: PropType<RenderSorter>;
        required: true;
    };
    order: {
        type: PropType<SortOrder>;
        default: boolean;
    };
}>> & Readonly<{}>, {
    order: SortOrder;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
