import type { PropType } from 'vue';
import type { TableBaseColumn } from '../interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    column: {
        type: PropType<TableBaseColumn>;
        required: true;
    };
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    active: import("vue").ComputedRef<boolean>;
    mergedSortOrder: import("vue").ComputedRef<import("../interface").SortOrder>;
    mergedRenderSorter: import("vue").ComputedRef<import("../interface").RenderSorter | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    column: {
        type: PropType<TableBaseColumn>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
