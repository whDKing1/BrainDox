import type { Ref } from 'vue';
import type { RtlEnabledState, RtlItem } from '../config-provider/src/internal-interface';
export declare function useRtl(mountId: string, rtlStateRef: Ref<RtlEnabledState | undefined> | undefined, clsPrefixRef: Ref<string>): Ref<RtlItem | undefined> | undefined;
