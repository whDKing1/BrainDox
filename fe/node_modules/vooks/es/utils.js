import { getCurrentInstance } from 'vue';
export function hasInstance() {
    return getCurrentInstance() !== null;
}
export const isBrowser = typeof window !== 'undefined';
