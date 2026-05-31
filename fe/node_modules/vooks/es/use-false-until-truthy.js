import { ref, readonly, watch } from 'vue';
export default function useFalseUntilTruthy(originalRef) {
    const currentRef = ref(!!originalRef.value);
    if (currentRef.value)
        return readonly(currentRef);
    const stop = watch(originalRef, (value) => {
        if (value) {
            currentRef.value = true;
            stop();
        }
    });
    return readonly(currentRef);
}
