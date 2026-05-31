import { ref, onMounted, readonly } from 'vue';
export default function isMounted() {
    const isMounted = ref(false);
    onMounted(() => { isMounted.value = true; });
    return readonly(isMounted);
}
