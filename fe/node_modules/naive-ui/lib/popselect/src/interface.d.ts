import type { Ref } from 'vue';
import type { MergedTheme } from '../../_mixins';
import type { PopoverInst } from '../../popover/src/interface';
import type { PopselectTheme } from '../styles';
import type { PopselectSetupProps } from './Popselect';
export interface PopselectInjection {
    props: PopselectSetupProps;
    mergedThemeRef: Ref<MergedTheme<PopselectTheme>>;
    setShow: (value: boolean) => void;
    syncPosition: () => void;
}
export type PopselectInst = PopoverInst;
export declare const popselectInjectionKey: import("vue").InjectionKey<PopselectInjection>;
