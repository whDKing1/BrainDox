import type { ComputedRef, Ref } from 'vue';
import type { Breakpoints, GlobalComponentConfig, RtlEnabledState } from '../config-provider/src/internal-interface';
type UseConfigProps = Readonly<{
    bordered?: boolean;
    [key: string]: unknown;
}>;
export declare const defaultClsPrefix = "n";
export default function useConfig(props?: UseConfigProps, options?: {
    defaultBordered?: boolean;
}): {
    inlineThemeDisabled: boolean | undefined;
    mergedRtlRef: Ref<RtlEnabledState | undefined> | undefined;
    mergedBorderedRef: ComputedRef<boolean>;
    mergedClsPrefixRef: Ref<string>;
    mergedBreakpointsRef: Ref<Breakpoints> | undefined;
    mergedComponentPropsRef: Ref<GlobalComponentConfig | undefined> | undefined;
    namespaceRef: ComputedRef<string | undefined>;
};
export declare function useMergedClsPrefix(): Ref<string>;
export {};
