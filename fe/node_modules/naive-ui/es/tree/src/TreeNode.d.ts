import type { ComponentPublicInstance, PropType, VNode } from 'vue';
import type { TmNode } from './interface';
declare const TreeNode: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    tmNode: {
        type: PropType<TmNode>;
        required: true;
    };
}>, {
    showDropMark: import("vue").ComputedRef<boolean | undefined>;
    showDropMarkAsParent: import("vue").ComputedRef<boolean>;
    pending: import("vue").ComputedRef<boolean>;
    loading: import("vue").ComputedRef<boolean>;
    highlight: import("vue").ComputedRef<boolean | undefined>;
    checked: import("vue").ComputedRef<boolean>;
    indeterminate: import("vue").ComputedRef<boolean>;
    selected: import("vue").ComputedRef<boolean>;
    expanded: import("vue").ComputedRef<boolean>;
    disabled: import("vue").ComputedRef<boolean>;
    checkable: import("vue").ComputedRef<boolean>;
    mergedCheckOnClick: import("vue").ComputedRef<boolean>;
    checkboxDisabled: import("vue").ComputedRef<boolean>;
    selectable: import("vue").ComputedRef<boolean>;
    expandOnClick: import("vue").Ref<boolean, boolean>;
    internalScrollable: import("vue").Ref<boolean, boolean>;
    draggable: import("vue").Ref<boolean, boolean>;
    blockLine: import("vue").Ref<boolean, boolean>;
    nodeProps: import("vue").ComputedRef<(import("vue").HTMLAttributes & Record<string, unknown>) | undefined>;
    checkboxFocusable: import("vue").Ref<boolean, boolean>;
    droppingPosition: import("vue").Ref<import("./interface").DropPosition | null, import("./interface").DropPosition | null>;
    droppingOffsetLevel: import("vue").Ref<number, number>;
    indent: import("vue").Ref<number, number>;
    checkboxPlacement: "left" | "right";
    showLine: import("vue").Ref<boolean, boolean>;
    contentInstRef: import("vue").Ref<ComponentPublicInstance | null, ComponentPublicInstance | null>;
    contentElRef: {
        value: HTMLElement | null;
    };
    indentNodes: import("vue").ComputedRef<VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[]>;
    handleCheck: (checked: boolean) => void;
    handleDrop: (e: DragEvent) => void;
    handleDragStart: (e: DragEvent) => void;
    handleDragEnter: (e: DragEvent) => void;
    handleDragOver: (e: DragEvent) => void;
    handleDragEnd: (e: DragEvent) => void;
    handleDragLeave: (e: DragEvent) => void;
    handleLineClick: (e: PointerEvent) => void;
    handleContentClick: (e: PointerEvent) => void;
    handleSwitcherClick: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    tmNode: {
        type: PropType<TmNode>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default TreeNode;
