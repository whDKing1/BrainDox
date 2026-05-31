import { computed } from 'vue';
export default function useCompitable(reactive, keys) {
    // @ts-expect-error
    return computed(() => {
        for (const key of keys) {
            if (reactive[key] !== undefined)
                return reactive[key];
        }
        return reactive[keys[keys.length - 1]];
    });
}
