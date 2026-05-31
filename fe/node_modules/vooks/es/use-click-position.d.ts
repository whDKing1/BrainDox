import { Ref } from 'vue';
interface MousePosition {
    x: number;
    y: number;
}
export default function useClickPosition(): Readonly<Ref<MousePosition | null>>;
export {};
