import type { ComponentPublicInstance } from 'vue';
export declare function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent;
type RefType = HTMLElement | ComponentPublicInstance;
type RefKey = number;
type RefsValue<T extends RefType> = Map<RefKey, T>;
export declare function useRefs<T extends RefType>(): [
    RefsValue<T>,
    (key: RefKey) => (el: any) => void
];
export {};
