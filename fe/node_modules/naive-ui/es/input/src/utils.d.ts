import type { Ref } from 'vue';
export declare function len(s: string): number;
export declare function isEmptyInputValue(value: unknown): boolean;
export interface UseCursorControl {
    recordCursor: () => void;
    restoreCursor: () => void;
}
export declare function useCursor(inputElRef: Ref<HTMLInputElement | HTMLTextAreaElement | null>): UseCursorControl;
