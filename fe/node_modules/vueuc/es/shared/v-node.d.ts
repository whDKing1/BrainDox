import { VNodeChild, VNode, Slots } from 'vue';
export declare function getSlot(scope: string, slots: Slots, slotName?: string): VNode[];
export declare function flatten(vNodes: VNodeChild[], filterCommentNode?: boolean, result?: VNode[]): VNode[];
export declare function getFirstVNode(scope: string, slots: Slots, slotName?: string): VNode;
