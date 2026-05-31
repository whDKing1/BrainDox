import type { CSSProperties, Ref, VNode } from 'vue';
export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual';
export interface PopoverInst {
    syncPosition: () => void;
    setShow: (value: boolean) => void;
}
export type InternalPopoverInst = PopoverInst & {
    getMergedShow: () => boolean;
};
export type PopoverBodyInjection = Ref<HTMLElement | null> | null;
export declare const popoverBodyInjectionKey: import("vue").InjectionKey<PopoverBodyInjection>;
export type InternalRenderBody = (className: any, ref: Ref<HTMLElement | null>, style: CSSProperties[], onMouseenter: (e: MouseEvent) => void, onMouseleave: (e: MouseEvent) => void) => VNode;
