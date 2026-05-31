import type { Ref } from 'vue';
import type { ModalDraggableOptions } from './interface';
import type { ModalApiInjection, ModalReactive } from './ModalProvider';
export declare function useModal(): ModalApiInjection;
export declare function useModalReactiveList(): Ref<readonly ModalReactive[]>;
export declare const DRAGGABLE_CLASS = "n-draggable";
interface UseDragModalOptions {
    onEnd: (el: HTMLElement) => void;
}
export declare function useDragModal(draggablePropsRef: Ref<boolean | ModalDraggableOptions>, options: UseDragModalOptions): {
    stopDrag: () => void;
    startDrag: (modal: HTMLElement) => void;
    draggableRef: import("vue").ComputedRef<boolean>;
    draggableClassRef: import("vue").ComputedRef<"" | "n-draggable">;
};
export {};
