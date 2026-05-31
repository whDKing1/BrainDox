import type { VNode } from 'vue';
import type { DropPosition, TreeOption } from './interface';
export declare function renderDropMark({ position, offsetLevel, indent, el }: {
    position: 'before' | 'inside' | 'after';
    offsetLevel: number;
    indent: number;
    el: HTMLElement;
}): VNode;
export declare function defaultAllowDrop({ dropPosition, node }: {
    dropPosition: DropPosition;
    node: TreeOption;
}): boolean;
