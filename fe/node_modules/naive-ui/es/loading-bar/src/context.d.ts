import type { Ref } from 'vue';
import type { LoadingBarProviderSetupProps } from './LoadingBarProvider';
export declare const loadingBarProviderInjectionKey: import("vue").InjectionKey<{
    props: LoadingBarProviderSetupProps;
    mergedClsPrefixRef: Ref<string>;
}>;
export declare const loadingBarApiInjectionKey: import("vue").InjectionKey<import("./LoadingBarProvider").LoadingBarInst>;
