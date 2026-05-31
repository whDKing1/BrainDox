import type { TreeNode } from 'treemate';
import type { PropType, Ref } from 'vue';
import type { SelectGroupOption } from '../../../select/src/interface';
import type { RenderLabelImpl, RenderOptionImpl } from './interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    tmNode: {
        type: PropType<TreeNode<SelectGroupOption>>;
        required: true;
    };
}>, {
    labelField: Ref<string, string>;
    nodeProps: Ref<import("./interface").NodeProps | undefined, import("./interface").NodeProps | undefined>;
    renderLabel: Ref<RenderLabelImpl | undefined>;
    renderOption: Ref<RenderOptionImpl | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    tmNode: {
        type: PropType<TreeNode<SelectGroupOption>>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
