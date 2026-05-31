import type { TreeNode } from 'treemate';
import type { HTMLAttributes, PropType, Ref } from 'vue';
import type { FollowerPlacement } from 'vueuc';
import type { MenuGroupOption } from '../../menu/src/interface';
import type { DropdownGroupOption, DropdownIgnoredOption, DropdownOption } from './interface';
export interface NDropdownOptionInjection {
    enteringSubmenuRef: Ref<boolean>;
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    tmNode: {
        type: PropType<TreeNode<DropdownOption, DropdownGroupOption, DropdownIgnoredOption>>;
        required: true;
    };
    parentKey: {
        type: PropType<string | number | null>;
        default: null;
    };
    placement: {
        type: PropType<FollowerPlacement>;
        default: string;
    };
    props: PropType<HTMLAttributes>;
    scrollable: BooleanConstructor;
}>, {
    labelField: Ref<string, string>;
    renderLabel: Ref<import("./interface").RenderLabelImpl | undefined, import("./interface").RenderLabelImpl | undefined>;
    renderIcon: Ref<import("./interface").RenderIconImpl | undefined, import("./interface").RenderIconImpl | undefined>;
    siblingHasIcon: Ref<boolean, boolean>;
    siblingHasSubmenu: Ref<boolean, boolean>;
    menuProps: Ref<import("./interface").DropdownMenuProps | undefined, import("./interface").DropdownMenuProps | undefined>;
    popoverBody: Ref<HTMLElement | null, HTMLElement | null>;
    animated: Ref<boolean, boolean>;
    mergedShowSubmenu: import("vue").ComputedRef<boolean>;
    rawNode: import("vue").ComputedRef<import("../../menu/src/interface").MenuOption | MenuGroupOption | import("../../menu/src/interface").MenuIgnoredOption>;
    hasSubmenu: import("vue").ComputedRef<boolean>;
    pending: import("vue").ComputedRef<boolean>;
    childActive: import("vue").ComputedRef<boolean>;
    active: import("vue").ComputedRef<boolean>;
    mergedDisabled: import("vue").ComputedRef<boolean>;
    renderOption: Ref<import("./interface").RenderOptionImpl | undefined, import("./interface").RenderOptionImpl | undefined>;
    nodeProps: Ref<import("../../menu/src/interface").MenuNodeProps | undefined, import("../../menu/src/interface").MenuNodeProps | undefined>;
    handleClick: () => void;
    handleMouseMove: () => void;
    handleMouseEnter: () => void;
    handleMouseLeave: (e: MouseEvent) => void;
    handleSubmenuBeforeEnter: () => void;
    handleSubmenuAfterEnter: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    tmNode: {
        type: PropType<TreeNode<DropdownOption, DropdownGroupOption, DropdownIgnoredOption>>;
        required: true;
    };
    parentKey: {
        type: PropType<string | number | null>;
        default: null;
    };
    placement: {
        type: PropType<FollowerPlacement>;
        default: string;
    };
    props: PropType<HTMLAttributes>;
    scrollable: BooleanConstructor;
}>> & Readonly<{}>, {
    scrollable: boolean;
    placement: FollowerPlacement;
    parentKey: string | number | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
