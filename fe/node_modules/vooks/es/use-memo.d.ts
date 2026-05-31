import { ComputedRef, WritableComputedRef } from 'vue';
declare type MemoGetter<T> = () => T;
declare type MemoSetter<T> = (v: T) => void;
interface WritableMemoOptions<T> {
    get: MemoGetter<T>;
    set: MemoSetter<T>;
}
declare function useMemo<T>(getter: MemoGetter<T>): ComputedRef<T>;
declare function useMemo<T>(options: WritableMemoOptions<T>): WritableComputedRef<T>;
export default useMemo;
