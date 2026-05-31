import type { ComponentPublicInstance, Ref } from 'vue';
import type { MergedTheme } from '../../_mixins';
import type { ModalTheme } from '../styles';
export type ModalBodyInjection = Ref<HTMLElement | ComponentPublicInstance | null> | null;
export declare const modalBodyInjectionKey: import("vue").InjectionKey<ModalBodyInjection>;
export interface ModalProviderInjection {
    clickedRef: Ref<boolean>;
    clickedPositionRef: Ref<{
        x: number;
        y: number;
    } | null>;
}
export declare const modalProviderInjectionKey: import("vue").InjectionKey<ModalProviderInjection>;
export interface ModalInjection {
    getMousePosition: () => {
        x: number;
        y: number;
    } | null;
    mergedClsPrefixRef: Ref<string>;
    mergedThemeRef: Ref<MergedTheme<ModalTheme>>;
    isMountedRef: Ref<boolean>;
    appearRef: Ref<boolean | undefined>;
    transformOriginRef: Ref<'mouse' | 'center'>;
}
export declare const modalInjectionKey: import("vue").InjectionKey<ModalInjection>;
export interface ModalDraggableOptions {
    /**
     * If set to 'none', the modal's position will not be bounded to the window.
     */
    bounds?: 'none';
}
