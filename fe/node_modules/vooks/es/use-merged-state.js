import { watch, computed } from 'vue';
export default function useMergedState(controlledStateRef, uncontrolledStateRef) {
    watch(controlledStateRef, value => {
        if (value !== undefined) {
            uncontrolledStateRef.value = value;
        }
    });
    return computed(() => {
        if (controlledStateRef.value === undefined) {
            return uncontrolledStateRef.value;
        }
        return controlledStateRef.value;
    });
}
