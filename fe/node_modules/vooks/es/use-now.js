import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
function useNow(interval, { type = 'number' }) {
    const isNumber = type === 'number';
    const nowRef = ref(isNumber ? Date.now() : new Date());
    if (interval === false) {
        let id;
        onBeforeMount(() => {
            id = setInterval(() => {
                nowRef.value = isNumber ? Date.now() : new Date();
            });
        });
        onBeforeUnmount(() => {
            clearInterval(id);
        });
    }
    return nowRef;
}
export default useNow;
