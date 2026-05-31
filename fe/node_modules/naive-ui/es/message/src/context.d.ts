import type { Ref } from 'vue';
import type { MessageApiInjection, MessageProviderSetupProps } from './MessageProvider';
export declare const messageApiInjectionKey: import("vue").InjectionKey<MessageApiInjection>;
export declare const messageProviderInjectionKey: import("vue").InjectionKey<{
    props: MessageProviderSetupProps;
    mergedClsPrefixRef: Ref<string>;
}>;
