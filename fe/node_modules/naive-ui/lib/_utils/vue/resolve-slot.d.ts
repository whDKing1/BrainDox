import type { Slot, VNodeArrayChildren, VNodeChild } from 'vue';
export declare function ensureValidVNode(vnodes: VNodeArrayChildren): VNodeArrayChildren | null;
/**
 * We shouldn't use the following functions with slot flags `_: 1, 2, 3`
 */
export declare function resolveSlot(slot: Slot | undefined, fallback: () => VNodeArrayChildren): VNodeArrayChildren;
export declare function resolveSlotWithTypedProps<T>(slot: Slot<T> | undefined, props: T, fallback: (props: T) => VNodeArrayChildren): VNodeArrayChildren;
/**
 * Resolve slot with wrapper if content exists, no fallback
 */
export declare function resolveWrappedSlot(slot: Slot | undefined, wrapper: (children: VNodeArrayChildren | null) => VNodeChild): VNodeChild;
export declare function resolveWrappedSlotWithProps(slot: Slot | undefined, props: any, wrapper: (children: VNodeArrayChildren | null) => VNodeChild): VNodeChild;
export declare function isSlotEmpty(slot: Slot | undefined): boolean;
