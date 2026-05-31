import type { Slots, VNode } from 'vue';
export declare function getFirstSlotVNode(slots: Slots, slotName?: string, props?: unknown): VNode | null;
export declare function getFirstSlotVNodeWithTypedProps<T>(slotName: string, slot: ((props: T) => VNode[]) | undefined, props: T): VNode | null;
