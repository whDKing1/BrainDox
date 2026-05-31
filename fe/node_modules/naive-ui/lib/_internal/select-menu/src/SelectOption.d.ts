import type { TreeNode } from 'treemate';
import type { PropType, Ref } from 'vue';
import type { SelectOption } from '../../../select/src/interface';
import type { RenderLabelImpl, RenderOptionImpl } from './interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    tmNode: {
        type: PropType<TreeNode<SelectOption>>;
        required: true;
    };
}>, {
    multiple: Ref<boolean, boolean>;
    isGrouped: import("vue").ComputedRef<boolean | null>;
    showCheckmark: Ref<boolean, boolean>;
    nodeProps: Ref<import("./interface").NodeProps | undefined, import("./interface").NodeProps | undefined>;
    isPending: import("vue").ComputedRef<boolean>;
    isSelected: import("vue").ComputedRef<boolean>;
    labelField: Ref<string, string>;
    renderLabel: Ref<RenderLabelImpl | undefined>;
    renderOption: Ref<RenderOptionImpl | undefined>;
    handleMouseMove: (e: MouseEvent) => void;
    handleMouseEnter: (e: MouseEvent) => void;
    handleClick: (e: MouseEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    tmNode: {
        type: PropType<TreeNode<SelectOption>>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
