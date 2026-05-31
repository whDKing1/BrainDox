import type { TreeNode } from 'treemate';
import type { Ref } from 'vue';
import type { Key, TmNode, TreeOption, TreeOverrideNodeClickBehavior, TreeOverrideNodeClickBehaviorReturn } from './interface';
export declare function useKeyboard({ props, fNodesRef, mergedExpandedKeysRef, mergedSelectedKeysRef, mergedCheckedKeysRef, handleCheck, handleSelect, handleSwitcherClick }: {
    props: {
        keyboard: boolean;
        overrideDefaultNodeClickBehavior: TreeOverrideNodeClickBehavior | undefined;
    };
    fNodesRef: Ref<Array<TreeNode<TreeOption>>>;
    mergedExpandedKeysRef: Ref<Key[]>;
    mergedSelectedKeysRef: Ref<Key[]>;
    mergedCheckedKeysRef: Ref<Key[]>;
    handleSelect: (node: TmNode) => void;
    handleSwitcherClick: (node: TmNode) => void;
    handleCheck: (node: TmNode, checked: boolean) => void;
}): {
    pendingNodeKeyRef: Ref<null | Key>;
    handleKeydown: (e: KeyboardEvent) => {
        enterBehavior: TreeOverrideNodeClickBehaviorReturn | null;
    };
};
