import { Ref, ComputedRef } from 'vue';
export default function useMergedState<T>(controlledStateRef: Ref<T | undefined>, uncontrolledStateRef: Ref<T>): ComputedRef<T>;
