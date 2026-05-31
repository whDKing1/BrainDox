import { ComputedRef } from 'vue';
export default function useCompitable<T extends object, U extends Array<keyof T>, V extends keyof T>(reactive: T, keys: [...U, V]): ComputedRef<T[V]>;
