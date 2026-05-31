import type { DiscreteApi, DiscreteApiOptions, DiscreteApiType } from './interface';
export declare function createDiscreteApi<T extends DiscreteApiType>(includes: T[], { configProviderProps, messageProviderProps, dialogProviderProps, notificationProviderProps, loadingBarProviderProps, modalProviderProps }?: DiscreteApiOptions): DiscreteApi<T>;
