import type { CSSProperties, DefineComponent, ExtractPropTypes, PropType, Ref, VNodeChild } from 'vue';
import type { ExtractPublicPropTypes, Mutable } from '../../_utils';
import type { modalProps } from './Modal';
export type ModalOptions = Mutable<Omit<Partial<ExtractPropTypes<typeof modalProps>>, 'internalStyle'> & {
    class?: any;
    style?: string | CSSProperties;
    render?: () => VNodeChild;
}>;
export type ModalReactive = {
    readonly key: string;
    readonly destroy: () => void;
} & ModalOptions;
export interface ModalApiInjection {
    destroyAll: () => void;
    create: (options: ModalOptions) => ModalReactive;
}
export interface ModalProviderInjection {
    clickedRef: Ref<boolean>;
    clickedPositionRef: Ref<{
        x: number;
        y: number;
    } | null>;
}
export type ModalReactiveListInjection = Ref<ModalReactive[]>;
export type ModalProviderInst = ModalApiInjection;
export declare const modalProviderProps: {
    to: PropType<string | HTMLElement>;
};
export type ModalProviderProps = ExtractPublicPropTypes<typeof modalProviderProps>;
export declare const NModalProvider: DefineComponent<{
    to?: string | HTMLElement;
}>;
