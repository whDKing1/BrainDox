import type { App, Component } from 'vue';
import type { ConfigProviderProps } from '../../config-provider';
import type { DialogApi } from '../../dialog';
import type { LoadingBarApi } from '../../loading-bar';
import type { MessageApi } from '../../message';
import type { ModalApi } from '../../modal';
import type { NotificationApi } from '../../notification';
import type { DiscreteApiType, MaybeRef } from './interface';
export type Provider<P = any> = new (...args: any[]) => {
    $props: P;
};
export type ProviderProps<C> = C extends Provider<infer P> ? P : unknown;
export interface DiscreteAppOptions {
    providersAndProps: Array<{
        type: DiscreteApiType;
        Provider: Component;
        props: any;
    }>;
    configProviderProps?: MaybeRef<ConfigProviderProps>;
}
export interface DiscreteApp {
    unmount: () => void;
    app: App;
    message?: MessageApi;
    notification?: NotificationApi;
    dialog?: DialogApi;
    loadingBar?: LoadingBarApi;
    modal?: ModalApi;
}
export declare function createDiscreteApp({ providersAndProps, configProviderProps }: DiscreteAppOptions): DiscreteApp;
