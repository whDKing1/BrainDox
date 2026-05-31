import type { InjectionKey, Ref } from 'vue';
export declare function useInjectionInstanceCollection(injectionName: string | InjectionKey<unknown>, collectionKey: string, registerKeyRef: Ref<string | undefined>): void;
export declare function useInjectionCollection(injectionName: string | InjectionKey<unknown>, collectionKey: string, valueRef: Ref<any>): void;
export declare function useInjectionElementCollection(injectionName: string | InjectionKey<unknown>, collectionKey: string, getElement: () => HTMLElement | null): void;
