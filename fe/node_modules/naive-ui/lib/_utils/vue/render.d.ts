import type { VNodeChild } from 'vue';
export declare function render<T extends any[]>(r: string | number | undefined | null | ((...args: [...T]) => VNodeChild) | unknown, ...args: [...T]): VNodeChild;
