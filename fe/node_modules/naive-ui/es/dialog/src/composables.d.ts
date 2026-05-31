import type { Ref } from 'vue';
import type { DialogApiInjection, DialogReactive } from './DialogProvider';
export declare function useDialog(): DialogApiInjection;
export declare function useDialogReactiveList(): Ref<readonly DialogReactive[]>;
